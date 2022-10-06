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
//login system
app.use('/login', require("./router/login_system/login"));
app.use('/check_duplicate', require("./router/login_system/register/check_duplicate"));
app.use('/register', require("./router/login_system/register/register"));
//forget password
app.use('/check_email', require("./router/forget_password/check_email"));
app.use('/send_otp_email',require("./router/forget_password/send_otp_email"));
app.use('/check_otp',require("./router/forget_password/check_otp"));
app.use('/reset_password',require("./router/forget_password/reset_password"));

//store
app.use('/get_store',require("./router/store/get_store"));
app.use('/add_store',require("./router/store/add_store"));

//user
app.use('/get_user', require("./router/user/get_user"));
app.use('/edit_user', require("./router/user/edit_user"));
app.use('/edit_img_user', require("./router/user/edit_img_user"));
app.use('/check_password',require("./router/user/check_password"));
app.use('/change_email',require("./router/user/change_email"));
app.use('/check_phone',require("./router/user/check_phone"));
app.use('/change_phone',require("./router/user/change_phone"));


// app.use('/get_menu',require("./router/menu/get_menu"))
// app.use('/add_menu',require("./router/menu/add_menu"))
// app.use('/edit_menu',require("./router/menu/edit_menu"))
// app.use('/edit_img_food',require("./router/edit_img/edit_img_food"))
// app.use('/delete_menu',require("./router/menu/delete_menu"))
// app.use('/get_store',require("./router/get_store/get_store"))

// app.use('/edit_img_store',require("./router/edit_img/edit_img_store"))
// app.use('/edit_store',require("./router/get_store/edit_store"))
// app.use('/accept_email',require("./router/register/accept_email"))

// app.use('/change_email',require("./router/edit_user/change_email"))
// app.use('/send_email',require("./router/edit_user/send_email"))

// app.use('/check_phone',require("./router/edit_user/check_phone"))
// app.use('/update_location',require("./router/get_store/update_location"))












