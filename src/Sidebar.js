import React, { useEffect, useState }  from 'react'
import './Sidebar.css';
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';
import db from "./Firebase"
import { useStateValue } from './StateProvider';

function Sidebar () {
  const [rooms, setRooms] = useState([]);
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection('rooms').onSnapshot(snapshot => 
        setRooms(snapshot.docs.map((doc) => 
          ({
            id : doc.id,
            data : doc.data(),
          }
          )))
    )
    return () => {
      unsubscribe();
    }
    
  },[])

  const [seed, setSeed] = useState('');
  useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (

    <div className="sidebar">
      {/* 1 */}
      <div className="sidebar__header">
      <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">

          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>

        </div>
      </div>

      {/* 2 */}
      <div className="sidebar__search">

        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input placeholder='Search or Start new Chat' type="text" />
        </div>

      </div>

      {/* 3 */}
      <div className="sidebar__chats">
        <SidebarChat addNewChat/>
        {rooms.map(room => (
          <SidebarChat key={room.id} id={room.id} 
          name={room.data.name} />
        ))}

      </div >
    </div>
  );
};

export default Sidebar;