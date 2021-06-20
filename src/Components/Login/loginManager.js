import firebase from "firebase/app"
import "firebase/auth"
import firebaseConfig from './firebase.config';

export const initializeLoginFramework=()=>{
 if(firebase.apps.length===0){
  firebase.initializeApp(firebaseConfig);
 }
}
export const handleGoogleSignIn=()=>{
 const  provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res=>{
      const {displayName,photoURL,email}=res.user;
      const signedInUser={
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success:true
      }
      return signedInUser;
      
    })
    .catch(err=>{
      console.log(err);
      console.log(err.message);
    })
 }
export  const handleSignOut=()=>{
   return firebase.auth().signOut()
   .then(res=>{
     const signedOutUser={
       isSignedIn: false,
       name:'',
       email:'',
       photo:'' ,
       error:'',
       success:false
     }
     return signedOutUser
   })
  // Sign-out successful.
.catch((error) => {
  // An error happened.
});
}


export const createUserWithEmailAndPassword=(name,email,password)=>{
  return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(res => {
    const newUserInfo=res.user;
    newUserInfo.error='';
    newUserInfo.success=true
    
    updateUserName(name)
    verifyEmail();
    return newUserInfo;
    
  })
  .catch(error=> {
    const newUserInfo={};
    newUserInfo.error=error.message;
    newUserInfo.success=false;
   return newUserInfo;
  });
}
export const signInWithEmailAndPassword=(email,password)=>{
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then(res => {
    const newUserInfo=res.user;
    newUserInfo.error='';
    newUserInfo.success=true;
  return newUserInfo;
   console.log('sign in user info',res.user)
  })
  .catch((error) => {
    const newUserInfo={};
    newUserInfo.error=error.message;
    newUserInfo.success=false;
   return newUserInfo;
  });
}

const updateUserName=name=>{
  const user = firebase.auth().currentUser;

user.updateProfile({
  displayName: name,
}).then(function() {
  console.log('user name updated')
}).catch(function(error) {
 console.log(error)
});
}
const verifyEmail=()=>{
  var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});
}
export const resetPassword=email=>{
  var auth = firebase.auth();


auth.sendPasswordResetEmail(email).then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});
}