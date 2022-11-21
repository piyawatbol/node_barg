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
      "SELECT * FROM tb_request JOIN tb_users ON tb_request.rider_id = tb_users.user_id WHERE request_id = ?",
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
