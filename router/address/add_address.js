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
  const user_id = req.body.user_id;
  const name = req.body.name;
  const phone = req.body.phone;
  const house_number = req.body.house_number;
  const county = req.body.county;
  const district = req.body.district;
  const province = req.body.province;
  const zip_code = req.body.zip_code;
  const address_detail = req.body.address_detail;
  const latitude = req.body.latitude;
  const longtitude = req.body.longtitude;
  const address_status_id = req.body.address_status_id;
  
  try {
    connection.query(
      "INSERT INTO tb_address(user_id,name,phone,house_number,county,district,province,zip_code,address_detail,latitude,longtitude,address_status_id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
      [user_id,name,phone,house_number,county,district,province,zip_code,address_detail,latitude,longtitude,address_status_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        } else {
          return res.status(200).json("Add to Address Success");
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
