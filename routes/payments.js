const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/checkout', async (req, res) => {
  const { address, phone, payment, totalAmount } = req.body;
  const email = req.session.user.email;

  if (!email) {
    return res.status(401).json({ error: 'Bạn cần đăng nhập để thực hiện thanh toán' });
  }

  try {
    // Lấy tất cả các đơn hàng của người dùng có trạng thái 'DA_DAT'
    const [orders] = await db.query('SELECT ID_DH FROM DATHANG WHERE EMAIL = ? AND TRANGTHAI = "DA_DAT"', [email]);

    if (orders.length === 0) {
      return res.status(400).json({ error: 'Không tìm thấy đơn hàng để thanh toán' });
    }

    // Tính tổng tiền của tất cả các đơn hàng
    const orderIds = orders.map(order => order.ID_DH);
    const [orderDetails] = await db.query(`
      SELECT SUM(GIA * SO_LUONG) AS total 
      FROM CHITIETDONHANG 
      WHERE ID_DH IN (?)`, [orderIds]);

    const totalPayment = orderDetails[0].total;

    // Thêm thông tin thanh toán vào bảng THANHTOAN
    const paymentQuery = 'INSERT INTO THANHTOAN (ID_DH, EMAIL, HINH_THUC_TT, TONG_TIEN) VALUES (?, ?, ?, ?)';
    for (const order of orders) {
      await db.query(paymentQuery, [order.ID_DH, email, payment, totalPayment]);
    }

    // Cập nhật trạng thái của tất cả các đơn hàng thành 'DA_THANH_TOAN'
    await db.query('UPDATE DATHANG SET TRANGTHAI = "DA_THANH_TOAN" WHERE ID_DH IN (?)', [orderIds]);

    // Trả về phản hồi thành công và URL cần chuyển hướng
    res.json({ message: 'Thanh toán thành công', redirectUrl: '/' });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Lỗi khi xử lý thanh toán' });
  }
});

module.exports = router;
