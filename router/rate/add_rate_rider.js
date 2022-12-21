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
  const rider_id = req.body.rider_id;
  const request_id = req.body.request_id;
  const rate_detail = req.body.rate_detail;
  const star = req.body.star;
  try {
    connection.query(
      "INSERT INTO tb_rate_rider(rider_id,request_id,rate_rider_detail,star) VALUES(?,?,?,?)",
      [rider_id,request_id,rate_detail,star],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        } else {
          return res.status(200).json("Add Rate Success");
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
