const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bargfood",
});

router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    connection.query(
      "SELECT * FROM tb_request JOIN tb_order_status ON tb_request.status = tb_order_status.order_status_id JOIN tb_store ON tb_request.store_id = tb_store.store_id JOIN tb_address ON tb_request.address_id = tb_address.address_id",
      [user_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(200).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
