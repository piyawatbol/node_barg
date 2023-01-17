const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'bargfood'
});

const storage = multer.diskStorage({
    destination: './images/food',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

router.post("/",upload.single('img'),(req, res) => {
    const store_id = req.body.store_id;
    const food_name = req.body.food_name;
    const price = req.body.price;
    const detail = req.body.detail;
    const img = req.file.filename;
    const food_status = 1;
    
    try {
        connection.query("INSERT INTO tb_food(store_id,food_name,price,detail,food_image,food_status) VALUES(?,?,?,?,?,?)", [store_id,food_name,price,detail,img,food_status], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            } else {
                return res.status(200).json("Add Menu Success");
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})




module.exports = router;