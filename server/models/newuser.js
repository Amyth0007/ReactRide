import mongoose from "mongoose";

const userSchema = {
    name: { type: String, min: 3 },
    email: { type: String, min: 3 },
    phone : {type: Number, min: 10},
    date : {type : String}
   
  }
  const newuser = new mongoose.model("newuser", userSchema);

  export default newuser ;