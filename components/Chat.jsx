import React, { useContext } from 'react'
import Cam from '../img/cam.png'
import Add from '../img/add.png'
import more from '../img/more.png'
import Messages from './Messages'
import Input from './Input'
import ChatContext from '../Context/ChatContext'

const Chat = () => {
  const {data} = useContext(ChatContext);
  console.log(data.user);
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
        <div className="chatIcons">
          <img src={Cam} alt="" srcset="" />
          <img src={Add} alt="" srcset="" />
          <img src={more} alt="" srcset="" />
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat