const express = require('express');
const mysql = require('mysql');
const app = express();


const bodyParser = require('body-parser')
const _ = require('lodash')
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: true }))

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
app.use('/get_all_store',require("./router/store/get_all_store"));
app.use('/get_store',require("./router/store/get_store"));
app.use('/add_store',require("./router/store/add_store"));
app.use('/get_store',require("./router/store/get_store"));
app.use('/edit_store',require("./router/store/edit_store"));
app.use('/edit_img_store',require("./router/store/edit_img_store"));
app.use('/update_location',require("./router/store/update_location"));

//user
app.use('/get_user', require("./router/user/get_user"));
app.use('/edit_user', require("./router/user/edit_user"));
app.use('/edit_img_user', require("./router/user/edit_img_user"));
app.use('/check_password',require("./router/user/check_password"));
app.use('/change_email',require("./router/user/change_email"));
app.use('/check_phone',require("./router/user/check_phone"));
app.use('/change_phone',require("./router/user/change_phone"));

//food
app.use('/get_menu',require("./router/menu/get_menu"))
app.use('/get_menu_user',require("./router/menu/get_menu_user"))
app.use('/add_menu',require("./router/menu/add_menu"))
app.use('/edit_menu',require("./router/menu/edit_menu"))
app.use('/edit_img_food',require("./router/menu/edit_img_food"))
app.use('/delete_menu',require("./router/menu/delete_menu"))

//qrcode
app.use('/qrcode',require("./router/qrcode/qrcode"))

//request
app.use('/add_request_img',require("./router/request/add_request_img"))
app.use('/add_request',require("./router/request/add_request"))
app.use('/get_request',require("./router/request/get_request"))
app.use('/get_request_single',require("./router/request/get_request_single"))
app.use('/get_request_history',require("./router/request/get_request_history"))
app.use('/update_request',require("./router/request/update_request"))
app.use('/update_request_rider',require("./router/request/update_request_rider"))
app.use('/request_success',require("./router/request/request_success"))

//order
app.use('/add_order',require('./router/request/add_order'))
app.use('/get_order',require("./router/request/get_order"))

//cart
app.use('/add_cart',require("./router/cart/add_cart"))
app.use('/get_cart',require("./router/cart/get_cart"))


//rider
app.use('/get_request_rider',require("./router/request/get_request_rider"))
app.use('/get_request_recived',require("./router/request/get_request_recived"))
app.use('/get_request_one',require("./router/request/get_request_one"))





















