import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';


import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateUser from './UpdateUser';
function Feed() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setdata] = useState([]);

   function amit() {
    const d = JSON.parse(window.localStorage.getItem("userd"));
    
    setdata(d);
  }

  useEffect(() => {
    const token = window.localStorage.getItem("isloggedin");
    if (!token) {
      navigate('/login');
    } else {
      // amit();


    }
  }, [navigate, data]);
  async function delet(id) {
    console.log("delete " + id);
    alert("data deleted")
    const dat = await fetch(`https://tiny-pear-elk-gown.cyclic.cloud/deletuser/${id}`, {
        method: 'DELETE'
    })
    const a = await dat.json();
    amit();
    setdata(prevData => prevData.filter(item => item._id !== id));
    if (a) {
        console.log("data deleted");
        console.log(data);

    }

}
  return (


    <>
    <Typography>Local storage data</Typography>
    {data ? JSON.parse(window.localStorage.getItem("userd")).map((item, index) => (
                        <Card variant="outlined" key={index}>
                            <CardContent>
                                <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                                    {item.name}
                                </Typography>
                                <Typography variant="h9" component="div">
                                    {item.email}
                                </Typography>
                                <Typography variant="body2">
                                    {item.phone ? item.phone : "no data found"}
                                </Typography>
                            </CardContent>
                            <IconButton aria-label="delete" size="large" onClick={() => delet(item._id)}>
                                <DeleteIcon fontSize="inherit" />
                            </IconButton>
                            <IconButton aria-label="edit" size="large">
                                <EditIcon fontSize="inherit" onClick={handleOpen} />
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >

                                    <Box sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: 400,
                                        bgcolor: 'background.paper',
                                        border: '2px solid #000',
                                        boxShadow: 24,
                                        p: 4,
                                    }}>

                                        <UpdateUser item={item} />
                                    </Box>
                                </Modal>
                            </IconButton>
                        </Card>
                    )): <></>}
    
    </>  

  

  )
}

export default Feed