import React from 'react';

import {useState}from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import {initializeLoginFramework,handleGoogleSignIn,handleSignOut, resetPassword} from './loginManager';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword} from './loginManager'


function Login() {
  const[newUser,setNewUser]=useState(false);
 const[user,setUser]=useState({
   isSignedIn:false,
   name:'',
   email:'',
   password:'',
   photo:''
 })

initializeLoginFramework();

  const[loggedInUser,setLoggedInUser]=useContext(UserContext);
const history=useHistory();
const location=useLocation();
let { from } = location.state || { from: { pathname: "/" } };

const googleSignIn=()=>{
 handleGoogleSignIn()
 .then(res=>{
  handleResponse(res,true)
 })
}

const signOut=()=>{
 handleSignOut()
 .then(res=>{
  handleResponse(res,false)
 })

}
const handleResponse=(res,redirect)=>{
 setUser(res);
  setLoggedInUser(res);
  if(redirect){
 history.replace(from)
  }
 
}
 

 

 

const handleBlur=(e)=>{
  let isFieldValid=true;
  if(e.target.name=='email'){
    isFieldValid=/\S+@\S+\.\S+/.test(e.target.value);
    
  }
  if(e.target.name=='password'){
    const isPasswordValid= e.target.value.length>6 
    const passwordHasNumber=/\d{1}/.test(e.target.value);
    isFieldValid=isPasswordValid && passwordHasNumber;
  }
  if(isFieldValid){
    const newUserInfo={...user};
    newUserInfo[e.target.name]=e.target.value;
    setUser(newUserInfo);
  }
}

const handleSubmit=(e)=>{
 if(newUser&& user.email && user.password){
  createUserWithEmailAndPassword(user.name,user.email,user.password)
   .then(res=>{
   handleResponse(res,true)
  
   })
 }
 if(!newUser && user.email &&user.password){
   signInWithEmailAndPassword(user.email,user.password)
   .then(res=>{
    handleResponse(res,true)

   })
 }
 e.preventDefault();
}

  return (
    <div style={{textAlign:'center'}}>
     <h1>Hello all</h1>
     {
         user.isSignedIn ? 
           <button onClick={signOut}>Sign out</button>
         :
           <button onClick={googleSignIn}>Sign in</button>
     }
     <br/>
     <button>Sign  in using facebook</button>

     {
       user.isSignedIn && <div>
         <p>Welcome, {user.name}</p>
         <p>Your email: {user.email}</p>
         <img src={user.photo}alt=""/>
     </div>
     }
    
    <h1>Our own authentication system</h1>
    <input type="checkbox"onChange={()=>setNewUser(!newUser)} name="newUser" id=""/>
    <label htmlFor="newUser">New user Sign up</label>
    <form onSubmit={handleSubmit}>
      {newUser &&
      <input type="text" onBlur={handleBlur} name="name" id="" placeholder="Your name"/>}
      <br/>
      <input type="text" onBlur={handleBlur} name="email" placeholder="Your email address" required/>
      <br/>
      <input type="password" onBlur={handleBlur} name="password" placeholder="Your password" required/>
      <br/>
      <input type="submit" value={newUser ? 'Sign Up' : 'Sign In' }/>
      <button onClick={()=>resetPassword(user.email)}>Forget/Reset password</button>
    </form>
    <p style={{color:'red'}}>{user.error}</p>
    
    {
      user.success && 
      <p style={{color:'green'}}>User {newUser? 'created':'logged in' }successfully</p>
      
    }
    </div>
  );
}

export default Login;
