const express = require("express");
const router = express.Router();
const _ = require("lodash");
const generatePayload = require("promptpay-qr");
const QRCode = require("qrcode");

router.post("/", (req, res) => {
  const amount = parseFloat(_.get(req, ["body", "amount"]));
  const mobileNumber = "0620623676";
  const payload = generatePayload(mobileNumber, { amount });
  const option = {
    color: {
      dark: "#000",
      light: "#fff",
    },
  };
  QRCode.toDataURL(payload, option, (err, url) => {
    if (err) {
      console.log("generate fail");
      return res.status(400).json({
        RespCode: 400,
        RespMessage: "bad : " + err,
      });
    } else {
      return res.status(200).json(url);
    }
  });
});

module.exports = router;
