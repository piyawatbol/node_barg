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

router.get("/:cart_id", async (req, res) => {
  const cart_id = req.params.cart_id;
  try {
    connection.query(
      "SELECT * ,tb_cart.price AS Total  FROM tb_cart JOIN tb_food ON tb_cart.food_id = tb_food.food_id LEFT JOIN tb_store ON tb_cart.store_id = tb_store.store_id  WHERE tb_cart.cart_id = ?",
      [cart_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        numRows = results.length;
        if(numRows == 0){
         return res.status(200).json([{"item": "not have cart"}]);
        }else{
         return res.status(200).json(results);
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
