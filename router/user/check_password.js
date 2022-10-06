const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bargfood'
});
router.post("/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    const pass_word = req.body.pass_word;
    try {
        connection.query("SELECT pass_word FROM tb_users WHERE user_id = ?", [user_id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            var _password = results[0]['pass_word'];
            console.log(`check_password :${pass_word} password : ${_password}`)
            if (pass_word == _password) {
                return res.status(200).json("correct")
            } else {
                return res.status(200).json("not correct")
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

module.exports = router;