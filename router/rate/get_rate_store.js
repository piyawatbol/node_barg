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
      "SELECT * FROM tb_rate_store JOIN tb_request ON tb_rate_store.request_id = tb_request.request_id JOIN tb_users ON tb_request.user_id = tb_users.user_id WHERE tb_rate_store.store_id = ?",
      [store_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        numRows = results.length;
        if (numRows == 0) {
          return res.status(200).json([{ item: "not have rate" }]);
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

router.get("/:store_id/:star", async (req, res) => {
  const store_id = req.params.store_id;
  const star = req.params.star;
  try {
    connection.query(
      "SELECT * FROM tb_rate_store JOIN tb_request ON tb_rate_store.request_id = tb_request.request_id JOIN tb_users ON tb_request.user_id = tb_users.user_id WHERE star = ? AND tb_rate_store.store_id = ?",
      [star,store_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        numRows = results.length;
        if (numRows == 0) {
          return res.status(200).json([{ item: "not have rate" }]);
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
