import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import UserCard from './UserCard';
import AddUser from './AddUser';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const Home = (props) => {
  const navigate = useNavigate();
  const [localdata, setlocaldata] = useState("");
  async function amit() {
    const data = await fetch('https://tiny-pear-elk-gown.cyclic.cloud/getuser', {
      method: 'GET'
    })
    console.log("im at home");
    const d = new Date();
    console.log(d);
    const a = await data.json();
    setlocaldata(a.user);
    console.log(a.user);

  }
  
  const save = ()=>{
    window.localStorage.setItem("userd", JSON.stringify(localdata));
    console.log("data saved ");
    alert("data saved to local storage");
    navigate('/Feed');
  }
  useEffect(() => {
    const token = window.localStorage.getItem("email");
    if (token) {
      const user = token
      if (!user) {
        // window.location.href='/login';
        navigate('/login')
      } else {
          amit();
      }
    }
  }, [navigate]);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <Button onClick={handleOpen}>
        <Fab
          color="primary"
          aria-label="add"
          style={{
            position: 'left',
            top: '20px',
            left: '10px',
          }}

        >
          <AddIcon />
        </Fab>
      </Button>
      <p> add user by clicking on left side + icon</p>
      <Button
                    onClick={save}
                    style={{
                        marginLeft: '10px',
                        padding: '2px 2px',
                        backgroundColor: 'green',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        position: 'absolute',
                        top: '120px',
                        right: '7px',
                        content: "save data to local storage",
                    }}
                >
                    Save
                </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddUser name="amit" />
        </Box>
      </Modal>

      <UserCard />
    </div>
  )
}
export default Home;