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
  const {
    first_name,
    last_name,
    user_name,
    pass_word,
    email,
    phone,
    user_image,
    status_id,
  } = req.body;
  try {
    connection.query(
      "INSERT INTO tb_users(first_name,last_name,user_name,pass_word,email,phone,user_image,status_id) VALUES(?,?,?,?,?,?,?,?)",
      [
        first_name,
        last_name,
        user_name,
        pass_word,
        email,
        phone,
        user_image,
        status_id,
      ],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        } else {
          return res.status(200).json("register success");
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
