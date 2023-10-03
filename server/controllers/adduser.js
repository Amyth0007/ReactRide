import user from '../models/newuser.js';
const adduser = async (req, res) => {
  // console.log(req.body);
  const name = req.body.username;
  const email = req.body.email;
  const phone = req.body.phone;
  const dateandtime = new Date();
  console.log(dateandtime);
  // const currentDate = new Date();


  if (name == '' || email == '' || phone == '') {

    res.json({ status: 'not ok', user: false });
  } else {
    const d = await user.findOne({email: email});
    
      if (d) {
        return res.json(
          { msg: "Email Already Exists." });
      }
       else {
        user.create({ name, email , phone, date: dateandtime });
        res.json({ status: 'ok', user: true });
        console.log("data saved");
      }


  }
}





export default adduser;