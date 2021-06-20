import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyimage from '../../images/giphy.gif'; 
import { useHistory } from 'react-router';


const Review = () =>{
    const [cart,setCart]=useState([]);
    const[orderPlaced,setOrderPlaced]=useState([false]);
    const history=useHistory()


    const handleProceedCheckout=()=>{
        history.push('/shipment')
    }




    const removeProduct=(productKey)=>{
        console.log("remove clicked",productKey);
        const newCart=cart.filter(pd=>pd.key!==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useState(()=>{
        const savedCart=getDatabaseCart();
        const productKeys=Object.keys(savedCart);
        const cartProducts=productKeys.map(key=>{
            const product=fakeData.find(pd=>pd.key===key);
            product.quantity=savedCart[key];
            return product;

        });
        setCart(cartProducts);


    },[])
    let  thankYou;
    if(orderPlaced){
        thankYou=<img src={happyimage} alt=""></img>
    }
    
    return (
        <div className="twin-container">
            <div className="cart-container">
            {
               cart.map(pd=> <ReviewItem
                key={pd.key}
                removeProduct={removeProduct}
                
                product={pd}></ReviewItem>)
             }
             {
                 thankYou
             }
            </div>
            <div className="product-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">Proceed to checkout</button>
                
                </Cart>
            </div>
     
 
            
         </div>
    );
};

export default Review;