const express =require("express");
const path= require("path"); 
const ejs= require("ejs");

const port=process.env.PORT||8000;
const fs =require("fs");
const bodyparser=require("body-parser");
const mongoose = require('mongoose');
const app = express();
app.use(bodyparser.json());
app.use('/static',express.static('static')); 
app.use(express.urlencoded());
app.set('view engine','pug');
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
const User=require('./model/user');
const url='momgodb://localhost/test';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



app.get('/', (req, res) => {
    res.render('index.pug');
})

app.post('/', (req, res) => {
    //console.log(req.body);
    var data =(req.body);
    var emailData=data.email;
    const pass=data.password;
    //console.log(pass);
    const id=data.collegeId;
    User.find({email:emailData},{password:1},(err,datalist)=>{
      if(err) throw err;
      else{
        //console.log(typeof datalist);
        var items=datalist;
        let temp=items[0].password;
        if(pass===temp){
          User.find({collegeId:id},(err,list)=>{
            if(err) throw err;
            else{
               //console.log(list);
               //console.log(list[0]);
               var information=list[0];
               //console.log(information.firstName);
               res.render('final.ejs',{
                 name:information.firstName,
                 middle:information.middleName,
                 last:information.lastName,
                 state:information.state,
                 district:information.district,
                 city:information.city,
                 siblings:information.siblings,
                 gender:information.gender
               });
            }
          })
          //res.status(200).send("data will display soon..")
        }
        else{
          res.status(404).render('error.pug');
        }
      }

    })
} )

app.get('/sign',(req,res)=>{
  res.status(200).render('sign.pug');
})

app.post('/sign',async (req,res)=>{
 console.log(req.body)
  const {
        firstName,
        middleName,
        lastName,
        collegeId,
        email,
        state,
        district,
        city,
        password,
        confirmPassword,
        siblings,
        gender,
        disablity}=req.body;
  //console.log(typeof info)
  console.log(password);
  if(password!=confirmPassword){
      return res.json({
          status:'error',
          error:'confirm password not matched with password'
      })
  }
  if(password.length<6){
    return res.json({
        status:'error',
        error:"password is too short"
      })
  }
  let temp=email.substr(0,11);
  if(temp!=collegeId){
      return res.json({
        status:'error',
        error:"email id of first 11 character not matched with college id"
    })
  }
  
  try{
       //console.log(info.json());
       const  response= await User.create({
        firstName,
        middleName,
        lastName,
        collegeId,
        email,
        state,
        district,
        city,
        password,
        confirmPassword,
        siblings,
        gender,
        disablity
        
       })
       console.log('form submitted:',response);
        return res.json({status:'ok',msg:'submit'})
        
  }
  catch{
        //console.log(error())
        return res.json({status:'error'});
  } 
 //res.render('feedback.pug')

})

app.listen(port ,()=>{
    console.log("your are now connected ..")
})
