import { useEffect, useState } from "react"
import AuthContext from "./AuthContext"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const Provider = (props)=>{

  const [currentUser , setCurrentUser] = useState({});

  useEffect(()=>{
    console.log('This ran...')
    const unsub = onAuthStateChanged(auth,(user)=>{   // this checks if user has logged in already or not
      setCurrentUser(user);
      console.log(user);
    });
    // we must use a cleanup function when we listen to any real time function
    return ()=>{
     unsub();
    }
  })

  return <AuthContext.Provider value={{currentUser: currentUser}}>
   {props.children}
  </AuthContext.Provider>
}
export default Provider