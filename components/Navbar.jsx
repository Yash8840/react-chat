import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import AuthContext from '../Context/AuthContext'

const Navbar = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div className='navbar'>
      <span className='logo'>React Chat</span>
      <div className="user">
        <img src={authCtx.currentUser.photoURL} alt="" srcset="" />
        <span>{authCtx.currentUser.displayName}</span>
        <button onClick={()=>{signOut(auth)}}>logout</button>
      </div>
    </div>
  )
}

export default Navbar