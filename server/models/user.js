import mongoose from "mongoose";

const userSchema = {
    name: { type: String, min: 3 },
    email: { type: String, min: 3 },
    password: { type: String, min: 3 },
    phone : {type: Number, min: 10},
    gender : {type: String},
    hear : {type: String},
    state : {type:String},
    city : {type: String}
    
  }
  const user = new mongoose.model("ganit", userSchema);

  export default user ;