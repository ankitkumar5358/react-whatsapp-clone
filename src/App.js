import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{user}, dispatch] = useStateValue();

  <h1 style={{marginBottom : '20px', color : '#25D366'}}>Whatsapp Web </h1>
  
  return (
    // BEM naming convention

    <div className='app'>
      {!user ? (
        <Login/>
      ) : (
      
       <div className="app__body">
            <Router>
              <Sidebar/>
              <Routes>
                <Route path="/rooms/:roomId">
                  <Chat/>
                </Route>
                <Route path="/">
                  <Chat/>
                </Route>              
              </Routes>            
            </Router>
          </div>
      )}
    </div>
  );
}

export default App;
