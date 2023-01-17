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

router.get("/:rider_id", async (req, res) => {
  const rider_id = req.params.rider_id;
  try {
    connection.query(
      "SELECT * FROM tb_request LEFT JOIN tb_store ON tb_request.store_id = tb_store.store_id JOIN tb_order_status ON tb_request.status = tb_order_status.order_status_id WHERE rider_id = ?",
      [rider_id],
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
