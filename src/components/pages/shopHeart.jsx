import React from 'react';
import { useState } from 'react';
import Heart from 'react-heart';
import { removeWishlist } from '../../actions';
import history from '../../history';
import store from '../../store'; 

const ShopHeart = (props) => {
    let { data } = props
    const [wishList, setWishList] = useState(data.is_wishlisted)
    function handleClick(e) {
        store.dispatch(removeWishlist(e));
    }
    const setActive = (e) => {
        setWishList(e);
    }
    return (
        <Heart isActive={wishList} onClick={() => {
            setActive(!wishList);
            localStorage.getItem("customerData") ? handleClick(data.id) : history.push(`${process.env.PUBLIC_URL}/login`)
        }} />
    )
}
export default ShopHeart;