import React from 'react';
import './Homebody.css';
import ProductFeed from './ProductFeed';

export default function Homebody() {

    return (
        <div className="home">
            <div className="homeContainer">
                
                <ProductFeed/>
            </div>
        </div>
    )
}
