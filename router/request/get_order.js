const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bargfood",
});

router.get("/:order_id", async (req, res) => {
  const order_id = req.params.order_id;
  try {
    connection.query(
      "SELECT * FROM tb_order WHERE order_id = ?",
      [order_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }

        res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
