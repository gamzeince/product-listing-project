
const express = require("express");
const cors    = require("cors");
const products = require("./data");

const app = express();
app.use(cors());

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(3001, () => {
  console.log("✅ Express API çalışıyor: http://192.168.1.126:3001/products");
});