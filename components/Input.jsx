import React, { useContext, useState } from 'react'
import Img from '../img/img.png'
import Attach from '../img/attach.png'
import AuthContext from '../Context/AuthContext';
import ChatContext from '../Context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import {v4 as uuid} from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext)

  const [text , setText] = useState("")
  const [img, setImg] = useState(null);

  const handleSend = async()=>{
   if(img){
    const storageRef = ref(storage, uuid());

    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on( 
      // 'state_changed',
      (error) => {
       
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          await updateDoc(doc(db, "chats" , data.chatId),{
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL
            })
          })
        });
      }
    );
    
   }else{
    await updateDoc(doc(db, "chats" , data.chatId),{
      messages: arrayUnion({
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now()
      })
    })
   }
   // now we add the latest message and update the current time in userChats for both the current user and the other user,
   // the latest message is the "text"input
   await updateDoc(doc(db, "userChats" , currentUser.uid),{
    [data.chatId + ".lastMessage"]:{
      text
    },
    [data.chatId + ".date"]: serverTimestamp()
   })
   // now, doing the same thing for the other user
   await updateDoc(doc(db, "userChats" , data.user.uid),{
    [data.chatId + ".lastMessage"]:{
      text
    },
    [data.chatId + ".date"]: serverTimestamp()
   })
   setText("");
   setImg(null)
  }
  return (
    <div className='input'>
      <input type="text" name="" id="" placeholder='Type Something...' onChange={e=> setText(e.target.value)} value={text}/>
      <div className="send">
        <img src={Attach} alt="" srcset="" />
        <input type="file" name="" id="file" style={{display: 'none'}} onChange={e=> setImg(e.target.files[0])}/>
        <label htmlFor="file">
          <img src={Img} alt="" srcset="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input