const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bargfood",
});

router.get("/:store_id/:status", async (req, res) => {
  const store_id = req.params.store_id;
  const status = req.params.status
  try {
    connection.query(
      "SELECT * FROM tb_request WHERE store_id = ? AND status = ?",
      [store_id,status],
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

router.get("/:store_id", async (req, res) => {
  const store_id = req.params.store_id;
  try {
    connection.query(
      "SELECT * FROM tb_request JOIN tb_order_status ON tb_request.status = tb_order_status.order_status_id WHERE store_id = ? AND status = 3 OR status = 4",
      [store_id],
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
