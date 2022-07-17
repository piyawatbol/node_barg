const express = require('express');
const router = express.Router();
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bargfood'
});

router.get("/:store_id", async (req, res) => {
    const store_id = req.params.store_id;

    try {
        connection.query("SELECT * FROM food WHERE store_id = ?", [store_id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

module.exports = router;