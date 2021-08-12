const router = require('express').Router();
const db = require('./models/index');

router.get('/products', (req, res) => {
  db.getProducts()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.get('/products/:id', (req, res) => {
  db.getProductId()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.get('/products/:id/styles', (req, res) => {
  db.getProductStyles()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.get('/products/:id/related', (req, res) => {
  db.getProductRelated()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

module.exports = router;
