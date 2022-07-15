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
    const checkOtp = req.body.checkOtp;
    try {
        connection.query("SELECT otp FROM user WHERE email = ?", [email], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            otp = results[0]['otp'];
            console.log(checkOtp)
            console.log(otp)
            if(otp == checkOtp){
                return res.status(200).json("Correct")
            }else{
                return res.status(200).json("Not Correct")
            }
           
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

module.exports = router;