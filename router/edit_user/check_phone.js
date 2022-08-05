const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bargfood'
});

router.post("/:user_id", async (req, res) => {
    const user_id = req.params.user_id;
    const newPhone = req.body.phone;
    try {
        connection.query("SELECT phone FROM user WHERE phone = ?", [newPhone], (err, results,) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            numRows = results.length;
            if (numRows == 1) {
                return res.status(200).json("duplicate phone");
            }else{
                connection.query("UPDATE user SET phone = ? WHERE user_id = ?",[newPhone,user_id],(err,results)=>{
                    if(err){
                        console.log(err);
                        return res.status(400).send();
                    }
                    return res.status(200).json("update phone success")
                })
            }
           
        })
    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
})

module.exports = router;