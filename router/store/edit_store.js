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

router.patch("/:store_id", async (req, res) => {
  const store_id = req.params.store_id;
  const store_name = req.body.store_name;
  const store_house_number = req.body.store_house_number;
  const store_county = req.body.store_county;
  const store_district = req.body.store_district;
  const store_province = req.body.store_province;
  const store_zipcode = req.body.store_zipcode;
  const store_detail = req.body.store_detail;

  try {
    connection.query(
      "UPDATE tb_store SET store_name = ? , store_house_number = ? , store_county = ?,store_district = ?,store_province = ?, store_zipcode = ? ,store_detail = ? WHERE store_id = ?",
      [
        store_name,
        store_house_number,
        store_county,
        store_district,
        store_province,
        store_zipcode,
        store_detail,
        store_id,
      ],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        } else {
          res.status(200).json("update store success");
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
