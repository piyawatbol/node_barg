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

router.patch("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const wallet_id = req.body.wallet_id;
  const wallet_amount = req.body.wallet_amount;
  const wallet_total = req.body.wallet_total;
  const banking = "wallet";
  const wallet_status_id = 2;
  const wallet_date = moment().format("l");
  const wallet_time = moment().format("LTS");

  if (parseInt(wallet_amount)  > parseInt(wallet_total)) {
    return res.status(200).json("The amount in the wallet is insufficient");
  } else {
    try {
      connection.query(
        "UPDATE tb_wallet SET wallet_total = wallet_total -" +
          wallet_amount +
          " WHERE user_id = ?",
        [user_id],
        (err, results, fields) => {
          if (err) {
            console.log(err);
            return res.status(400).send();
          } else {
            try {
              connection.query(
                "INSERT INTO tb_wallet_hitory(wallet_id,wallet_amount,banking,wallet_status_id,wallet_date,wallet_time) VALUES(?,?,?,?,?,?)",
                [
                  wallet_id,
                  wallet_amount,
                  banking,
                  wallet_status_id,
                  wallet_date,
                  wallet_time,
                ],
                (err, results, fields) => {
                  if (err) {
                    console.log(err);
                    return res.status(400).send();
                  } else {
                    return res.status(200).json("pay wallet Success");
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
});

module.exports = router;
