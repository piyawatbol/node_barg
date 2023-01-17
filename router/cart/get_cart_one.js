const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "bargfood",
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
