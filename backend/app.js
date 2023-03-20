const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

const transactions = [];

app.use(bodyParser.json());

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: "12345",
      location: "Factory",
      transactions: transactions.filter(
        (t) => t.productId === "12345"
      ),
    },
    {
      id: "67890",
      location: "Warehouse",
      transactions: transactions.filter(
        (t) => t.productId === "67890"
      ),
    },
  ];
  res.json(products);
});

app.post("/api/transactions", (req, res) => {
  const { productId, fromLocation, toLocation, quantity } = req.body;
  const newTransaction = {
    productId,
    fromLocation,
    toLocation,
    quantity,
  };
  transactions.push(newTransaction);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
