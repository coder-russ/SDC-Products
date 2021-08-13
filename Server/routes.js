const router = require('express').Router();
const db = require('./models/index');

router.get('/products', (req, res) => {
  db.getProducts(req.query)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.get('/products/:id', (req, res) => {
  db.getProductId(req.params.id)
    .then((array) => {
      const result = {
        id: array[0][0].dataValues.id,
        name: array[0][0].dataValues.name,
        slogan: array[0][0].dataValues.slogan,
        description: array[0][0].dataValues.description,
        category: array[0][0].dataValues.category,
        default_price: array[0][0].dataValues.default_price,
        features: array[1],
      };
      res.send(result);
    })
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
