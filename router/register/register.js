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
   
    const { first_name, last_name, user_name, password, email, user_image, status_id,address_id } = req.body;
    const phone = "";
    
    if(first_name == ""){
        return res.status(200).json("firstname null");
    }else  if(last_name == ""){
        return res.status(200).json("lastname null");
    }else  if(user_name == ""){
        return res.status(200).json("username null");
    }else  if(email == ""){
        return res.status(200).json("email null");
    }else  if(password == ""){
        return res.status(200).json("password null");
    }else  if(password.length < 6){
        return res.status(200).json("password 6");
    }
    try {
        connection.query("SELECT user_name FROM user WHERE user_name = ?", [user_name], (err, results,) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            numRows = results.length;
            if (numRows == 1) {
                return res.status(200).json("duplicate username");
            } else {
                connection.query("SELECT email FROM user WHERE email = ?", [email], (err, results,) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send();
                    }
                    numRows = results.length;
                    if (numRows == 1) {
                        return res.status(200).json("duplicate email");
                    } else {
                        connection.query("INSERT INTO user(first_name,last_name,user_name,password,email,phone,user_image,status_id,address_id) VALUES(?,?,?,?,?,?,?,?,?)", [first_name, last_name, user_name, password, email,phone, user_image, status_id,address_id], (err, results, fields) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).send();
                            } else {
                                return res.status(200).json("Resgister Success");
                            }

                        })
                    }
                })
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

module.exports = router;