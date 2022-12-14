const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bargfood",
});

router.post("/", async (req, res) => {
  const order_id = req.body.order_id;
  const food_id = req.body.food_id;
  const food_name = req.body.food_name;
  const amount = req.body.amount;
  const price = req.body.price;
  const detail = req.body.detail;
  try {
    connection.query(
      "INSERT INTO tb_order(order_id,food_id,food_name,amount,price,detail) VALUES(?,?,?,?,?,?)",
      [order_id, food_id, food_name, amount, price, detail],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        } else {
          return res.status(200).json("Add order Success");
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
