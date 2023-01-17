const express = require("express");
const { sum } = require("lodash");
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
router.post("/", (req, res) => {
  var currentdate = new Date();
  const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
  const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;

  const user_id = req.body.user_id;
  const address_id = req.body.address_id;
  const rider_id = "";
  const store_id = req.body.store_id;
  const order_id = req.body.order_id;
  const rider_lati = "";
  const rider_longti = "";
  const img = '';
  const status = req.body.status;
  const sum_price = req.body.sum_price;
  const delivery_fee = req.body.delivery_fee;
  const total = req.body.total;
  
  try {
    connection.query(
      "INSERT INTO tb_request(user_id,address_id,rider_id,store_id,order_id,rider_lati,rider_longti,slip_img,status,date,time,sum_price,delivery_fee,total) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [user_id,address_id,rider_id,store_id,order_id,rider_lati,rider_longti,img,status,date,time,sum_price,delivery_fee,total],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        } else {
          return res.status(200).json("Add Request Success");
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
