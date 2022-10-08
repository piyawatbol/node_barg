const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bargfood'
});

router.patch("/:food_id", async (req, res) => {
    const food_id = req.params.food_id;
    const food_name = req.body.food_name;
    const price = req.body.price;
    const detail = req.body.detail;
    const food_status = req.body.food_status;
    try {
        connection.query("UPDATE tb_food SET food_name = ? ,price = ? , detail = ? ,food_status = ? WHERE food_id = ?", [food_name,price,detail,food_status,food_id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }else{
                res.status(200).json("update menu success");
            }
            
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

module.exports = router;