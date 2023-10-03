import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { log } from "console";


const App = express()
App.get('/', (req, res)=>{
      res.json({msg: "app running"});
})

mongoose.connect("mongodb://127.0.0.1:27017/imagen_ai").then(()=>{
    console.log("connected");
}).catch((err)=>{
   console.log(err);
})

const userSchema = {
    name:{type: String , min:3},
    username:{type: String , min:3},
    email:{type: String , min:3},
    password:{type: String , min:3}
}
const user = new mongoose.model("user", userSchema);
const name = "amitttt2";
const username = "amitttt2";
const email = "amitttt2";
const password = "amitttt2";

const add = async ()=> {  await user.create({name, username, email, password});
//   await user.save();
}
const find = async ()=>{
   const ss =  await user.find();
   console.log(ss);
}
const delet = async ()=>{
   const ss =  await user.deleteOne({name: "amitttt"})
   console.log(ss);
}
// add();
find();
delet();
find();
//error = means we are learning something;
App.listen(3000, ()=>{
  console.log("server running pn port 3000");
})

// const userSchema = {
//    name: { type: String, min: 3 },
//    email: { type: String, min: 3 },
//    password: { type: String, min: 3 }
//  }
 const user1 = new mongoose.model("amit", userSchema);
 // user.save();
 //error = means we are learning something;
 // App.post('/register', async (req, res) => {
 //   console.log(req.body);
 //   const name = req.body.name;
 //   const email = req.body.email;
 //   const password = req.body.password;
 //   try {
 //     const newdata = new user1({ name, email, password });
 //     await newdata.save();
 //     console.log("data saved");
 //     res.json({ status: 'ok' });
 //   }
 //   catch {
 
 //     res.json({ status: 'not ok' });
 //   }
 // })