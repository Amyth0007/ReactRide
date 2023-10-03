import Button from 'react-bootstrap/Button'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function AddUser(props) {
  console.log("adduser "+ props);
  const navigate = useNavigate();
  const [email, setemail] = useState('')
  const [userName, setuserName] = useState('')
  const [phone, setphone] = useState('')

  async function submitted(e) {
    e.preventDefault();
    console.log(email);

    const response = await axios.post('https://tiny-pear-elk-gown.cyclic.cloud/adduser', { username: userName, email: email, phone: phone});


    const data = await response.data;
    console.log(data);
    if (data.user) {
      window.localStorage.setItem("isloggedin", true);
      window.localStorage.setItem("email", email);
      window.location.reload()
      navigate('/');
    } else {
      alert("invalid data");
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
        <Typography level='title-lg' fontWeight={'Bold'} fontSize={20}>Add user</Typography>

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

<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <Button variant='primary' type='submit'>Save</Button>
                    <Button variant='secondary'>Cancel</Button>
                </div>
      </Box>

    </form>
  );
}

export default AddUser;