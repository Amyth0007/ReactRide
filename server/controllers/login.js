import user from '../models/user.js';
import jwt from 'jsonwebtoken';

const login = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const newdata = await user.findOne({ email: email, password: password });
    if (newdata) {
     const token = jwt.sign({  
        name: newdata.name,
        email: newdata.email
      }, 'amit123')
      return res.json({ status: 'ok', user: token })
    } else {
  
      return res.json({ status: 'not ok', user: false })
    }
  }

export default login;