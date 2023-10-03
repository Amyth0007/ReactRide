import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home';
import Feed from './components/pages/Feed';
import CreateUser from './components/pages/CreateUser';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Newav from './components/NewNav';
import { useState, useEffect } from 'react';

function App() {
  const [login, setlogin] = useState(false);
  useEffect(() => {
      const token = window.localStorage.getItem("isloggedin");
      if(token){
          setlogin(token);
        }
      }, []);

  return (
    <div className="App">
      <Router>
      {/* <AppNav/> */}
        <Newav/>
       <Routes>
        <Route path='/' element={login ? <Home name="amit"/> : <Login/>}/>
        <Route path='/Feed' element={login ? <Feed/> : <Login/>} />
        <Route path='/Create' element={login ? <CreateUser/> : <Login/>}/>
        <Route path='/Register' element={ <Register/>}/>
        <Route path='/Login' element={<Login/>}/>
       </Routes>
      </Router>
      

    </div>
  );
}

export default App;
