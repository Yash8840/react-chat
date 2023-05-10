import React, { useState } from 'react'
import Add from '../img/addAvatar.png'
import {createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import {auth , db, storage} from '../firebase';
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, setDoc} from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
  const [error , setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e)=>{
   e.preventDefault();
   console.log(e.target[0]);
   console.log(e.target[0].value);

   const displayName = e.target[0].value;
   const email = e.target[1].value;
   const password = e.target[2].value;
   const file = e.target[3].files[0];

   try{
    const res = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res);

const storageRef = ref(storage, 'images/' +displayName); // if the userName is John , it's going to be John.png n all

const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on( 
  // 'state_changed',
  (error) => {
    // Handle unsuccessful uploads
    console.log('error hogaya');
    setError(true)
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);
      await updateProfile(res.user, {
        displayName: displayName,
        photoURL: downloadURL
      });
      await setDoc(doc(db , "users" , res.user.uid),{ // the collection's name is "users" and we are going to use this collection to store all users so that users can see other users
        uid: res.user.uid,
        displayName: displayName,
        email: email,
        photoURL: downloadURL
      }) // we added the user's uniques id becasue fetching the user becomes easy, we just have to do user.uid
      await setDoc(doc(db, "userChats" , res.user.uid), {});
      navigate('/')
    });
  }
);


   }catch(error){
    console.log('bhaari error hogayi..');
    setError(true)
   }
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//     console.log(user);
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });
  }
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Chiity Chat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='display name'/>
          <input type='email' placeholder='email'/>
          <input type='password' placeholder='password'/>
          <input style={{display: 'none'}} type='file' id='file'/>
          <label htmlFor='file'>
            <img src={Add} alt=""/>
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {error && <span>Something went wrong.</span>}
        </form>
        <p>Do you already have an account?<Link to='/login'>Login</Link> </p>
      </div>
    </div>
  )
}

export default Register