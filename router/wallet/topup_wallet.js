const express = require("express");
const moment = require("moment/moment");
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
  const wallet_id = req.body.wallet_id;
  const wallet_amount = req.body.wallet_amount;
  const banking = req.body.banking;
  const wallet_status_id = req.body.wallet_status_id;
  const wallet_date=moment().format('l');
  const wallet_time =moment().format('LTS');
  
  try {
    connection.query(
      "SELECT wallet_total FROM tb_wallet WHERE user_id =?",
      [user_id],

      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        const wallet = results[0]["wallet_total"];
        const total = parseInt(wallet) + parseInt(wallet_amount);
        try {
          connection.query(
            "UPDATE tb_wallet SET wallet_total = ? WHERE user_id = ?",
            [total, user_id],
            (err, results, fields) => {
              if (err) {
                console.log(err);
                return res.status(400).send();
              } else {
                try {
                  connection.query(
                    "INSERT INTO tb_wallet_history(user_id,wallet_total) VALUES(?,?)",
                    [
                      user_id,
                      0
                    ],
                    (err, results, fields) => {
                      if (err) {
                        console.log(err);
                        return res.status(400).send();
                      } else {
                        return res.status(200).json("register wallet Success");
                      }
                    }
                  );
                } catch (err) {
                  console.log(err);
                  return res.status(500).send();
                }
              }
            }
          );
        } catch (err) {
          console.log(err);
          return res.status(500).send();
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
