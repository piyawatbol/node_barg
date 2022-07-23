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
     const user_id = req.params.user_id;
    const { store_name,store_image,store_house_number,store_county,store_district,store_province,store_zipcode,store_latitude,store_longtitude} = req.body
    
    try {
        connection.query("INSERT INTO store(store_name,store_image,user_id,store_house_number,store_county,store_district,store_province,store_zipcode,store_latitude,store_longtitude) VALUES(?,?,?,?,?,?,?,?,?,?)", [store_name,store_image,user_id,store_house_number,store_county,store_district,store_province,store_zipcode,store_latitude,store_longtitude], (err, results, fields) => {
             if (err) {
                 console.log(err);
                return res.status(400).send();
            }
             res.status(200).json("completed")
         })
       

    } catch (err) {
        console.log(err);
        return res.status(500).send({message : err});
    }
})


module.exports = router;