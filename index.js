const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");
const _ = require("lodash");
const cors = require("cors");
require("dotenv").config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow_Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Whith, Content-Type, Accept",
     "multipart/form-data",
  );
  next();
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sever start port ${port}`);
});

const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.log("Not connect database");
    return;
  }
  app.get("/", async (req, res) => {
    console.log("Connect Database Succss fully");
    return res.status(200).json("Connect Database");
  });
});

//login system
app.use("/login", require("./router/login_system/login"));
app.use(
  "/check_duplicate",
  require("./router/login_system/register/check_duplicate")
);
app.use("/register", require("./router/login_system/register/register"));

//forget password
app.use("/check_email", require("./router/forget_password/check_email"));
app.use("/send_otp_email", require("./router/forget_password/send_otp_email"));
app.use("/check_otp", require("./router/forget_password/check_otp"));
app.use("/reset_password", require("./router/forget_password/reset_password"));

//store
app.use("/get_all_store", require("./router/store/get_all_store"));
app.use("/get_store_one", require("./router/store/get_store_one"));
app.use("/get_store", require("./router/store/get_store"));
app.use("/add_store", require("./router/store/add_store"));
app.use("/get_store", require("./router/store/get_store"));
app.use("/edit_store", require("./router/store/edit_store"));
app.use("/edit_img_store", require("./router/store/edit_img_store"));
app.use("/update_location", require("./router/store/update_location"));

//user
app.use("/get_user", require("./router/user/get_user"));
app.use("/edit_user", require("./router/user/edit_user"));
app.use("/edit_img_user", require("./router/user/edit_img_user"));
app.use("/check_password", require("./router/user/check_password"));
app.use("/change_email", require("./router/user/change_email"));
app.use("/check_phone", require("./router/user/check_phone"));
app.use("/change_phone", require("./router/user/change_phone"));

//food
app.use("/get_menu", require("./router/menu/get_menu"));
app.use("/get_menu_user", require("./router/menu/get_menu_user"));
app.use("/add_menu", require("./router/menu/add_menu"));
app.use("/edit_menu", require("./router/menu/edit_menu"));
app.use("/edit_img_food", require("./router/menu/edit_img_food"));
app.use("/delete_menu", require("./router/menu/delete_menu"));

//qrcode
app.use("/qrcode", require("./router/qrcode/qrcode"));

//request
app.use("/get_request_confirm", require("./router/request/store/get_request_confirm"))
app.use("/add_request", require("./router/request/user/add_request"));
app.use("/get_request", require("./router/request/get_request"));
app.use(
  "/get_request_single",
  require("./router/request/store/get_request_single")
);
app.use(
  "/get_request_history",
  require("./router/request/store/get_request_history")
);
app.use("/update_request", require("./router/request/update_request"));
app.use(
  "/update_request_rider",
  require("./router/request/rider/update_request_rider")
);
app.use("/request_success", require("./router/request/rider/request_success"));
app.use("/get_request_all", require("./router/request/user/get_request_all"));
app.use("/get_request_id", require("./router/request/user/get_request_id"));
app.use("/get_request_one", require("./router/request/get_request_one"));
app.use(
  "/update_rider_location",
  require("./router/request/rider/update_rider_location")
);
app.use("/get_success_img", require("./router/request/user/get_success_img"));

//order
app.use("/add_order", require("./router/request/user/add_order"));
app.use("/get_order", require("./router/request/get_order"));

//cart
app.use("/add_cart", require("./router/cart/add_cart"));
app.use("/get_cart", require("./router/cart/get_cart"));
app.use("/delete_cart_all", require("./router/cart/delete_cart_all"));
app.use("/check_cart", require("./router/cart/check_cart"));
app.use("/get_cart_one", require("./router/cart/get_cart_one"));
app.use("/edit_cart", require("./router/cart/edit_cart"));
app.use("/delete_cart_one", require("./router/cart/delete_cart_one"));

//rider
app.use(
  "/get_request_rider",
  require("./router/request/rider/get_request_rider")
);
app.use(
  "/get_request_recived",
  require("./router/request/rider/get_request_recived")
);
app.use("/get_request_one", require("./router/request/get_request_one"));

//rate
app.use("/add_rate_rider", require("./router/rate/add_rate_rider"));
app.use("/add_rate_store", require("./router/rate/add_rate_store"));
app.use("/check_rate_store", require("./router/rate/check_rate_store"));
app.use("/sum_rate_store", require("./router/rate/sum_rate_store"));
app.use("/get_rate_store", require("./router/rate/get_rate_store"));

//favorite
app.use("/get_favorite", require("./router/favorite/get_favorite"));
app.use("/check_favorite", require("./router/favorite/check_favorite"));
app.use("/add_favorite", require("./router/favorite/add_favorite"));
app.use("/delete_favorite", require("./router/favorite/delete_favorite"));

//address
app.use("/add_address", require("./router/address/add_address"));
app.use("/get_address", require("./router/address/get_address"));
app.use("/edit_address", require("./router/address/edit_adress"));
app.use("/change_status", require("./router/address/change_status"));
app.use("/get_address_default", require("./router/address/get_address_default"));
app.use("/delete_address", require("./router/address/delete_address"));
app.use("/get_address_status", require("./router/address/get_address_status"));
app.use("/update_address_status", require("./router/address/update_address_status"));
app.use("/get_address_one", require("./router/address/get_address_one"));

//buyer
app.use("/get_buyer", require("./router/buyer/get_buyer"));

//wallet
app.use("/register_wallet", require("./router/wallet/register_wallet"));
app.use("/get_wallet", require("./router/wallet/get_wallet"));
app.use("/topup_wallet", require("./router/wallet/topup_wallet"));