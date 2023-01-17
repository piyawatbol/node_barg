const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'bargfood'
});

router.patch("/:user_id/:address_id", async (req, res) => {
    const address_id = req.params.address_id;
    const user_id = req.params.user_id;
    const name = req.body.name;
    const phone = req.body.phone;
    const house_number = req.body.house_number;
    const county = req.body.county;
    const district = req.body.district;
    const province = req.body.province;
    const zip_code = req.body.zip_code;
    const address_detail = req.body.address_detail;
    const latitude = req.body.latitude;
    const longtitude = req.body.longtitude;
    const address_status_id = req.body.address_status_id;

    try {
        connection.query("UPDATE tb_address SET name = ? , phone = ?, house_number = ?, county = ?, district  = ?, province  = ?, zip_code  = ?, address_detail  = ?, latitude  = ?, longtitude  = ?, address_status_id  = ? WHERE user_id =? AND address_id = ?",
         [name ,phone ,house_number ,county,district ,province ,zip_code ,address_detail ,latitude,longtitude,address_status_id,user_id ,address_id  ], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }else{
                res.status(200).json("update address success");
            }
            
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

module.exports = router;