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
    const check_password = req.body.password;
    try {
        connection.query("SELECT password FROM user WHERE user_id = ?", [user_id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            password = results[0]['password'];
            console.log(`check_password :${check_password} password : ${password}`)
            if (check_password == password) {
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