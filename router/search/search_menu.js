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

router.post("/:store_id", async (req, res) => {
    const store_id = req.params.store_id;
    const data = req.body.data;
  try {
    connection.query(
      "SELECT * FROM tb_food WHERE food_name LIKE '%"+data+"%' AND store_id=?",[store_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        numRows = results.length;
        if(numRows == 0){
         return res.status(200).json([{"item": "not have menu"}]);
        }else{
          return res.status(200).json(results);
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
