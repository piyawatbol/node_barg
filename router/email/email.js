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

router.post("/", async (req, res) => {
    const empty = "";
    const email = req.body.email;
    function getRandom(max) {
        return Math.floor(Math.random() * max);
    }
    const otp = getRandom(999999);
    connection.query("SELECT email FROM user WHERE email = ?", [email], (err, results,) => {
        if (err) {
            console.log(err);
            return res.status(400).send();
        }
        numRows = results.length;
        if (numRows != 1) {
            return res.status(200).json("not have email");
        } else {
            connection.query("UPDATE user SET otp = ? WHERE email = ?", [otp, email], (err, results,) => {
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
                                connection.query("UPDATE user SET otp = ? WHERE email = ?", [empty, email], (err, results,) => {
                                })
                                console.log("reset otp")
                            }, 60000)
                            return res.status(200).json("send email success")
                        }
                    });
                }
            })
        }
    })
})
module.exports = router;
