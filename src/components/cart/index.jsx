import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux'

import ScrollToTop from '../pages/scroll_to_top';
import { removeFromCart, incrementQty, decrementQty, getCartData} from '../../actions'

import CartTable from './cartTable';
import store from '../../store';
import EmptyCart from '../../svg_code/emptyCart';
import HeadSEO from '../layouts/tradnity/headSEO';

class cartComponent extends Component {
    componentDidMount(){

        store.dispatch(getCartData());
    }
    render() {

        const { cartData } = this.props;

        return (
            <div>
                <ScrollToTop />
              
                <HeadSEO title="Cart Page" />
                <>
                    {(cartData) && (cartData !== null && cartData.length !== 0) ?
                    <CartTable cartData={cartData}  />

                            :
                            <section className="cart-section section-b-space">
                                <div className="container">
                                    <div className="row">
                                            <div className="head50" />

                                                <div className="col-sm-12 empty-cart-cls text-center">
                                                    <EmptyCart />
                                                    <h3 className='headCart' >

                                                        <strong>Your Cart is Empty</strong>
                                                    </h3>
                                                    <h4>Explore more shortlist some items.</h4>
                                                </div>
                                    </div>
                                </div>
                            </section>
                        }
                  
                </>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    cartData: state.cartList.getcartdata.data,
})
export default connect(
    mapStateToProps,
    { removeFromCart, incrementQty, decrementQty }
)(cartComponent)