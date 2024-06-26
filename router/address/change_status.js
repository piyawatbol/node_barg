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

router.patch("/:address_id", async (req, res) => {
  const address_id = req.params.address_id;
  // const user_id = req.params.user_id;
  const address_status_id = req.body.address_status_id;

  try {
    connection.query(
      "UPDATE tb_address SET address_status_id = ? WHERE  address_id = ?",
      [address_status_id,  address_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        } else {
          res.status(200).json("update address success");
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
