// routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const saltRounds = 10;

router.post('/register', async (req, res) => {
  const { ho_ten, email, sdt, diachi, matkhau } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(matkhau, saltRounds);
    const query = 'INSERT INTO NGUOIDUNG (EMAIL, HO_TEN, SDT, DIACHI, MATKHAU) VALUES (?, ?, ?, ?, ?)';
    await db.query(query, [email, ho_ten, sdt, diachi, hashedPassword]);

    res.redirect('/login');
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Lỗi khi đăng ký tài khoản');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [users] = await db.query('SELECT * FROM NGUOIDUNG WHERE EMAIL = ?', [username]);
    if (users.length > 0) {
      const user = users[0];
      const validPassword = await bcrypt.compare(password, user.MATKHAU);
      if (validPassword) {
        req.session.user = {
          email: user.EMAIL,
          name: user.HO_TEN,
          phone: user.SDT // Lưu thêm thông tin số điện thoại vào session
        };
        const returnUrl = req.session.returnUrl || '/';
        res.redirect(returnUrl);
      } else {
        res.status(401).send('Sai mật khẩu');
      }
    } else {
      res.status(401).send('Không tìm thấy người dùng');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Lỗi khi đăng nhập');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Lỗi khi đăng xuất');
    }
    res.redirect('/');
  });
});

router.get('/check-auth', (req, res) => {
  if (req.session.user) {
    res.json({ isLoggedIn: true, email: req.session.user.email, name: req.session.user.name, phone: req.session.user.phone });
  } else {
    res.json({ isLoggedIn: false });
  }
});

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
      const [users] = await db.query('SELECT * FROM NGUOIDUNG WHERE EMAIL = ?', [email]);
      if (users.length > 0) {
          const user = users[0];
          const token = crypto.randomBytes(20).toString('hex');
          const expireTime = Date.now() + 3600000; // Token hết hạn sau 1 giờ

          await db.query('UPDATE NGUOIDUNG SET RESET_PASSWORD_TOKEN = ?, RESET_PASSWORD_EXPIRE = ? WHERE EMAIL = ?', [token, expireTime, email]);

          const transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: 'nguyennhu3570@gmail.com', // Email của bạn
                pass: 'kjsf gdov sazf kvkk'
              }
          });

          const mailOptions = {
              to: email,
              from: 'nguyennhu3570@gmail.com',
              subject: 'Đặt lại mật khẩu',
              text: `Bạn nhận được email này vì bạn (hoặc ai đó) đã yêu cầu đặt lại mật khẩu cho tài khoản của bạn.\n\n` +
                    `Vui lòng nhấn vào link sau hoặc dán vào trình duyệt để hoàn tất quá trình:\n\n` +
                    `http://${req.headers.host}/reset-password/${token}\n\n` +
                    `Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không thay đổi.\n`
          };

          await transporter.sendMail(mailOptions);
          res.redirect('/');
      } else {
          res.status(404).send('Không tìm thấy email.');
      }
  } catch (error) {
      console.error('Error in forgot-password:', error);
      res.status(500).send('Lỗi khi yêu cầu đặt lại mật khẩu.');
  }
});

// Đặt lại mật khẩu
router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { matkhau } = req.body;
  try {
    const [users] = await db.query('SELECT * FROM NGUOIDUNG WHERE RESET_PASSWORD_TOKEN = ? AND RESET_PASSWORD_EXPIRE > ?', [token, Date.now()]);
    if (users.length > 0) {
      const hashedPassword = await bcrypt.hash(matkhau, saltRounds);
      await db.query('UPDATE NGUOIDUNG SET MATKHAU = ?, RESET_PASSWORD_TOKEN = NULL, RESET_PASSWORD_EXPIRE = NULL WHERE RESET_PASSWORD_TOKEN = ?', [hashedPassword, token]);
      res.send('Mật khẩu đã được đặt lại thành công');
    } else {
      res.status(400).send('Token không hợp lệ hoặc đã hết hạn');
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send('Lỗi khi đặt lại mật khẩu');
  }
});

module.exports = router;
