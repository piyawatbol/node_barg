const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "bargfood",
});

router.get("/", async (req, res) => {
  try {
    connection.query(
      "SELECT * FROM tb_store ",

      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        numRows = results.length;
        if (numRows == 0) {
          return res.status(200).json([{ item: "not have sotre" }]);
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
