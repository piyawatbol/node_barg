const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const nodemailer = require("nodemailer");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bargfood",
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pywsddbol2@gmail.com",
    pass: "tedrcmmbvetduoch",
  },
});

router.post("/", async (req, res) => {
  const email = req.body.email;
  function getRandom(max) {
    return Math.floor(Math.random() * max);
  }
  otp = getRandom(999999);
  if(otp.length < 6){
    while (otp.length < 6) {
      otp = getRandom(999999);
    }
  }
  
  connection.query(
    "INSERT INTO tb_otp_email(email,otp) VALUES(?,?)",
    [email, otp],
    (err, results) => {
      if (err) {
        1;
        console.log(err);
        return res.status(400).send();
      } else {
        let mailOptions = {
          form: "pywsddbol2@gmail.com",
          to: `${email}`,
          subject: `OTP : ${otp}`,
        };
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(`error email ${err}`);
          } else {
            console.log(`send otp to ${email}`);
            setTimeout(() => {
              connection.query(
                "DELETE from tb_otp_email WHERE email = ?",
                [email]
              );
              console.log(`reset otp email ${email}`);
            }, 60000);
            return res.status(200).json("send email success");
          }
        });
      }
    }
  );
});
module.exports = router;
