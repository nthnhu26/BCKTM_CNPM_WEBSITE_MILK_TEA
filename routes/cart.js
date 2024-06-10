const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/login');
    }

    const userEmail = req.session.user.email;
    const [userDetails] = await db.query('SELECT DIACHI, SDT FROM NGUOIDUNG WHERE EMAIL = ?', [userEmail]);
    if (userDetails.length === 0) {
      return res.status(500).send('Không tìm thấy thông tin người dùng');
    }
    const userAddress = userDetails[0].DIACHI;
    const userPhone = userDetails[0].SDT;

    const [orders] = await db.query('SELECT ID_DH FROM DATHANG WHERE EMAIL = ? AND TRANGTHAI = "DA_DAT"', [userEmail]);

    if (orders.length === 0) {
      return res.render('cart', { 
        title: 'Giỏ hàng của tôi', 
        orderDetails: [],
        totalAmount: 0,
        userAddress: userAddress,
        userPhone: userPhone
      });
    }

    const orderIds = orders.map(order => order.ID_DH);
    const [orderDetails] = await db.query(`
      SELECT p.HINHANH as image, p.TEN_SP as name, od.GIA as price, od.SO_LUONG as quantity, od.ID_DH as orderId, od.ID_SP as productId
      FROM CHITIETDONHANG od
      JOIN SANPHAM p ON od.ID_SP = p.ID_SP
      WHERE od.ID_DH IN (?)`, [orderIds]);

    const totalAmount = orderDetails.reduce((total, item) => total + (item.price * item.quantity), 0);

    res.render('cart', { 
      title: 'Giỏ hàng của tôi', 
      orderDetails,
      totalAmount,
      userAddress: userAddress,
      userPhone: userPhone
    });
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/remove-item', async (req, res) => {
  const { orderId, productId } = req.body;

  try {
    // Remove the product from the order
    await db.query('DELETE FROM CHITIETDONHANG WHERE ID_DH = ? AND ID_SP = ?', [orderId, productId]);

    // Check if there are any remaining products in the order
    const [remainingItems] = await db.query('SELECT COUNT(*) as itemCount FROM CHITIETDONHANG WHERE ID_DH = ?', [orderId]);
    if (remainingItems[0].itemCount === 0) {
      // If no items remain, delete the order
      await db.query('DELETE FROM DATHANG WHERE ID_DH = ?', [orderId]);
      return res.status(200).json({ message: 'Giỏ hàng của bạn hiện đang trống.', totalAmount: 0, cartEmpty: true });
    }

    // Calculate the new total amount
    const [orderDetails] = await db.query('SELECT GIA, SO_LUONG FROM CHITIETDONHANG WHERE ID_DH = ?', [orderId]);
    const totalAmount = orderDetails.reduce((total, item) => total + (item.GIA * item.SO_LUONG), 0);

    res.status(200).json({ message: 'Sản phẩm đã được xóa khỏi giỏ hàng', totalAmount, cartEmpty: false });
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
});


module.exports = router;
