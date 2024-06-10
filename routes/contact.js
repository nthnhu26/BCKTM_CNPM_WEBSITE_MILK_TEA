// routes/contact.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    // Kiểm tra nếu người dùng đã đăng nhập
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const userEmail = req.session.user.email; // Lấy email từ session

    // Lấy thông tin người dùng
    const [userDetails] = await db.query('SELECT HO_TEN, SDT FROM NGUOIDUNG WHERE EMAIL = ?', [userEmail]);
    if (userDetails.length === 0) {
      return res.status(500).send('Không tìm thấy thông tin người dùng');
    }
    const userName = userDetails[0].HO_TEN;
    const userPhone = userDetails[0].SDT;

    res.render('contact', {
      title: 'Liên hệ',
      user: {
        name: userName,
        email: userEmail,
        phone: userPhone
      }
    });
    
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/', async (req, res) => { // Đúng URL endpoint là '/api/contact'
  const { name, email, phone, category, message } = req.body;

  try {
    await db.query(
      'INSERT INTO LIENHE (HO_TEN, EMAIL, SDT, THE_LOAI, NOI_DUNG) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, category, message]
    );

    res.status(200).json({ message: 'Gửi phản hồi thành công' });
  } catch (error) {
    console.error('Error sending feedback:', error);
    res.status(500).json({ message: 'Lỗi khi gửi phản hồi' });
  }
});

module.exports = router;
