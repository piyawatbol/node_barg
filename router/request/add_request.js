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
  const user_id = req.body.user_id;
  const rider_id = "";
  const store_id = req.body.store_id;
  const order_id = req.body.order_id;
  const user_lati = req.body.user_lati;
  const user_longti = req.body.user_longti;
  const rider_lati = req.body.rider_lati;
  const rider_longti = req.body.rider_longti;
  const img = req.file.filename;
  const status = req.body.status;

  try {
    connection.query(
      "INSERT INTO tb_request(user_id,rider_id,store_id,order_id,user_lati,user_longti,rider_lati,rider_longti,slip_img,status) VALUES(?,?,?,?,?,?,?,?,?,?)",
      [user_id,rider_id,store_id,order_id,user_lati,user_longti,rider_lati,rider_longti,img,status],
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
