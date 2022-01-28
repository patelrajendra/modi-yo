const mongoose=require('mongoose');

const userinfo=new mongoose.Schema({
  firstName:{type:String,require:true},
  middleName:{type:String,require:true},
  lastName:{type:String,require:true},
  collegeId:{type:String,require:true,unique:true},
  email:{type:String,require:true,unique:true},
  state:{type:String,require:true},
  district:{type:String,require:true},
  city:{type:String,require:true},
  password:{type:String,require:true},
 confirmPassword:{type:String,require:true},
 siblings:{type:Number,require:true},
 gender:{type:String,require:true},
 disablity:{type:String,require:true}

},{collection:'studentinfos'})
const kapila=  mongoose.model('kapila',userinfo);
module.exports=kapila;