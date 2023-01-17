const express = require('express');
const router = express.Router();
const mysql = require('mysql');

require("dotenv").config();
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
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
    const address_default_id = req.body.address_default_id;

    if(address_status_id == 1){
        try {
            connection.query(
              "UPDATE tb_address SET address_status_id = '5' WHERE user_id =? AND address_id = ?",
              [ user_id, address_default_id],
              (err, results, fields) => {
                if (err) {
                  console.log(err);
                  return res.status(400).send();
                } else {
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
                }
              }
            );
          } catch (err) {
            console.log(err);
            return res.status(500).send();
          }
    }else{
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
    }

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