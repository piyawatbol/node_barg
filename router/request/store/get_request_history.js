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

router.get("/:store_id", async (req, res) => {
  const store_id = req.params.store_id;
  try {
    connection.query(
      "SELECT * FROM tb_request JOIN tb_buyer ON tb_request.buyer_id = tb_buyer.buyer_id LEFT JOIN tb_order_status ON tb_request.order_status_id = tb_order_status.order_status_id WHERE tb_request.store_id = ? AND tb_request.order_status_id = 6 OR tb_request.order_status_id = 7",
      [store_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
       res.status(202).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});


module.exports = router;
