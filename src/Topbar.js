import React from 'react';
import './Topbar.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';

export default function Topbar() {
    const [{ basket }, dispatch] = useStateValue();
    
    return (
        <div className="header" style={{display:"flex"}}>
            <div >
                <Link to="/">
                    <img src={"https://static.businessworld.in/article/article_extra_large_image/1600858456_HulSrV_Flipkart.jpg"} style={{height:"25px", width:"60px",marginRight:"10px", marginRight:"10px"}}/>
                </Link>
                
            </div>
            <div className="search">
                <input className="headerInput" />
                <SearchIcon className="topsearch" />
            </div> 
            <div className="headerNavbar" style={{float:"right"}}>
                
                <Link to="/checkout">
                    <div className="topBusketOption">
                        <ShoppingCartIcon size="lg"/>
                        <span className="secondnav topBusketCount">{basket?.length}</span>
                    
                    </div>
                </Link>
            </div>
        </div>
    )
}
