const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bargfood",
});

router.get("/:request_id", async (req, res) => {
  const request_id = req.params.request_id;
  try {
    connection.query(
      "SELECT * FROM tb_request JOIN tb_store ON tb_request.store_id = tb_store.store_id JOIN tb_address ON tb_request.user_id = tb_address.address_id WHERE request_id = ?",
      [request_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        }
        res.status(202).json(results);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});


module.exports = router;
