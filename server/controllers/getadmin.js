import newuser from '../models/user.js';

const getuser = async (req, res) => {

  try {
    const email =  authorization;
    const user = await newuser.find();
    res.json({status: 'ok', user:user})
    
  } catch (error) {
    res.json({status: 'not ok', err: "invalid token"});
    
  }

}

export default getuser;