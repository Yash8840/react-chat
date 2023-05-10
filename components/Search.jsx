import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { db } from "../firebase";
import AuthContext from "../Context/AuthContext";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    // we use firebase quesry to search for a user
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    console.log(q);
    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log(doc.data());
      });
    } catch (err) {
      setError(err);
    }
  };
  const handleKey = (e) => {
    if (e.code === "Enter") {
      console.log("clicked Enter...");
      console.log(userName);
      handleSearch();
    }
  };
  const handleSelect = async() => {
    //check whether the group(chats in firestore) exists or not, if not, then create
    console.log(user)
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try{
      const res = await getDoc(doc(db , "chats" , combinedId));
      if(!res.exists()){
        // create a chat in chats collection
        await setDoc(doc(db , "chats", combinedId),{messages:[]})

        //create user chats (for the user and the other person)
        // userChats:{
        //   currentUserId:{
        //     combinedId:{
        //       otherUserInfo:{
        //         displayName,img, id
        //       },
        //       lastMessage:"",
        //       date:""
        //     }
        //   }
        // }
        // ABOVE WILL BE THE STRUCTURE INSIDE userChats:-\
        // now to update the userChats:-
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combinedId+".userInfo"]: {  // combinedId will be an object and userInfo a key of it
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        }) 
        await updateDoc(doc(db,"userChats",user.uid),{
          [combinedId+".userInfo"]: {  // combinedId will be an object and userInfo a key of it
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+".date"]: serverTimestamp()
        })
      }
    }catch(err){

    }
    setUser(null); // to close the search bar
    setUserName("");
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
      </div>
      {error && <span>User not found.</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" srcset="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
