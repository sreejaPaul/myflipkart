import React, { useState } from 'react';
import './Subtotal.css';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';




function Subtotal() {
    
    const [{ basket }, dispatch] = useStateValue();
    const [vis, setvis] = useState("none");

    return (
        <div className="subtotal">
            
            {"Subtotal (" + basket.length + "items):"}<strong>{"₹ " + getBasketTotal(basket)}</strong>
            <button >Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
