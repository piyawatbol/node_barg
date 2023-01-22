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

router.patch("/:store_id", async (req, res) => {
  const store_id = req.params.store_id;
  const wallet_store_id = req.body.wallet_store_id;
  const wallet_store_amount = req.body.wallet_store_amount;
  const banking = req.body.banking;
  const wallet_store_total = req.body.wallet_store_total;
  const wallet_status_id = 2;
  const wallet_store_date = moment().format("l");
  const wallet_store_time = moment().format("LTS");




  if( parseInt(wallet_store_amount)  <= parseInt(wallet_store_total) ){
      try {
            connection.query(
              "UPDATE tb_wallet_store SET wallet_store_total = wallet_store_total -" +
              wallet_store_amount +
                " WHERE store_id = ?",
              [store_id],
              (err, results, fields) => {
                if (err) {
                  console.log(err);
                  return res.status(400).send();
                } else {
                  try {
                    connection.query(
                      "INSERT INTO tb_wallet_store_history(wallet_store_id,wallet_store_amount,banking,wallet_status_id,wallet_store_date,wallet_store_time) VALUES(?,?,?,?,?,?)",
                      [
                        wallet_store_id,
                        wallet_store_amount,
                        banking,
                        wallet_status_id,
                        wallet_store_date,
                        wallet_store_time,
                      ],
                      (err, results, fields) => {
                        if (err) {
                          console.log(err);
                          return res.status(400).send();
                        } else {
                          return res.status(200).json("Withdraw money wallet Success");
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
  }else {
    return res.status(200).json("The amount in the wallet is insufficient")
  }
  
});

module.exports = router;
