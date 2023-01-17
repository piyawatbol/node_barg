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
  destination: "./images/success",
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

router.post("/", upload.single("img"), (req, res) => {
  const request_id = req.body.request_id;
  const img = req.file.filename;
  try {
    connection.query(
      "INSERT INTO tb_request_success(request_id,success_img) VALUES(?,?)",
      [request_id,img],
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
