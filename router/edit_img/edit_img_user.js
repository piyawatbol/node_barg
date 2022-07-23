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
    destination: './images/users',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    storage: storage
})


router.post("/", upload.single('img'), (req, res) => {
    const img = req.file.filename;
    const id = req.body.id;
    try {
        connection.query("SELECT user_image FROM user WHERE user_id = ?", [id], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            } 
                var filePath = `./images/users/${results[0]['user_image']}`;
                if(results[0]['user_image'] != ""){
                    fs.unlinkSync(filePath);
                }         
                connection.query("UPDATE user SET user_image = ? WHERE user_id = ?", [img, id], (err, results) => {
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