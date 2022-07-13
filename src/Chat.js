import React, { useEffect, useState } from 'react'
import './Chat.css'
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import db from "./Firebase";
import { useStateValue } from './StateProvider';
import firebase from "firebase";

// 2:58:00 - chat file to code on messages


function Chat() {
      const [input, setInput] = useState("");
      const [seed, setSeed] = useState("");
      const {roomId} = useParams();
      const [roomName, setRoomName] = useState("");
      const [messages, setMessages] = useState([]);
      const [{user}, dispatch] = useStateValue();

      useEffect(() =>{
            if(roomId) {
                  db.collection('rooms')
                  .doc(roomId)
                  .onSnapshot((snapshot) => setRoomName
                        (snapshot.data().name));

                        db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                              setMessages(snapshot.docs.map(doc => doc.
                                    data()))
                        ))
            }

      }, [roomId])

      useEffect(() => {
            // change this rand code in seed inside avatar code - 2:29:00
            setSeed(Math.floor(Math.random() * 5000));

      }, []);

      const sendMessage = (e) =>{
            e.preventDefault();
            console.log("You typed >>> " , input);

            db.collection('rooms').doc(roomId).collection
            ('messages').add({
                  message : input,
                  name : user.dispayName,
                  timestamp : firebase.firestore.FieldValue.
                  serverTimestamp(),
            })
            setInput("");
      };

      return (
            <div className='chat'>

                  {/* 1 */}
                  <div className="chat__header">
                        <Avatar src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`} />
                        <div className="chat__headerInfo">
                              <h3>{roomName}</h3>
                              <p>
                                    last seen{" "}
                                    {new Date(
                                          messages[messages.length - 1]?.timestamp?.toDate
                                          ()).toUTCString() } 
                              </p>
                        </div>

                        <div className="chat__headerRight">
                              <IconButton>
                                    <SearchIcon />
                              </IconButton>

                              <IconButton>
                                    <AttachFileIcon />
                              </IconButton>

                              <IconButton>
                                    <MoreVertIcon />
                              </IconButton>
                        </div>

                  </div>

                  {/* 2 */}
                  <div className="chat__body">
                        {messages.map(message => (
                        <p className={`chat__message ${message.name === user.dispayName && "chat__receiver"} `}>

                              <span className='chat__name'> {message.name} </span>{message.message}
                              <span className='chat__timestamp'>
                                    {new Date(message.timestamp?.toDate
                                          ()).toUTCString() } 
                              </span>
                        </p>
                        ))}
                        

                  </div>

                  {/* 3 */}
                  <div className="chat__footer">
                        <IconButton>
                        <InsertEmoticonIcon />
                        </IconButton>
                        <form>
                              <input 
                              value={input} 
                              onChange={(e) => setInput(e.target.value)} 
                              placeholder="Type a message" type="text" />
                              <button onClick={sendMessage} type="submit">Send a message!</button>
                        </form>
                        <IconButton>
                        <MicIcon />
                        </IconButton>
                  </div>

            </div>
      )
}

export default Chat;


// 1:53:00