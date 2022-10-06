const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bargfood'
});

router.post("/", async (req, res) => {
    const email = req.body.email;
    const pass_word = req.body.pass_word;
    connection.query("UPDATE tb_users SET pass_word = ? WHERE email = ?", [pass_word,email], (err, results,) => {
        if (err) {
            console.log(err);
            return res.status(400).send();
        }
        return res.status(200).json('reset success');
    })
})

module.exports = router;