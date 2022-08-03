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
    const accept_status = "1";
    const otp = "empty"
  
    connection.query("UPDATE user SET otp = ?, accept_status = ? WHERE email = ?", [otp,accept_status,email], (err, results,) => {
        if (err) {
            console.log(err);
            return res.status(400).send();
        }
        return res.status(200).json('accept email success');
    })
})

module.exports = router;