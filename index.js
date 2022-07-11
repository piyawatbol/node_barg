const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const app = express();
app.use(express.json());

const port = 3000;
app.listen(port, () => {
    console.log(`Sever start port ${port}`)
})
// Connect Database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Bargfood'
});

connection.connect((err) => {
    if (err) {
        console.log("Not connect database")
        return;
    }
    app.get("/", async (req, res) => {
        console.log("Connect Database Succss fully")
        return res.status(200).json("Connect Database")
    })

})

// Register
app.post("/register", async (req, res) => {
    const { firstname, lastname, username, password, email, img_user, status_user } = req.body;
    try {
        connection.query("SELECT username FROM tb_users WHERE username = ?", [username], (err, results,) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            numRows = results.length;
            if (numRows == 1) {
                return res.status(200).json("duplicate username");
            } else {
                connection.query("SELECT email FROM tb_users WHERE email = ?", [email], (err, results,) => {
                    if (err) {
                        console.log(err);
                        return res.status(400).send();
                    }
                    numRows = results.length;
                    if (numRows == 1) {
                        return res.status(200).json("duplicate email");
                    } else {
                        connection.query("INSERT INTO tb_users(firstname,lastname,username,password,email,img_user,status_user) VALUES(?,?,?,?,?,?,?)", [firstname, lastname, username, password, email, img_user, status_user], (err, results, fields) => {
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
// Login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        connection.query("SELECT * FROM tb_users WHERE username = ? && password = ?", [username, password], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            numRows = results.length;
            if (numRows == 1) {
                return res.status(200).json(results);
            }
            return res.status(201).json('dont have user')
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})
// Get Data Users
app.get("/get_id/:id", async (req, res) => {
    const id = req.params.id;

    try {
        connection.query("SELECT * FROM tb_users WHERE id = ?", [id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})
// Update Date Users
app.patch("/update/:id", async (req, res) => {
    const id = req.params.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;
    try {
        connection.query("UPDATE tb_users SET firstname = ? ,lastname = ? ,email = ? ,phone = ? WHERE id = ?", [firstname, lastname, email, phone, id], (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json("update success");
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})
// Image

const storage = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})
// Upload Image
app.post("/upload", upload.single('img'), (req, res) => {
    const img = req.file.filename;
    const id = req.body.id;
    try {
        connection.query("SELECT img_user FROM tb_users WHERE id = ?", [id], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            } 
                var filePath = `./images/${results[0]['img_user']}`;
                if(results[0]['img_user'] != ""){
                    fs.unlinkSync(filePath);
                }         
                connection.query("UPDATE tb_users SET img_user = ? WHERE id = ?", [img, id], (err, results) => {
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

