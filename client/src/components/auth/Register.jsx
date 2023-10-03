import Button from 'react-bootstrap/Button'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
  import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';


import FormLabel from '@mui/material/FormLabel';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Register() {
  const navigate = useNavigate();
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [number, setnumber] = useState('')
  const [password, setpassword] = useState('')
  const [gen, setgen] = useState('female')
  const [hear , sethear] = useState(" ");
  const [city, setcity] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const handleChange = (event) => {
    setcity(event.target.value);
  };
  const Statess = [
    { label: 'Delhi'},
    { label: 'Gujarat'  },
    { label: 'Maharashtra'  },
    { label: 'Karnataka' }]
  async function submitted(e) {
    e.preventDefault();
    console.log(name);
    console.log(email);
    const response = await axios.post('https://tiny-pear-elk-gown.cyclic.cloud/register', { name: name, email: email, password: password, gender: gen, hear: hear , phone : number, stat : selectedState, city: city });


    const data = await response.data;
    if (data.user) {
      window.localStorage.setItem("isloggedin", true);
      window.localStorage.setItem("email", email);
      navigate('/')

    }

  }
  const handlestate  = (e, n)=>{
    setSelectedState(n.label)
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
        <Typography level='title-lg' fontWeight={'Bold'} fontSize={40}>Register</Typography>
        
        <TextField required fullWidth id="filled-basic" label="name" variant="filled" value={name} onChange={(e) => setname(e.target.value)}
          sx={{
            my: 1,
            mx: 'auto',
          }} />
        <TextField required  fullWidth id="filled-basic1" label="email" variant="filled" value={email} onChange={(e) => setemail(e.target.value)}
          sx={{
            my: 1,
            mx: 'auto',
          }} />
        <br>
        </br>
        <TextField required fullWidth id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password} onChange={(e) => setpassword(e.target.value)}
          sx={{
            my: 1,
            mx: 'auto',
          }} />
        <TextField required fullWidth id="outlined-password-input"
          label="Phone no"
          type="number"
          value={number} onChange={(e) => setnumber(e.target.value)}
          sx={{
            my: 1,
            mx: 'auto',
          }} />
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            required aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={gen}
            onChange={(e) => setgen(e.target.value)}
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '20px' }}
          >
            <FormControlLabel value='female' control={<Radio />} label="Female" />
            <FormControlLabel value='male' control={<Radio />} label="Male" />
            <FormControlLabel value='other' control={<Radio />} label="Other" />
          </RadioGroup>

          <Typography level='title' fontSize={20}>How do you hear about us</Typography>
          <FormControlLabel control={<Checkbox />}  label="Linkdin" onChange={(e)=>sethear("Linkdin")} sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }} />
          
          <FormControlLabel control={<Checkbox />}  label="Job portal" onChange={(e)=>sethear("Job portal")} sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}/>
          
          <FormControlLabel control={<Checkbox  />}  label="Friends" onChange={(e)=>sethear("friends")} sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }} />
          
          <FormControlLabel control={<Checkbox  />}  label="others" onChange={(e)=>sethear("others")} sx={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }} />
           <br/>

           <FormControl sx={{ m: 1, minWidth: 120 , display: 'flex' }}>
        <InputLabel required id="demo-simple-select-helper-label">city</InputLabel>
        <Select
          required labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={city}
          label="City"
          onChange={handleChange}
        >
          <MenuItem required value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Mumbai"}>Mumbai</MenuItem>
          <MenuItem value={"pune"}>pune</MenuItem>
          <MenuItem value={"Ahmedabad"}>Ahmedabad</MenuItem>
        </Select>
        <FormHelperText>Select thec ity</FormHelperText>
      </FormControl>

      <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={Statess}
      value={selectedState}
      onChange={handlestate}
      required sx={{ m: 1, minWidth: 120 , display: 'flex' }}
      renderInput={(params) => <TextField required {...params} label="State" />}
    />
        <Button variant='primary' type='submit' style={{marginBottom: "40px", width: "190px"}}> Save</Button>
        
      </Box>

    </form>
  );
}

export default Register;