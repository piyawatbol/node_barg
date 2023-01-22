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
      "SELECT * FROM tb_wallet_store  JOIN tb_wallet_store_history ON tb_wallet_store.wallet_store_id = tb_wallet_store_history.wallet_store_id JOIN tb_wallet_status ON tb_wallet_store_history.wallet_status_id = tb_wallet_status.wallet_status_id WHERE tb_wallet_store.store_id =?",[store_id],

      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        numRows = results.length;
        if (numRows == 0) {
          return res.status(200).json([{"item":"don't history"}]);
        } else {
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
