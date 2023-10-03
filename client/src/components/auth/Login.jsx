import Button from 'react-bootstrap/Button'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  async function submitted(e) {
    e.preventDefault();
    console.log(email);
    const response = await axios.post('https://tiny-pear-elk-gown.cyclic.cloud/login', { email: email, password: password });


    const data = await response.data;
    console.log(data);
    if (data.user) {
      window.localStorage.setItem("isloggedin", true);
      window.localStorage.setItem("email", email);

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
        <Typography level='title-lg' fontWeight={'Bold'} fontSize={40}>Login</Typography>

        <TextField fullWidth id="filled-basic1" label="email" variant="filled" value={email} onChange={(e) => setemail(e.target.value)}
          sx={{
            my: 1,
            mx: 'auto',
          }} />
        <br>
        </br>
        <TextField fullWidth id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password} onChange={(e) => setpassword(e.target.value)}
          sx={{
            my: 1,
            mx: 'auto',
          }} />

        <Button variant='primary' type='submit'> Submit</Button>
      </Box>

    </form>
  );
}

export default Login;