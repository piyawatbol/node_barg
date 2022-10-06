const express = require('express');
const router = express.Router();
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bargfood'
});

router.patch("/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
  
    try {
        connection.query("UPDATE tb_users SET first_name = ? ,last_name = ?  WHERE user_id = ?", [first_name, last_name, user_id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json("update success");
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})


module.exports = router;