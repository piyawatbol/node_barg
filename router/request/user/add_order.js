const express = require("express");
const router = express.Router();
const mysql = require("mysql");

require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
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
