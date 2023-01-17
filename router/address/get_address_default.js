const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "bargfood",
});

router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    connection.query(
      "SELECT * FROM tb_address JOIN tb_address_status ON tb_address.address_status_id = tb_address_status.address_status_id WHERE tb_address.user_id=? AND  tb_address.address_status_id = '1'",
      [user_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        numRows = results.length;
        if(numRows == 0){
         return res.status(200).json([{"item": "not have cart"}]);
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
