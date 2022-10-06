const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bargfood",
});

router.patch("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const email = req.body.email;

  try {
    connection.query(
      "UPDATE tb_users SET email = ? WHERE user_id = ?",
      [email, user_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(200).json("update email success");
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
