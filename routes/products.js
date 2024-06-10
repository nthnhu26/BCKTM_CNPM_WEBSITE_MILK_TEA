// routes/products.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/categories', async (req, res) => {
  try {
    const [categories] = await db.query('SELECT * FROM DANHMUC');
    const [products] = await db.query('SELECT * FROM SANPHAM');

    console.log('Fetched categories:', categories);
    console.log('Fetched products:', products);

    const categoriesWithProducts = categories.map(category => {
      return {
        ...category,
        products: products.filter(product => product.ID_DM === category.ID_DM)
      };
    });

    res.json(categoriesWithProducts);
  } catch (err) {
    console.error('Error fetching categories or products:', err);
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu' });
  }
});

router.get('/:id_sp', async (req, res) => {
  const { id_sp } = req.params;
  console.log('Fetching product with ID:', id_sp);

  try {
    const [results] = await db.query('SELECT * FROM SANPHAM WHERE ID_SP = ?', [id_sp]);

    if (results.length === 0) {
      console.log('No product found with ID:', id_sp);
      return res.status(404).json({ error: 'Product not found' });
    }

    console.log('Product data:', results[0]);
    res.json(results[0]);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Error fetching product' });
  }
});

module.exports = router;
