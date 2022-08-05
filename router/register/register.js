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
    const rule = "";
    const { first_name, last_name, user_name, password, email,phone, user_image, status_id } = req.body;
    const otp = "empty";
    const accept_status = "0";

    if (first_name == "") {
        return res.status(200).json("firstname null");
    } else if (last_name == "") {
        return res.status(200).json("lastname null");
    } else if (user_name == "") {
        return res.status(200).json("username null");
    } else if (email == "") {
        return res.status(200).json("email null");
    }else if (phone == "") {
        return res.status(200).json("phone null");
    } 
    else if (password == "") {
        return res.status(200).json("password null");
    } else if (password.length < 6) {
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
                        connection.query("SELECT phone FROM user WHERE phone = ?", [phone], (err, results,) => {
                            if (err) {
                                console.log(err);
                                return res.status(400).send();
                            }
                            numRows = results.length;
                            if (numRows == 1) {
                                return res.status(200).json("duplicate phone");
                            } else {
                                connection.query("INSERT INTO user(first_name,last_name,user_name,password,email,phone,user_image,status_id,rule,otp,accept_status) VALUES(?,?,?,?,?,?,?,?,?,?,?)", [first_name, last_name, user_name, password, email, phone, user_image, status_id, rule, otp, accept_status], (err, results, fields) => {
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
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

module.exports = router;