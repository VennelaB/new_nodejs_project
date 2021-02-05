const express = require('express');
const session = require('express-session');
const app =express();
// configure express server with the middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge:60000 }
    
  }))
app.use(express.json())
const auth =(req,res,next)=>{
    if(req.session && req.session.user === 'admin' && req.session.admin){
        return next()
    }
    res.sendStatus(401)
}
const users =[
    {
    "username":"name1",
    "password":"pass1"
},
{
    "username":"name2",
    "password":"pass2"
}
]
// connecting the middleware with our routes
app.get('/users',auth,(req,res)=>{
    res.json(users)
})
app.get('/login',(req,res)=>{
    if(!req.query.username || !req.query.password){
        res.send('login failed')
    } else if(req.query.username === 'admin' && req.query.password === 'admin'){
        req.session.user='admin'
        req.session.admin=true
        res.send('login succesfull')
    } else{
        res.send('invalid username or password')
    }
})
app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.send('loggedout')
})
app.post('/users',auth,(req,res)=>{
   //console.log(req.body)
    // const {username,password}=JSON.parse(req.body)
    users.push(req.body)
    res.json({'message':'new user created'})
})
app.listen(3002,()=>console.log('express server started'))
//exported as a module
