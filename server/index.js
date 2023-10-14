const express = require("express");
const  mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const db =mysql.createConnection({
    host:"localhost",
    user :"root",
    password:"password",
    database:"hari"
})

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('mySql connected....');
})

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



app.post('/login',(req, res) =>{
    let sql= `SELECT * FROM users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;   
    db.query(sql, (err, data)=>{  
        if(err) throw err;  
        
        if(data.length > 0){
            const id=data[0].id;
            const token = jwt.sign({ id }, 'jwtSecretkey', { expiresIn: '1h' });
            res.json({ token });                            
            //res.json({Login:true},token,data);  
        }
        else{
            return res.json("Login Failed")
        }
    })
})

const verifyJwt = (req, res, next) =>{
    const token = req.headers['access-token'];
    if(!token){
        return res.json({"auth":"fail","text":"we need token please provide it for next time"})
    }else{
        jwt.verify(token, "jwtSecretkey", (err, decoded) => {
            if(err)
                res.json("Not authenticated");
            else{
                req.userId = decoded.id;
                next();
            }                
        })
    }
}

app.get('/checkauth',verifyJwt, (req, res)=>{
    return res.json({"auth":"success","text":"Authenticated"});
})

app.get('/users',verifyJwt,(req, res) =>{
    let sql= `SELECT * FROM users`;
   
    db.query(sql, (err, persons)=>{  
        if(err) throw err;   
        console.log(persons)                                 
        res.send(persons);  
    })
})


app.listen('5000',()=>{
    console.log('Server started on port 5000');
});