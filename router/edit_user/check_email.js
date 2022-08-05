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

    const newemail = req.body.email;
    try {
        connection.query("SELECT email FROM user WHERE email = ?", [newemail], (err, results,) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            numRows = results.length;
            if (numRows == 1) {
                return res.status(200).json("duplicate email");
            }
            return res.status(200).json("not duplicate");
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

module.exports = router;