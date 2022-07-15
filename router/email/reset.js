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
    const Newpassword = req.body.Newpassword;
    const otp = "0";
    connection.query("UPDATE user SET password = ?,otp = ? WHERE email = ?", [Newpassword,otp,email], (err, results,) => {
        if (err) {
            console.log(err);
            return res.status(400).send();
        }
        return res.status(200).json('reset success');




    })
})


module.exports = router;