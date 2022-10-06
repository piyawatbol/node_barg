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
  const email = req.body.email;
  const otp = req.body.otp;
  try {
    connection.query(
      "SELECT otp FROM tb_otp_email WHERE email = ? ORDER BY otp ASC",
      [email],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        if (results == "") {
          return res.status(200).json("not correct");
        } else {
          var _otp = results[0]["otp"];
          if (_otp == null || _otp == "") {
            return res.status(200).json("not correct");
          }
          if (otp == _otp) {
            connection.query(
              "DELETE from tb_otp_email WHERE email = ?",
              [email],
              (err, results, fields) => {
                if (err) {
                  console.log(err);
                  return res.status(400).send();
                }
                return res.status(200).json("correct");
              }
            );
          } else {
            return res.status(200).json("not correct");
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
