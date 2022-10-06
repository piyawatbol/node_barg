const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bargfood",
});

router.post("/", async (req, res) => {
  const { user_name, email, phone } = req.body;
  try {
    connection.query(
      "SELECT user_name FROM tb_users WHERE user_name = ?",
      [user_name],
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
            "SELECT email FROM tb_users WHERE email = ?",
            [email],
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
                  "SELECT phone FROM tb_users WHERE phone = ?",
                  [phone],
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
