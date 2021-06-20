import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../fakeData';
import Product from '../Components/Product/Product';

const ProductDetails = () => {
    const {productKey}=useParams();
    const product=fakeData.find(pd=>pd.key=productKey);
    console.log(product);

    
    return (
        <div>
            <h1>Your product detail coming soon...</h1>
            <Product showAddToCart={false} product={product}></Product>
            
        </div>
    );
};

export default ProductDetails;