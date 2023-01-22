const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const moment = require("moment/moment");

require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;
const orderData = [];

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

const get_order = async (request_id, res) => {
  try {
    connection.query(
      "SELECT * FROM tb_request  WHERE tb_request.request_id =?",
      [request_id],

      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        } else {
          // return results;
          orderData = results;
          return res.status(200).json(results);
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
};


const pay_wallet_store = async () => {
  try {
    connection.query(
      "UPDATE tb_wallet SET wallet_total = wallet_total +" +
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
                  return res.status(200).json("Top up wallet Success");
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
};

router.post("/:request_id", async (req, res) => {
  const request_id = req.params.request_id;
  const banking = "wallet";
  const wallet_status_id = 1;
  const wallet_date = moment().format("l");
  const wallet_time = moment().format("LTS");

 
  try {
    connection.query(
      "SELECT * FROM tb_request  LEFT JOIN tb_wallet_store ON tb_request.store_id = tb_wallet_store.store_id JOIN tb_wallet ON tb_request.rider_id = tb_wallet.user_id WHERE tb_request.request_id =?",
      [request_id],

      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        } else {
          // return res.status(200).json(results);
          let wallet_id = results[0].wallet_id;
          let wallet_store_id = results[0].wallet_store_id;
          let wallet_rider_amount = results[0].delivery_fee;
          let sum = results[0].sum_price;
          let wallet_amount = sum * 0.3;
          let buyer_id = results[0].buyer_id;

          if(buyer_id == 1){
            try {
              //rider
              connection.query(
                "UPDATE tb_wallet SET wallet_total = wallet_total +" +
                wallet_rider_amount +
                  " WHERE wallet_id = ?",
                [wallet_id],
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
                          wallet_rider_amount,
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
                            // wallet store
  
                            try {
                              connection.query(
                                "UPDATE tb_wallet_store SET wallet_store_total = wallet_store_total +" +
                                wallet_amount +
                                  " WHERE wallet_store_id  = ?",
                                [wallet_store_id],
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
                                            return res
                                              .status(200)
                                              .json("Order Success");
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
            try {
              connection.query(
                "UPDATE tb_wallet_store SET wallet_store_total = wallet_store_total +" +
                wallet_amount +
                  " WHERE wallet_store_id  = ?",
                [wallet_store_id],
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
                            return res
                              .status(200)
                              .json("Order Success");
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

          
          
         }
       }
     );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
