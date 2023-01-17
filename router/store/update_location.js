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

router.patch("/:store_id", async (req, res) => {
    const store_id = req.params.store_id;
    const store_lat = req.body.store_lat;
    const store_long= req.body.store_long;
    try {
        connection.query("UPDATE tb_store SET store_lat = ? , store_long = ?  WHERE store_id = ?", [store_lat,store_long,store_id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }else{
                res.status(200).json("update Location success");
            }
            
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

module.exports = router;