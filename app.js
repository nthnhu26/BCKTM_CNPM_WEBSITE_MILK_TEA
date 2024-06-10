const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Import db.js
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.db = db;
  next();
});

const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const reviewRoutes = require('./routes/reviews');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
