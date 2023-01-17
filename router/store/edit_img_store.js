const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const fs = require('fs')


require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

const storage = multer.diskStorage({
    destination: './images/store',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storage
})


router.post("/", upload.single('img'), (req, res) => {
    const img = req.file.filename;
    const store_id = req.body.store_id;
    try {
        connection.query("SELECT store_image FROM tb_store WHERE store_id = ?", [store_id], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            } 
                var filePath = `./images/store/${results[0]['store_image']}`;
                if(results[0]['store_image'] != ""){
                    fs.unlinkSync(filePath);
                }         
                connection.query("UPDATE tb_store SET store_image = ? WHERE store_id = ?", [img, store_id], (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send();
                    } else {
                        return res.status(200).json("upload Success");
                    }
                })
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

module.exports = router;