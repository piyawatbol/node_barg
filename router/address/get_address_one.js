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


router.get("/:address_id", async (req, res) => {
  const address_id = req.params.address_id;
  try {
    connection.query(
      "SELECT * FROM tb_address JOIN tb_address_status ON tb_address.address_status_id = tb_address_status.address_status_id WHERE  tb_address.address_id=?",
      [address_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        numRows = results.length;
        if (numRows == 0) {
          return res.status(200).json([{ item: "not have cart" }]);
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
