const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const fs = require("fs");

require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});
router.delete("/:cart_id", async (req, res) => {
  const cart_id = req.params.cart_id;
  try {
    connection.query(
      "DELETE FROM tb_cart WHERE cart_id = ?",
      [cart_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res.status(200).json("delete menu success");
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
