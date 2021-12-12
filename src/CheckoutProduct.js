import React, { useState, useEffect } from 'react';
import './CheckoutProduct.css';
import { useStateValue } from './StateProvider';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/Remove';
import StarRateIcon from '@material-ui/icons/StarRate';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


function CheckoutProduct({ id, image, title, price, rating, hideButton, count, moveBack }) {
    const [{ basket, filteredBasket }, dispatch] = useStateValue();
    const [filterArr, setFilterArr] = useState([]);
    const [clikced, setClicked] = useState(false);
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const removeProductFromList = () => {
        setClicked(true);
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }
    const addItemToBasket = () => {
        setClicked(true);
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
        });
    }
    const removeFull = () => {
        setOpen(true);
        setTimeout(() => {
            dispatch({
                type: 'REMOVE_FULL_ITEM',
                id: id,
            })
            setClicked(true);
        }, 1000);
    }

    useEffect(() => {
        //get all ids
        const nArray = basket.map((data) => {
            return data.id
        })
        //filter unique ids
        const uniq = [...new Set(nArray)];
        //filter content of unique ids
        let uniqProd = [];
        for (let i = 0; i < uniq.length; i++) {
            let f = basket.find((data) => {
                return uniq[i] === data.id
            })
            uniqProd = uniqProd.concat(f)
        }

        //which id is present how many times
        const arrToInstanceCountObj = arr => arr.reduce((obj, e) => {
            obj[e] = (obj[e] || 0) + 1;
            return obj;
        }, {});

        const objVal = arrToInstanceCountObj(nArray)

        const keys = Object.keys(objVal);
        for (let i = 0; i < uniqProd.length; i++) {
            for (let j = 0; j < keys.length; j++) {
                if (uniqProd[i].id === parseInt(keys[j])) {
                    uniqProd[i].count = parseInt(objVal[keys[j]]);
                }
            }
        }
        uniqProd.sort((a, b) => {
            return a.id - b.id;
        });
        setFilterArr(uniqProd)
    }, [basket])

    useEffect(() => {
        if (clikced) {
            dispatch({
                type: 'FILTER_BASKET',
                item: filterArr,
            })
            setClicked(false);
        }
        setOpen(false);
    }, [filterArr])

    const saveForLater = ()=>{
        setClicked(true);
        dispatch({
            type: 'SAVE_FOR_LATER',
            id: id,
        })
    }

    const moveBackToCart = ()=>{
        setClicked(true);
        dispatch({
            type: 'MOVE_BACK_TO_CART',
            id: id,
        })
    }

    return (
        <div className="checkoutProduct">
            {!open ?
            <>
            <img src={image} alt="" className="checkoutProductImage" />
            <div className="checkoutProductInfo">
                <p className="checkoutProductTitle">{title}</p>
                <p className="checkoutProductPrice">
                    <small>{"₹"}</small>
                    <strong>{count * price}</strong>
                </p>
                <div className="checkoutProductRating">
                    {
                        Array(Math.round(rating)).fill().map((_, index) => {
                            return <p key={index}><StarRateIcon fontSize={"medium"} style={{ color: "#f0c14b" }} /></p>
                        })
                    }
                </div>
                <div style={{ display: "flex", marginTop: "20px" }}>
                    <div style={{ marginRight: "100px" }}>
                        {!hideButton && !moveBack && <button onClick={removeProductFromList} className={(count > 1) ? "checkBtn" : "addOn"}><RemoveIcon style={{ paddingTop: "5px" }} fontSize={"small"} /></button>}
                        <span style={{ padding: "0px 5px 0px 5px", marginTop: "20px" }}>
                            {"Quantity : " + count}
                        </span>
                        {!hideButton && !moveBack && <button onClick={addItemToBasket} className="checkBtn" style={{ paddingTop: "5px" }} fontSize={"small"}><AddIcon /></button>}
                    </div>
                    {!hideButton && !moveBack && (<div>
                        <button onClick={removeFull} className="checkBtn">
                            <div style={{ display: "flex" }}>
                                <div><DeleteIcon /></div>
                                <div style={{ padding: "5px" }}>Remove From Cart</div>
                            </div>
                        </button>
                    </div>)}
                    {!moveBack && 
                    <div>
                        <button onClick={saveForLater} className="checkBtn" style={{marginLeft: "20px"}}>
                            <div style={{ display: "flex" }}>
                                <div><BookmarkIcon/></div>
                                <div style={{ padding: "5px" }}>Save For Later</div>
                            </div>
                        </button>
                    </div>
                    }
                    {moveBack && 
                    <div>
                        <button onClick={moveBackToCart} className="checkBtn" style={{marginLeft: "20px"}}>
                            <div style={{ display: "flex" }}>
                                <div><RemoveCircleIcon/></div>
                                <div style={{ padding: "5px" }}>Move Back To Cart</div>
                            </div>
                        </button>
                    </div>
                    }
                </div>
            </div>
            </>
            :
            <>
            <CircularProgress color="grey" style={{margin: "40px"}}/>
            <span className="rmv">Removing Item From Cart</span>
            </>}

        </div>
    )
}

export default CheckoutProduct;
