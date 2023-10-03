import user from '../models/newuser.js';
const deletuser = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const r = await  user.deleteOne({_id: id});
    if(r){
        res.json({status: 'ok'})
        console.log("deleted ");
    }

  
}





export default deletuser;