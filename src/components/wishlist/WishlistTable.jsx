import React from 'react'
import Heading from '../pages/heading';
import {Link} from 'react-router-dom'
import { FiShoppingCart } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Demoing from '../../assets/images/placeholder.gif';
import { addItemToCart, addWGItemToCart, getCartData, getWishlist, movetocart, removeWishlist } from '../../actions';
import store from '../../store';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const WishlistTable = (props) => {
    let {getWishlists} = props;
    function handleClick(e) {
        document.querySelector(".loader-wrapper").style = "display: block";
        store.dispatch(removeWishlist(e));
        setTimeout(() => {
            document.querySelector(".loader-wrapper").style = "display: none";

        }, 2200);
    }
    const movetocartitem = async (e) => {
       await store.dispatch(movetocart(e));
    }
    const moveGroupPToCart = async (group, id) => {
        document.querySelector(".loader-wrapper").style = "display: block";

        var groupP;
    
        let item = { 'product_id': `${id}`, 'quantity': '1'};
         let dataaaa = group.map((da)=> groupP = {...groupP , [da?.id] : da?.qty.toString()});
    
        

        let mostQ = {'qty' : dataaaa[dataaaa.length - 1]};
        const children = {...item, ...mostQ};

        await store.dispatch(addWGItemToCart(children));

    }
  return (

    <section className="wishlist-section section-b-space">

<Heading name="Wishlist" />
<br />
<div className="mx-3">
<div className="row">
<div className="col-sm-12">
<table className="table cart-table table-bordered table-responsive-xs">

    <thead className="base_color onlyBackColor" style={{height:45}}>
        <tr className="table-head">
            <th scope="col"  className='text-light'>image</th>
            <th scope="col"  className='text-light'>product name</th>
            <th scope="col"  className='text-light'>price</th>
            <th scope="col"  className='text-light'>availability</th>
            <th scope="col"  className='text-light'>action</th>
        </tr>
        </thead>
        {getWishlists && getWishlists.length !== 0 && getWishlists.map((item, index) => { 
            return (
                <tbody key={index}>
                <tr>
                    <td>
                    <Link to={`${process.env.PUBLIC_URL}/product/${item && item.parent_url !== null ? item.parent_url : item.product.url_key}`}>
                            <LazyLoadImage placeholderSrc={Demoing} style={{height:80, width:80}}  src={(item?.product?.images[0]?.url) && item.product.images[0].url} alt="" />
                        </Link>
                        <div className="mobile-cart-content text-center">

                        <div className="col-xs-3">
                            <p style={item.product.in_stock ? {color:"#000"} : {color:"red"}}>{(item.product.in_stock === true)? 'In Stock ' : 'Out Of Stock'}</p>
                            </div>
                            </div>

                    </td>
                    <td>                                 
                           <Link to={`${process.env.PUBLIC_URL}/product/${item && item.parent_url !== null ? item.parent_url : item.product.url_key}`}>
{item.product.name}</Link>
                        <div className="mobile-cart-content row">
                            {/* <div className="col-xs-3">
                            <p style={item.product.in_stock ? {color:"#000"} : {color:"red"}}>{(item.product.in_stock === true)? 'In Stock ' : 'Out Of Stock'}</p>
                            </div> */}
                            <div className="col-xs-3">
                            <h2 className="td-color my-2">{item.product.formated_price}
{(item.product.formated_special_price !== null)?<del style={{fontSize:'18px'}} className="mx-2"><span className="money">{item.product.formated_regular_price}</span></del> :null}</h2>
                            </div>
                            <div className="col-xs-3">
                                <h2 className="td-color">
                                    <MdDeleteOutline className='mx-3 text-dark' style={{fontSize:25,marginRight:"50px",cursor:'pointer'}} onClick={() => handleClick(item.product.id)}/>
                                    <FiShoppingCart className='mx-3 text-dark'  onClick={() => item?.product?.grouped_products && (item?.product?.grouped_products !== 0) ? moveGroupPToCart(item?.product?.grouped_products, item.product.id) : movetocartitem(item.id)} />
                                    
                                </h2>
                            </div>
                        </div>
                    </td>
                    <td>
                    <h2>{item.product.formated_price}
{(item.product.formated_special_price !== null)?<del style={{fontSize:'18px'}} className="mx-2"><span className="money">{item.product.formated_regular_price}</span></del> :''}
</h2>
                         </td>
                    <td >
                    <p>{(item.product.in_stock === true)? 'In Stock ' : 'Out Of Stock'}</p>
                    </td>
                    <td>
                    <MdDeleteOutline className='mx-4' style={{fontSize:28,marginRight:"50px",cursor:'pointer'}} onClick={() => handleClick(item.product.id)}/>
                    {
                        (item?.product?.is_variant === 0) ? 
                        <FiShoppingCart className='mx-4' style={{fontSize:25,cursor:'pointer'}} onClick={() => item?.product?.grouped_products && (item?.product?.grouped_products !== 0) ? moveGroupPToCart(item?.product?.grouped_products, item.product.id) : movetocartitem(item.id)} />
                    : null}
                    </td>
                </tr>
                </tbody> 
                
                )
        })}
    </table>
</div>
</div>
<div className="row wishlist-buttons">
<div className="col-12">
<Link to={`${process.env.PUBLIC_URL}/shopPage`}><button type="button" className="btn-solid btn">Continue Shopping</button></Link>  


</div>
</div>
</div>
</section>

)
}

export default WishlistTable