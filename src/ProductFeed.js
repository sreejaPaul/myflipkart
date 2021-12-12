import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Product from './Product';
import './ProductFeed.css';
import data from './data.json';

function ProductFeed() {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        setProducts(data)
    },[])
    return (
        <div>
            <div className="cont">
                {products.slice(0,4).map((data)=>(
                    <div style={{float:"left"}}>
                        <Product key={data.id} id={data.id} title={data.title} price={(Math.ceil(data.price*80))} description={data.description} category={data.category} image={data.image} rating={data.rating?.rate}/>
                    </div>
                ))}
            </div>
            {/* <img src="https://images-eu.ssl-images-amazon.com/images/G/31/cross-site/banner-1_pc.jpg" style={{width:"100%"}}/> */}
            <div className="cont">
            {products.slice(4,products.length).map((data)=>(
                <div style={{float:"left"}}>
                    <Product key={data.id} id={data.id} title={data.title} price={(Math.ceil(data.price*80))} description={data.description} category={data.category} image={data.image} rating={data.rating?.rate}/>
                </div>
            ))}
            </div>
        </div>
    )
}

export default ProductFeed
