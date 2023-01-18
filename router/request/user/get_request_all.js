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

router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    connection.query(
      "SELECT * FROM tb_request LEFT JOIN tb_order_status ON tb_request.order_status_id = tb_order_status.order_status_id LEFT JOIN tb_store ON tb_request.store_id = tb_store.store_id LEFT JOIN tb_address ON tb_request.address_id = tb_address.address_id  WHERE tb_request.user_id=?  ORDER BY request_id DESC",
      [user_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
