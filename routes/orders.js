const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/place-order', async (req, res) => {
  const { user_email, product_id, quantity, price } = req.body;

  try {
    // Check if there's an existing order in "DA_DAT" state
    const [existingOrders] = await db.query('SELECT ID_DH FROM DATHANG WHERE EMAIL = ? AND TRANGTHAI = "DA_DAT"', [user_email]);

    let orderId;
    if (existingOrders.length === 0) {
      // Create a new order if no existing order in "DA_DAT" state
      const [orderResult] = await db.query('INSERT INTO DATHANG (EMAIL, TRANGTHAI) VALUES (?, "DA_DAT")', [user_email]);
      orderId = orderResult.insertId;
    } else {
      // Use the existing order ID
      orderId = existingOrders[0].ID_DH;
    }

    // Insert product details into CHITIETDONHANG
    await db.query('INSERT INTO CHITIETDONHANG (ID_DH, ID_SP, SO_LUONG, GIA) VALUES (?, ?, ?, ?)', [orderId, product_id, quantity, price]);

    res.status(200).send('Đơn hàng đã được tạo thành công');

  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).send('Lỗi khi tạo đơn hàng');
  }
});

router.get('/reviews', async (req, res) => {
  try {
    const [reviews] = await db.query('SELECT HO_TEN, NOI_DUNG, NGAY_GUI FROM LIENHE ORDER BY NGAY_GUI DESC LIMIT 5');
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send('Lỗi khi lấy đánh giá');
  }
});

module.exports = router;
