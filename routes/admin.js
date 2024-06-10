const express = require('express');
const router = express.Router();
const db = require('../db');

// Quản lý Danh mục
router.get('/categories', async (req, res) => {
    try {
        const [categories] = await db.query('SELECT * FROM DANHMUC');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách danh mục' });
    }
});

router.post('/categories', async (req, res) => {
    const { categoryName } = req.body;
    try {
        const [result] = await db.query('INSERT INTO DANHMUC (TEN_DM) VALUES (?)', [categoryName]);
        res.json({ id: result.insertId, categoryName });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi thêm danh mục' });
    }
});

// Quản lý Sản phẩm
router.get('/products', async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM SANPHAM');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách sản phẩm' });
    }
});

router.post('/products', async (req, res) => {
    const { productName, productPrice, productCategory } = req.body;
    try {
        const [result] = await db.query('INSERT INTO SANPHAM (TEN_SP, GIA, ID_DM) VALUES (?, ?, ?)', [productName, productPrice, productCategory]);
        res.json({ id: result.insertId, productName, productPrice, productCategory });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi thêm sản phẩm' });
    }
});

// Quản lý Người dùng
router.get('/users', async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM NGUOIDUNG');
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách người dùng' });
    }
});

// Quản lý Đơn hàng
router.get('/orders', async (req, res) => {
    try {
        const [orders] = await db.query('SELECT * FROM DATHANG');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách đơn hàng' });
    }
});

// Quản lý Thanh toán
router.get('/payments', async (req, res) => {
    try {
        const [payments] = await db.query('SELECT * FROM THANHTOAN');
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách thanh toán' });
    }
});

// Quản lý Liên hệ
router.get('/contacts', async (req, res) => {
    try {
        const [contacts] = await db.query('SELECT * FROM LIENHE');
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách liên hệ' });
    }
});

// Tính doanh thu trong tháng
router.get('/monthly-income', async (req, res) => {
    try {
        const [income] = await db.query(`
            SELECT SUM(TONG_TIEN) as totalIncome
            FROM THANHTOAN
            WHERE MONTH(NGAY_TT) = MONTH(CURRENT_DATE())
              AND YEAR(NGAY_TT) = YEAR(CURRENT_DATE())
        `);
        res.json({ totalIncome: income[0].totalIncome });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tính doanh thu' });
    }
});

module.exports = router;
