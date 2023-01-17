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

router.post("/", async (req, res) => {
    const email = req.body.email;
    const pass_word = req.body.pass_word;
    const status_id = req.body.status_id;
    connection.query("UPDATE tb_users SET pass_word = ? WHERE email = ? AND status_id = ?", [pass_word,email,status_id], (err, results,) => {
        if (err) {
            console.log(err);
            return res.status(400).send();
        }
        return res.status(200).json('reset success');
    })
})

module.exports = router;
