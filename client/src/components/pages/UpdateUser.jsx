import Button from 'react-bootstrap/Button'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';
const  UpdateUser = (props) => {
    const {item} = props;
    const [email, setemail] = useState(item.email)
    const [userName, setuserName] = useState(item.name)
    const [phone, setphone] = useState(item.phone)
    
  async function submitted(e) {
    e.preventDefault();
    const response = await axios.put(`https://tiny-pear-elk-gown.cyclic.cloud/updateuser/${item._id}`, { username: userName, email: email, phone: phone, Date : new Date() });

    const a = await response.data;
    if(a){
        alert("user updated succesfully")
    }else{
        alert("something went wrong")
    }
    


  }

  return (
    <form
      sx={{
        bgcolor: 'text.secondary'
      }}
      style={{
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: '50px',
        bgcolor: "black"
      }}
      onSubmit={submitted}
    >

      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
        }}>
        <Typography level='title-lg' fontWeight={'Bold'} fontSize={20}>update user data</Typography>

        <TextField fullWidth id="filled-basic1" label="userName" variant="filled" value={userName} onChange={(e) => setuserName(e.target.value)}
          sx={{
            my: 1,
            mx: 'auto',
          }} />
        <br>
        </br>
        <TextField fullWidth id="outlined-password-input"
          label="email"
          type="text"
          value={email} onChange={(e) => setemail(e.target.value)}
          sx={{
            my: 1,
            mx: 'auto',
          }} />
        <TextField fullWidth id="outlined-password-input"
          label="Phone"
          type="number"
          value={phone} onChange={(e) => setphone(e.target.value)}
          sx={{
            my: 1,
            mx: 'auto',
          }} />

        <Button variant='primary' type='submit'> Submit</Button>
        <Button variant='secondary' > cancel</Button>
      </Box>

    </form>
  );
}

export default UpdateUser;