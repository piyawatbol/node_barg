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

router.delete("/:user_id/:address_id", async (req, res) => {
  const user_id = req.params.user_id;
  const address_id = req.params.address_id;
  try {
    connection.query(
      "DELETE FROM tb_address WHERE user_id = ? AND address_id =?",
      [user_id,address_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        return res.status(200).json("delete address success");
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
