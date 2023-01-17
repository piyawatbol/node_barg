const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "bargfood",
});

router.patch("/:user_id/:address_id", async (req, res) => {
  const address_id = req.params.address_id;
  const user_id = req.params.user_id;
  const address_status_id = req.body.address_status_id;

  try {
    connection.query(
      "UPDATE tb_address SET address_status_id = ? WHERE user_id =? AND address_id = ?",
      [address_status_id, user_id, address_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        } else {
          res.status(200).json("update address success");
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
