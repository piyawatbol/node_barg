const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3000;
app.listen(port, () => {
    console.log(`Sever start port ${port}`)
})

// Connect Database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bargfood'
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
app.use('/login', require("./router/login/login"));
app.use('/register', require("./router/register/register"));
app.use('/get_id', require("./router/get_id/get_id"));
app.use('/edit_user', require("./router/edit_user/edit_user"));
app.use('/upload', require("./router/upload/upload.js"));
app.use('/email',require("./router/email/email"));
app.use('/checkOtp',require("./router/email/checkOtp"))
app.use('/reset',require("./router/email/reset"));
//Store
app.use('/get_menu',require("./router/menu/get_menu"))
app.use('/add_menu',require("./router/menu/add_menu"))









