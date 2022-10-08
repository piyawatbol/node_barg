const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const fs = require('fs')


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bargfood'
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