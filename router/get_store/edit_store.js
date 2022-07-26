const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bargfood'
});

router.patch("/:store_id", async (req, res) => {
    const store_name = req.body.store_name;
    const store_house_number = req.body.store_house_number;
    const store_county = req.body.store_county;
    const store_district = req.body.store_district;
    const store_province = req.body.store_province;
    const store_zipcode = req.body.store_zipcode;

    try {
        connection.query("UPDATE store SET store_name = ? , store_house_number = ? , store_county = ?,store_district = ?,store_province = ?, store_zipcode = ?", [store_name,store_house_number,store_county,store_district,store_province,store_zipcode], (err, results, fields) => {
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