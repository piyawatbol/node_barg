const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");


require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

const storage = multer.diskStorage({
  destination: "./images/rate_store",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/",upload.single("img"),(req, res) => {
  const store_id = req.body.store_id;
  const request_id = req.body.request_id;
  const rate_detail = req.body.rate_detail;
  const star = req.body.star; 
  const img = req.file.filename;
  var currentdate = new Date();
  const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
  const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
  try {
    connection.query(
      "INSERT INTO tb_rate_store(store_id,request_id,rate_store_detail,star,rate_store_img,date,time) VALUES(?,?,?,?,?,?,?)",
      [store_id,request_id,rate_detail,star,img,date,time],
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
