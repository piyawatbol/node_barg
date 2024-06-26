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

router.get("/:store_id", async (req, res) => {
    const store_id = req.params.store_id;

    try {
        connection.query("SELECT * FROM tb_food WHERE store_id = ? AND food_status = 1 ORDER BY food_status DESC", [store_id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            numRows = results.length;
            if(numRows == 0){
                return res.status(200).json([{"item": "not have menu"}]);
            }else{
                res.status(200).json(results)
            }
            
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

module.exports = router;