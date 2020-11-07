var express = require("express");
var router = express.Router();
var [getProducts, insertProduct] = require("../controllers/product");
const auth = require("../middleware");

/* GET product listing. */
router.get(
  "/",
  auth.checkToken(req, res, async function () {
    const products = await getProducts();
    console.warn("products->", products);
    res.send(products);
  })
);

/**
 * POST product
 */
router.post(
  "/",
  auth.checkToken(req, res, async function () {
    const newProduct = await insertProduct(req.body);
    console.warn("insert products->", newProduct);
    res.send(newProduct);
  })
);

module.exports = router;
