const express = require('express');
const path = require('path');
const axios = require('axios');
const db = require('./db');
const bodyParser = require('body-parser');
const session = require('express-session');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { saveReturnUrl } = require('./middleware');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: '29102003',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(saveReturnUrl);

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.get('/', (req, res) => {
  res.render('index', { title: 'Trang chủ' });
});

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);

const cartRoutes = require('./routes/cart');
app.use('/cart', cartRoutes);

const paymentRoutes = require('./routes/payments');
app.use('/api/payments', paymentRoutes);

const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

app.get('/admin', (req, res) => {
  res.render('admin', { title: 'Admin' });
});

app.get('/menu', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3000/api/products/categories');
    const categoriesWithProducts = response.data;

    res.render('menu', {
      title: 'Thực đơn',
      categories: categoriesWithProducts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu' });
  }
});

app.get('/promotions', (req, res) => {
  res.render('promotions', { title: 'Khuyến mãi' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'Về chúng tôi' });
});

app.get('/contact', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  const user = req.session.user;

  res.render('contact', {
    title: 'Liên hệ',
    user: {
      name: user.name,
      email: user.email,
      phone: user.phone
    }
  });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Đăng nhập' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Đăng ký' });
});

app.get('/order', async (req, res) => {
  const productId = req.query.productId;

  if (!productId) {
    return res.status(400).json({ error: 'Thiếu productId' });
  }

  try {
    const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
    const product = response.data;

    if (!product) {
      return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
    }

    const reviewsResponse = await axios.get('http://localhost:3000/api/orders/reviews');
    const reviews = reviewsResponse.data;

    res.render('order', { product, reviews, title: 'Đặt hàng' });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Lỗi khi lấy dữ liệu sản phẩm' });
  }
});

app.get('/forgot-password', (req, res) => {
  res.render('forgot-password', { title: 'Quên mật khẩu' });
});

app.get('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  try {
    const [users] = await db.query('SELECT * FROM NGUOIDUNG WHERE RESET_PASSWORD_TOKEN = ? AND RESET_PASSWORD_EXPIRE > ?', [token, Date.now()]);
    if (users.length > 0) {
      res.render('reset-password', { token, title: 'Đặt lại mật khẩu' });
    } else {
      res.status(400).send('Token không hợp lệ hoặc đã hết hạn');
    }
  } catch (error) {
    console.error('Error fetching user with token:', error);
    res.status(500).send('Lỗi khi xác minh token');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
