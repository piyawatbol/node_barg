const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bargfood",
});

router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
    connection.query(
      "SELECT * FROM tb_store WHERE user_id = ?",
      [user_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
       numRows = results.length;
       if(numRows == 0){
        return res.status(200).json([{"item": "not have sotre"}]);
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

router.get("/single/:user_id/:store_id", async (req, res) => {
  const user_id = req.params.user_id;
  const store_id = req.params.store_id;

  try {
    connection.query(
      "SELECT * FROM store WHERE user_id = ? AND store_id = ?",
      [user_id, store_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        
        res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
