const express = require('express');
const router = express.Router();
const mysql = require('mysql');

require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

router.post("/", async (req, res) => {
   const request_id = req.body.request_id;
   const rider_lati = req.body.rider_lati;
   const rider_longti = req.body.rider_longti;
    try {
        connection.query("UPDATE tb_request SET rider_lati = ? , rider_longti = ? WHERE request_id = ?", [rider_lati,rider_longti,request_id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }else{
                res.status(200).json("update request success");
            }
            
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

module.exports = router;
