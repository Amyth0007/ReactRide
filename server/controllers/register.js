import user from '../models/user.js';
const register = async (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const hear = req.body.hear;
  const city = req.body.city;
  const state = req.body.stat;
  const phone = req.body.phone;
  const gender  = req.body.gender;
  console.log(req.body.gender);

  if (name == '' || email == '' || password == '') {

    res.json({ status: 'not ok', user: false });
  } else {
    const d = await user.findOne({email: email});
    
      if (d) {
        return res.json(
          { msg: "Email Already Exists." });
      }
       else {
        user.create({ name, email, password , hear, city , phone , state , gender });
        res.json({ status: 'ok', user: true });
        console.log("data saved");
      }


  }
}





export default register;