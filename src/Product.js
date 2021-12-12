import React from 'react'
import './Product.css';
import { useStateValue } from './StateProvider';
import StarRateIcon from '@material-ui/icons/StarRate';
import Slide from '@material-ui/core/Slide';
import CancelIcon from '@material-ui/icons/Cancel';
import {Button} from '@material-ui/core';

export default function Product({id, title, price, description, category, image, rating}) {
    const[{basket},dispatch] = useStateValue();
    
    const addToBasket = ()=>{
        //dispatch the item into data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price:price,
                rating: rating
            }
        })
        
    }
    return (
        <div className="product">
            <div className="productDetails">
                <p className="productCategory">{category}</p>
                <p style={{marginTop:"0.75rem",marginBottom:"0.75rem", fontWeight:"bold"}}>{title}</p>
            
                <p className="productPrice">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="productRating">
                    {
                        Array(Math.round(rating)).fill().map((_,index)=>{
                            return <p key={index}><StarRateIcon fontSize={"medium"} style={{color: "#f0c14b"}}/></p>
                        })
                    }

                </div>
            </div>
            <img src={image} alt="product"/>
            <button onClick={addToBasket}>Add to Basket</button>
            
        </div>
    )
}
