const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

const storage = multer.diskStorage({
  destination: "./images/users",
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
  const img = req.file.filename;
  const id = req.body.id;
  try {
    connection.query(
      "SELECT user_image FROM tb_users WHERE user_id = ?",
      [id],
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        var filePath = `./images/users/${results[0]["user_image"]}`;
        if (results[0]["user_image"] != "") {
          fs.unlinkSync(filePath);
        }
        connection.query(
          "UPDATE tb_users SET user_image = ? WHERE user_id = ?",
          [img, id],
          (err, results) => {
            if (err) {
              console.log(err);
              return res.status(400).send();
            } else {
              return res.status(200).json("upload Success");
            }
          }
        );
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
