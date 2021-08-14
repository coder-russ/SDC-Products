const router = require('express').Router();
const db = require('./models/index');

router.get('/products', (req, res) => {
  db.getProducts(req.query)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.get('/products/:id', (req, res) => {
  db.getProductId(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.get('/products/:id/styles', (req, res) => {
  db.getProductStyles(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.get('/products/:id/related', (req, res) => {
  db.getProductRelated(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.get('/test/:id', (req, res) => {
  db.getTest(req.params.id)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

module.exports = router;
