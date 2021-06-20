import React from 'react';
import css from './Cart.css'


const Cart = (props) => {
    const cart=props.cart;
    let total=0;
    for(let i=0;i<cart.length;i++){
        const product=cart[i];
        total=total+product.price *product.quantity;


    }
    let shipping=0;
    if (total>30){
        shipping=0;
    }
    else if(total>15){
        shipping=5;
    }
    else if (total>0){
        shipping=10 
    }
    const tax=(total/10);
    const grandTotal=(total+shipping+Number(tax)).toFixed(2);


    const formatNumber=num=>{
        const precision=num.toFixed(2);
        return Number(precision);

    }
    return (
        <div>
            <h4>Order summary</h4>
            <p>Items Ordered:{cart.length} </p>
    <p>Product price:{formatNumber(total)}</p>
           
    <p><small>Shipping cost:{shipping}</small></p>
    <p>Total price:{(grandTotal)}</p>
    <p><small>Tax+Vat:{tax}</small></p>
    <p>Order total: ${grandTotal}</p>
    {
        props.children
    }
      
        </div>
    );
};

export default Cart;