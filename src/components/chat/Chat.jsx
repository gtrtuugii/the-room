import React, { useContext } from 'react';
import "./styling/chat.css";
import AddUser from "./media/add-user-icon.svg";
import Raccoon from "./media/raccoon-icon.svg";
import MoreIcon from "./media/more-icon.svg";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const {data} = useContext(ChatContext);
  return (
    <div className='chat'>
      <div className="chat-info">

        <div className="user-info">
          {data.user?.photoURL ? <img src={data.user?.photoURL} alt="" /> : <img src={Raccoon} alt=''/>}
          <span>{'@' + data.user?.displayName}</span>
        </div>

        
        <div className="chat-icons">
          <img src={AddUser} alt="add user" />
          <img src={MoreIcon} alt="more" />
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat