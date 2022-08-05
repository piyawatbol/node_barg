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
    const checkOtp = req.body.checkOtp;
    const empty = "empty";
    try {
        connection.query("SELECT otp FROM user WHERE user_id = ?", [user_id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            otp = results[0]['otp'];
            console.log(`otp : ${otp} check : ${checkOtp} `)
            if (otp == checkOtp) {
                connection.query("UPDATE user SET otp = ? WHERE user_id = ?", [empty, user_id], (err, results, fields) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send();
                    }
                    return res.status(200).json("Correct")
                })
            } else {
                return res.status(200).json("Not Correct")
            }
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})
module.exports = router

