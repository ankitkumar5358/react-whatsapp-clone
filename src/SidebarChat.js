import React, { useEffect, useState } from 'react'
import './SidebarChat.css';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import {Link} from 'react-router-dom'
import db from './Firebase';

function SidebarChat  ({id, name,room,addNewChat})  {
      const [seed, setSeed] = useState("");
      const [messages, setMessages] = useState("");

      useEffect(() => {
            if(id) {
                  db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').
                  onSnapshot(snapshot => (
                        setMessages(snapshot.docs.map(doc => doc.
                              data()))
                  ))
            }
      },[id]);
      
      useEffect(() => {
            setSeed(Math.floor(Math.random() * 5000));
      }, []);

      const createChat = () => {
            const roomName = prompt("Please Enter Name For Chat");

            if (roomName) {
                  // do some clever db stuff....
                  db.collection("rooms").add({
                        name : roomName,
                  });
            }
      };

  return !addNewChat ? (
      <Link to={`/rooms/${id}`}> 
          <div className='sidebarChat'>
      <Avatar
      src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`} />

      <div className="sidebarChat__info">
            <h2>{room}</h2>
            <p> {messages[0]?.message} </p>
      </div>
    </div>
      </Link>

  ) : (
      <div onClick={createChat}
      className="sidebarChat">
            <h2>Add New Chat</h2>
      </div>
  )
};

export default SidebarChat;