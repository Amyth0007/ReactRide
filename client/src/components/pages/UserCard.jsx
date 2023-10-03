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


function UserCard() {


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [data, setdata] = useState([{}]);
    const [filterOption, setFilterOption] = useState('az');
    const [filterOrder, setFilterOrder] = useState('asc');
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [Render, setRender] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    async function amit() {
        const data = await fetch('https://tiny-pear-elk-gown.cyclic.cloud/getuser', {
            method: 'GET'
        })
        console.log("im at home");
        const a = await data.json();
        setdata(a.user);
        console.log(a.user);
    }
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

    const sortData = (data) => {
        return [...data].sort((a, b)=>{
            if (filterOption === 'az' || filterOption === 'za') {
                const comparison = a.name.localeCompare(b.name);
                return filterOrder === 'asc' ? comparison : -comparison;
            } else if (filterOption === 'lastModified') {
                const aDateTime = new Date(`${a.date} ${a.time}`);
                const bDateTime = new Date(`${b.date} ${b.time}`);
                return filterOrder === 'asc' ? aDateTime - bDateTime : bDateTime - aDateTime;
            } else if (filterOption === 'lastInserted') {
                const aDateTime = new Date(a.insertedAt);
                const bDateTime = new Date(b.insertedAt);
                return filterOrder === 'asc' ? aDateTime - bDateTime : bDateTime - aDateTime;
            }
            return 0;
        });
    };
    useEffect(() => {
        amit();
    }, []);

    const filteredAndSortedData = sortData(data);

    const handleSearch = () => {
        const searchTerms = searchQuery.toLowerCase().split(' ');
        setRender(true);
        // Perform the search logic
        const searchResults = data.filter(item =>
            searchTerms.some(term =>
                item.name.toLowerCase().includes(term) ||
                item.email.toLowerCase().includes(term) ||
                (item.phone && item.phone.toString().includes(term))  // Convert to string before checking
            )
        );

        setSearchResults(searchResults);
    };


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

    // useEffect(() => {
    //     const filteredData = filterData(data);
    //     const sortedData = sortData(filteredData);
    //     setdata(sortedData);
    // }, [data, filterData, sortData]);


    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '10px',
            }}>
                <label style={{ marginBottom: '5px' }}>
                    Filter by:
                    <select
                        value={filterOption}
                        onChange={(e) => setFilterOption(e.target.value)}
                        style={{
                            marginLeft: '5px',
                            padding: '5px 10px',
                            border: '1px solid #ccc',
                            borderRadius: '3px',
                            cursor: 'pointer',
                        }}
                    >
                        <option value="az">A-Z</option>
                        <option value="za">Z-A</option>
                        <option value="lastModified">Last Modified</option>
                        <option value="lastInserted">Last Inserted</option>
                    </select>
                </label>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <button
                        onClick={() => setFilterOrder('asc')}
                        style={{
                            marginRight: '5px',
                            padding: '5px 10px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                        }}
                    >
                        Asc
                    </button>
                    <button
                        onClick={() => setFilterOrder('desc')}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                        }}
                    >
                        Desc
                    </button>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by Name, Mobile, or Email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '3px',
                        width: '100%',
                        maxWidth: '400px',  // Set maximum width for responsiveness
                    }}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        marginLeft: '10px',
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                    }}
                >
                    Search
                </button>
            </div>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: '20px',
                overflowX: 'auto',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '50px 0',
                justifyContent: 'center'
            }}>
            
                    {Render ? <>{(searchResults.length > 0 ? searchResults : data).map((item, index) => (
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
                    ))}
                    </>
                    : <>{filteredAndSortedData.map((item, index) => (
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
                    ))}
                    </>
}



                </Box>
            </>
            );
}

            export default UserCard

