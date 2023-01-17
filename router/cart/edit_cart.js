const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'bargfood'
});

router.patch("/:cart_id", async (req, res) => {
    const cart_id = req.params.cart_id;
    const price = req.body.price;
    const detail = req.body.detail;
    const amount = req.body.amount;
    if(amount > 0){
        try {
            connection.query("UPDATE tb_cart SET amount = ? , price = ?, detail = ? WHERE cart_id = ?", [amount,price,detail,cart_id], (err, results, fields) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send();
                }else{
                    res.status(200).json("update Food success");
                }
                
            })
        } catch (err) {
            console.log(err);
            return res.status(500).send();
        }
    }else {
        try {
            connection.query(
              "DELETE FROM tb_cart WHERE cart_id = ?",
              [cart_id],
              (err, results, fields) => {
                if (err) {
                  console.log(err);
                  return res.status(400).send();
                }
                return res.status(200).json("delete cart success");
              }
            );
          } catch (err) {
            console.log(err);
            return res.status(500).send();
          }
    }
   
})

module.exports = router;