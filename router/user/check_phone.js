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
    const { phone,status_id } = req.body;
    try {
        connection.query("SELECT phone FROM tb_users WHERE phone = ? AND status_id = ?", [phone,status_id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            numRows = results.length;
            if (numRows == 1) {
                return res.status(200).json('have phone')
            }else{
                return res.status(200).json('dont have phone')
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

module.exports = router;