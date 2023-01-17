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

router.post("/", async (req, res) => {
  const { user_name, email, phone , status_id } = req.body;
  try {
    connection.query(
      "SELECT user_name FROM tb_users WHERE user_name = ? AND status_id = ?",
      [user_name,status_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        numRows = results.length;
        if (numRows == 1) {
          return res.status(200).json("duplicate username");
        } else {
          connection.query(
            "SELECT email FROM tb_users WHERE email = ? AND status_id = ?",
            [email,status_id],
            (err, results, fields) => {
              if (err) {
                console.log(err);
                return res.status(400).send();
              }
              numRows = results.length;
              if (numRows == 1) {
                return res.status(200).json("duplicate email");
              } else {
                connection.query(
                  "SELECT phone FROM tb_users WHERE phone = ? AND status_id = ?",
                  [phone,status_id],
                  (err, results, fields) => {
                    if (err) {
                      console.log(err);
                      return res.status(400).send();
                    }
                    numRows = results.length;
                    if (numRows == 1) {
                      return res.status(200).json("duplicate phone");
                    } else {
                      return res.status(200).json("not duplicate");
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
