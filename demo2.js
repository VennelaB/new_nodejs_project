const express = require('express')
const session = require('express-session');
//configure express server with the middleware
const app = express(session({
    cookie:{maxAge:60000,resave:true,secret:'@C$$-4D44-WppQ385',saveUninitialized:true}
}));
app.use(session)
app.use(express.json())

const auth =(req,res,next)=>{
    if(req.session && req.session.user === 'admin' && req.session.admin){
        return next()
    }
    res.sendStatus(401)
}
//more users can be added
const users = [
{
    "username":"name1",
    "password":"pass1"
},
{
    "username":"name2",
    "password":"pass2"
}
]
app.get('/users',(req,res)=>{
    res.json(users)
})
app.post('/users',(req,res)=>{
//     const {username,password}=JSON.parse(req.body)
    users.push(req,body)
    res.json({'message':'new user created'})
})
app.listen(3002,()=>console.log('express server started'))
