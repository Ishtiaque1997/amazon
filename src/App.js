import React from 'react';
import './App.css';
import Header from'./Components/Header/header';
import Shop from './Components/Shop/Shop';
import Review from './Components/Review/Review'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inventory from './Components/Inventory/Inventory';
import NotFound from './Components/NotFound/NotFound';
import ProductDetails from './ProductDetails/ProductDetails';
import Shipment from './Components/Shipment/Shipment';
import Login from './Components/Login/Login';

import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';



export const UserContext=createContext();


function App(props) {
  const[loggedInUser,setLoggedInUser]=useState({});
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]} >
    
      <p>email: {loggedInUser.email}</p>
      
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review>

          </Route>
          <PrivateRoute path="/inventory">
            <Inventory></Inventory>
          </PrivateRoute>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path="/login">
            
            <Login></Login>
          </Route>
          
          <Route exact path="/">
            <Shop></Shop>

          </Route>
          <Route path="/product/:productKey" >
              <ProductDetails></ProductDetails>
          </Route>
      
        
          <Route path="/*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>

      
     </UserContext.Provider> 
     
  );
}

export default App;
    


