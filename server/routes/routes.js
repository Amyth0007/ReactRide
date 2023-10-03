import express from "express"


import register from "../controllers/register.js";
import home from "../controllers/getuser.js";
import login from "../controllers/login.js";
import getuser from "../controllers/getuser.js";
import adduser from '../controllers/adduser.js'
import deletuser from "../controllers/deletuser.js";
import updatetuser from "../controllers/updateuser.js";

const router = express.Router();

router.get("/getuser", getuser);
router.delete("/deletuser/:id", deletuser);
router.put("/updateuser/:id", updatetuser);
router.post("/adduser", adduser);
router.get("/", (req, res)=>{
    res.json({msg:"server running"});
});
router.post("/register", register)
router.post("/login", login)

export default router;






