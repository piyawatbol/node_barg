const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bargfood",
});

router.get("/", async (req, res) => {
  const store_id = req.params.store_id;
  try {
    connection.query(
      "SELECT * FROM tb_request LEFT JOIN tb_store ON tb_request.store_id = tb_store.store_id WHERE status = 3",
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
