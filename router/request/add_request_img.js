const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const multer = require("multer");
const path = require("path");


const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bargfood",
});

const storage = multer.diskStorage({
  destination: "./images/slip",
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
  const img = req.file.filename;
  const status = req.body.status;
  
  try {
    connection.query(
      "INSERT INTO tb_request(user_id,address_id,rider_id,store_id,order_id,rider_lati,rider_longti,slip_img,status,date,time) VALUES(?,?,?,?,?,?,?,?,?,?,?)",
      [user_id,address_id,rider_id,store_id,order_id,rider_lati,rider_longti,img,status,date,time],
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
