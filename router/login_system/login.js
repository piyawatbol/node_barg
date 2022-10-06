const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bargfood",
});

router.post("/", async (req, res) => {
  const { user_name, pass_word, status_id } = req.body;
  try {
    connection.query(
      "SELECT * FROM tb_users WHERE user_name = ? && pass_word = ? && status_id = ?",
      [user_name, pass_word, status_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }  
        numRows = results.length;
        if (numRows == 1) {
            return res.status(200).json(results);
        }
        return res.status(200).json('dont have user')
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
