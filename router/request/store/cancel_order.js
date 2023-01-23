const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const moment = require("moment/moment");

require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

router.post("/", async (req, res) => {
  const request_id = req.body.request_id;
  const order_status_id = req.body.order_status_id;
  const banking = "Wallet";
  const wallet_status_id = 1;
  const wallet_date = moment().format("l");
  const wallet_time = moment().format("LTS");
  try {
    connection.query(
      "UPDATE tb_request SET order_status_id = ? WHERE request_id = ?",
      [order_status_id, request_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        } else {
          try {
            connection.query(
              "SELECT * FROM tb_request JOIN tb_wallet ON tb_request.user_id = tb_wallet.user_id WHERE request_id = ?",
              [request_id],
              (err, results, fields) => {
                if (err) {
                  console.log(err);
                  return res.status(400).send();
                } else {
                  let user_id = results[0].user_id;
                  let buyer_id = results[0].buyer_id;
                  let total = results[0].total;
                  let wallet_id = results[0].wallet_id;

                  if (buyer_id == 1) {
                    try {
                      connection.query(
                        "UPDATE tb_wallet SET wallet_total = wallet_total +" +
                          total +
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
                                  total,
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
                                    return res
                                      .status(200)
                                      .json("Cancel Order Success");
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
                  }else{
                    return res.status(200).json("Cancel Order Success");
                  }
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
});

module.exports = router;
