const express=require('express');
const app=express();
const bodyparser=require('body-parser');
//body-parser middleware
app.use(bodyparser.urlencoded( { extended:false } ));
app.use(bodyparser.json());
const database={
    users:[
        {
            id:1,
            name:"Joana",
            email:"test@test.com",
            password:123,
            joined:new Date(),
            entries:0,
        },
        {
            id:2,
            name:"John",
            email:"john@test.com",
            password:123,
            joined:new Date(),
            entries:0,
        }
    ],
};
app.get('/',(req,res)=>{
    res.send("Server stared");
});
app.post('/signin',(req,res)=>{
    if(req.body.email===database.users[0].email && req.body.password===database.users[0].password){
        res.json(database.users[0]);
        return;
    }
    res.status(400).send({msg:"wrong input"});
});
app.post('/register',(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;

    database.users.push({
            id:4,
            name:name,
            email:email,
            password:password,
            joined:new Date(),
            entries:0,
    });
    res.json(database.users);
    console.log(`Congratulations ${name} you have been added`);
});
/*app.get('/profile/:id',(req,res)=>{
    const {id}=req.params;
    database.users.forEach(user=>{
        if(user.id===id){
            res.json(user);
        }else{
            res.status(400).send(`Bad Request`);
        }
    });
});*/

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{ console.log(`Server started on Port:${PORT}`) });