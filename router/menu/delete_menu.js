const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const fs = require('fs')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bargfood'
});

router.delete("/:food_id", async (req, res) => {
    const food_id = req.params.food_id;
    try {
        connection.query("SELECT food_image FROM tb_food WHERE food_id = ?", [food_id], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            var filePath = `./images/food/${results[0]['food_image']}`;
            if (results[0]['food_image'] != "") {
                fs.unlinkSync(filePath);
            }
            connection.query("DELETE FROM tb_food WHERE food_id = ?", [food_id], (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }

                return res.status(200).json("delete menu success");

            })

        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

module.exports = router;

