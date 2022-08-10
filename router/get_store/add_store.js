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
    destination: './images/store',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

router.post("/:user_id",upload.single('img'), (req, res) => {
     const user_id = req.params.user_id;
     const store_longtitude = "";
     const store_latitude = "";
     const store_image = req.file.filename;
    const { store_name,store_house_number,store_county,store_district,store_province,store_zipcode} = req.body

    if(store_name == ""){
        return res.status(200).json("store name null");
    }


    try {
        connection.query("INSERT INTO store(store_name,store_image,user_id,store_house_number,store_county,store_district,store_province,store_zipcode,store_lat,store_long) VALUES(?,?,?,?,?,?,?,?,?,?)", [store_name,store_image,user_id,store_house_number,store_county,store_district,store_province,store_zipcode,store_latitude,store_longtitude], (err, results, fields) => {
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