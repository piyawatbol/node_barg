const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bargfood",
});

router.get("/:user_id/:store_id", async (req, res) => {
    const user_id = req.params.user_id;
    const store_id = req.params.store_id;
  try {
    connection.query(
      "INSERT INTO tb_favorite(user_id,store_id) VALUES(?,?)",
      [user_id,store_id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send();
        } else {
          return res.status(200).json("Add Rate Success");
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

module.exports = router;
