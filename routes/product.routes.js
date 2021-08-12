const express = require("express");
const router = express.Router();

const productService = require("../services/product.service");

// READ

router.get("/product", async (req, res) => {
  const user = await productService.getUser();
  console.log(user);
  res.send({ user });
});

module.exports = router;
