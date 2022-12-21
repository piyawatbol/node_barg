const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bargfood",
});

router.get("/:request_id", async (req, res) => {
  const request_id = req.params.request_id;
  try {
    connection.query(
      "SELECT * FROM tb_rate_store WHERE request_id = ?",
      [request_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        numRows = results.length;
        if(numRows == 1){
          res.status(200).json('have');
        }else{
          res.status(200).json('dont have');
        }
        
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
