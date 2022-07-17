const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
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
    const status_id = 1;
    const food_name = req.body.food_name;
    const price = req.body.price;
    const detail = req.body.detail;
    const img = req.file.filename;
    
    try {
        connection.query("INSERT INTO food(store_id,status_id,food_name,price,detail,food_image) VALUES(?,?,?,?,?,?)", [store_id,status_id,food_name,price,detail,img], (err, results, fields) => {
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