const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const nodemailer = require('nodemailer')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bargfood'
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pywsddbol2@gmail.com',
        pass: 'yjsxckicedbfpyhu'
    }
});

router.post("/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    const empty = "empty";
    const email = req.body.email;
    function getRandom(max) {
        return Math.floor(Math.random() * max);
    }
    const otp = getRandom(999999);
    connection.query("UPDATE user SET otp = ? WHERE user_id = ?", [otp, user_id], (err, results,) => {
        if (err) {
            console.log(err);
            return res.status(400).send();
        } else {
            let mailOptions = {
                form: 'pywsddbol2@gmail.com',
                to: `${email}`,
                subject: `OTP : ${otp}`
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err)
                } else {
                    setTimeout(() => {
                        connection.query("UPDATE user SET otp = ? WHERE user_id = ?", [empty, user_id], (err, results,) => {
                        })
                        console.log("reset otp")
                    }, 60000)
                    return res.status(200).json("send email success")
                }
            });
        }
    })
})
module.exports = router;
