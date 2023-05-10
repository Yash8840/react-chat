import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './style.scss'
import { useContext } from "react";
import AuthContext from "./Context/AuthContext";

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.currentUser);

  const ProtectedRoute = ({children})=>{
    if(!authCtx.currentUser){
      return <Navigate to='/login'/> // changes the current location when it is rendered
    }
    return children;
  }
  return (
   <BrowserRouter>
     <Routes>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="login" element = {<Login/>} />
      <Route path="register" element={<Register/>}/>

     </Routes>
   </BrowserRouter>
  );
}

export default App;
