import { useContext, useEffect, useReducer, useState } from "react"
import ChatContext from "./ChatContext"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import AuthContext from "./AuthContext";

const ChatProvider = (props)=>{
  const { currentUser } = useContext(AuthContext);


  const INITIAL_STATE = {
    user:{},
    chatId: "null"
  }

  const chatReducer = (state,action)=>{
    switch(action.type){
      case "CHANGE_USER":{
        return {
          user: action.payload,
          chatId: currentUser.uid > action.payload.uid
          ? currentUser.uid + action.payload.uid
          : action.payload.uid + currentUser.uid
        }
      }
      default:
         return INITIAL_STATE
    }
  };

  const [state, dispatch] = useReducer(chatReducer,INITIAL_STATE)
  return <ChatContext.Provider value={{data: state , dispatch}}>
   {props.children}
  </ChatContext.Provider>
}
export default ChatProvider