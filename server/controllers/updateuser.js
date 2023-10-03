import user from '../models/newuser.js';

const updatetuser = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const r = await  user.findOneAndUpdate({_id: id}, data);
    if(r){
        res.json({status: 'ok'})
        console.log("deleted ");
        window.location.reload();
    }

  
}





export default updatetuser;