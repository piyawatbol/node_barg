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
    const data = req.body.data;
    if(data!=[]){
        try {
            connection.query(
              "SELECT * FROM tb_store WHERE store_name LIKE '%"+data+"%'",
              (err, results, fields) => {
                if (err) {
                  console.log(err);
                  return res.status(400).send();
                }
                numRows = results.length;
                if(numRows == 0){
                 return res.status(200).json([{"item": "not have store"}]);
                }else{
                  return res.status(200).json(results);
                }
              }
            );
          } catch (err) {
            console.log(err);
            return res.status(500).send();
          }
    }else{
        return res.status(200).json([]);
    }
 
});

module.exports = router;
