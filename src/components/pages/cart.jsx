import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { Badge } from '@mui/material';
import { FiShoppingCart } from "react-icons/fi";
import { connect } from 'react-redux';
import {  MdOutlineShoppingBag } from "react-icons/md";
import { useEffect } from 'react';
import "./myOrders.scss";

import { LazyLoadImage } from 'react-lazy-load-image-component';
import EmptyCart from '../../svg_code/emptyCart';
import Placeholder from '../../svg_code/placeholder';


function TemporaryDrawer(props) {
  const [state, setState] = React.useState({
    right: false,
  });
  const { cartData, currencies } = props
  let item_lenght = (cartData) && (cartData.items_qty) ? cartData.items_qty.length : 0 ;
  let final_lenght = (cartData) && (cartData.items_qty) ? cartData.items_qty.substring(0, item_lenght - 5) : 0;
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  useEffect(() => {
    document.querySelector('body').scrollTo(0, 0)
  }, [])
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 330 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      style={{ overflowX: 'hidden' }}
    >
      <List >
        <h4 className='base_color' style={{ textAlign: "center", padding: '9%', fontWeight: "bold"}}><MdOutlineShoppingBag size={20} />&nbsp;&nbsp;Shopping Cart</h4>
      </List>
      <Divider />
      {(cartData) ?
        <div>
          {(cartData.length !== 0) ?
            <div>
              <List  >
              {cartData.items.map((item, index) => {
                return (
                  
                  <div key={index} className="row" style={{ textAlign: "center" }}>
                    <div className="col-lg-4">
                    <Link to={`${process.env.PUBLIC_URL}/product/${item && item.parent_url !== null ? item.parent_url : item.product.url_key}`}>
                     {
                      ((item.product !== '') && item?.product?.images[0]?.url) ?
                      <LazyLoadImage alt="img" src={(item.product !== '') && item?.product?.images[0]?.url }
                      style={{ width: "80px", height: "100px", padding: '7px', paddingTop: '0px' }} />
                      :
                      <div style={{ width: "80px", height: "100px", padding: '7px', paddingTop: '0px' }}>
                        <Placeholder />
                       </div>
                      }
                  </Link>
                    </div>
                    <div className="col-lg-8">
                      <div className="row" >
                        <div className="col-lg-12" style={{ display : 'flex', justifyContent:"space-evenly"}} >
                    <Link to={`${process.env.PUBLIC_URL}/product/${item && item.parent_url !== null ? item.parent_url : item.product.url_key}`}>
                          <p className="cart-text fw-bold" style={{ lineHeight: '20px' }}>{item.name}</p>
                  </Link>

                        </div>
                        <div className="col-lg-6 col-md-6">
                          <p> {item.formated_price}</p>
                        </div>
                        <div className="col-lg-6 col-md-6 onlyColor" style={{ fontWeight: 500}}>
                          <p> x{item.quantity}</p>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                )
              })}
            </List>
              <List >
                <div className="row">
                  <div className="col-lg-12" style={{ textAlign: 'right', marginLeft: '-4%' }}>
                    <p>Sub Total : {cartData.formated_sub_total}</p>
                    <p>Shipping Total : {(cartData.selected_shipping_rate) ? cartData.selected_shipping_rate.formated_price : `${currencies.code} 0.00`}</p>
                    <p>Tax Total : {cartData.formated_tax_total}</p>
                    <p className='fw-bold'>Total : {cartData.formated_grand_total} </p>
                  </div>
                </div>
                <div style={{display:"block", textAlign:"center"}}>
                   
                      <Link className="btn btn-solid my-2 mx-2" style={{ borderRadius: 6, fontSize: 12}} to={`${process.env.PUBLIC_URL}/cart`} >
                        Update Cart
                      </Link>
                    
                      <Link to={`${process.env.PUBLIC_URL}/cart-sidebar`} className="btn btn-solid my-2 mx-2" style={{ borderRadius: 6, fontSize: 12}}>check out</Link>
                      <Link className="btn btn-solid my-2 mx-2" style={{ borderRadius: 6, fontSize: 12 }} to={`${process.env.PUBLIC_URL}/shopPage`} >
                       continue shopping
                      </Link>
                </div>
              </List></div>
            :
            <section className="cart-section section-b-space">
                                <div className="container">
                                    <div className="row">
                                            <div className="head50" />

                                                <div className="col-sm-12 empty-cart-cls text-center">
                                                  <EmptyCart />
                                               
                                                <h3 className='onlyColor'>
                                                        <strong>Your Cart is Empty</strong>
                                                    </h3>
                                                    <h4>Explore more shortlist some items.</h4>
                                                </div>
                                    </div>
                                </div>
                            </section>
          }
        </div>
        :
        <section className="cart-section section-b-space">
        <div className="container">
            <div className="row">
                    <div className="head50" />

                        <div className="col-sm-12 empty-cart-cls text-center">
                          <EmptyCart />
                         <h3 className='onlyColor'>

                                <strong>Your Cart is Empty</strong>
                            </h3>
                            <h4>Explore more shortlist some items.</h4>
                        </div>
            </div>
        </div>
    </section>}
    </Box>
  );
  return (
 
          <React.Fragment key={'right'}  >
            {/* <Button style={{ minWidth: 0, padding: 0 }} onClick={toggleDrawer('right', true)}> */}
              <Badge badgeContent={final_lenght} sx={{
                "& .MuiBadge-badge": {
                  color: "#fff",
                }
              }} style={{ fontSize: 20, marginRight: 15, color: "#fff" }}>
               <FiShoppingCart size={20} onClick={toggleDrawer('right', true)} style={{ marginRight: 2, marginLeft:"6px",color: "#555555" }} />
              </Badge>
              {/* </Button> */}
            <Drawer
              anchor={'right'}
              open={state['right']}
              onClose={toggleDrawer('right', false)}
            >
              {list('right')}
            </Drawer>
          </React.Fragment>
    
   
  );
}
const mapStateToPros = (state, ownProps) => ({
  cartData: (state.cartList.getcartdata) ? state.cartList.getcartdata.data : '',
  currencies: (state?.user?.currencies) ? state?.user?.currencies : '',

});
export default connect(mapStateToPros)(TemporaryDrawer);