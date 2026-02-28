import React, {Component} from 'react';
import { connect } from 'react-redux'
import {addToCartAndRemoveWishlist, removeFromWishlist} from '../../actions'
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import loadable from '@loadable/component'
import ScrollToTop from '../pages/scroll_to_top';
import EmptyWishlist from '../../svg_code/emptyWishlist';
import HeadSEO from '../layouts/tradnity/headSEO';
const WishlistTable = loadable(()=>import('./WishlistTable'));

class wishList extends Component {
    render (){
       
        const {getWishlist} = this.props;
       
        return (
          <div className='wishlist-top' style={{marginTop:"1%"}}>
         <ScrollToTop />
         <HeadSEO title="Wishlist" />

            


                {getWishlist && getWishlist.length !== 0 ?

              <WishlistTable getWishlists={getWishlist} />

                :
                <section className="cart-section section-b-space" style={{marginTop:"15vh"}}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div >
                                    <div className="col-sm-12 empty-cart-cls text-center">
                                            <EmptyWishlist />
                                        <h3 className='onlyColor'>
                                            <strong>WishList is Empty</strong>
                                        </h3>
                                        <h4>Explore more shortlist some items.</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    getWishlist:(state.wishlist.getwishlist)? state.wishlist.getwishlist.data:[],
})
export default connect(
    mapStateToProps,
    {addToCartAndRemoveWishlist, removeFromWishlist}
)(wishList)