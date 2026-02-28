import React, { Component } from 'react'
import store from '../../store';

import { applyCoupan, removeCoupan } from '../../actions';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Placeholder from '../../svg_code/placeholder';


class DetailsSidebar extends Component {
    constructor() {
        super()
        this.state = {
            coupan: ""
        }
    }
    applyCoupan = (e) => {
        const coupan = {
            "code": this.state.coupan
        }
        store.dispatch(applyCoupan(coupan));
    }
    removeCoupan = () => {
        store.dispatch(removeCoupan());
    }

    render() {
        const { data, subTotal, taxTotal, shippingRate, FDiscount, FGTotal, coupon } = this.props;

        return (

            <div className="col-md-3">
                <div className="cart-summary" style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '10px', width: "90%" }}>

                    {/* Cart Items */}
                    <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
                        {data?.length ? data.map((item, index) => (
                            <div key={index} style={{ display: 'flex', backgroundColor: '#fff', borderRadius: '10px', padding: '10px', marginBottom: '10px', alignItems: 'center' }}>

                                {/* Product Image */}
                                <div style={{ flex: '0 0 80px', textAlign: 'center' }}>
                                    {item.product?.images?.[0]?.url ? (
                                        <LazyLoadImage
                                            src={item.product.images[0].url}
                                            alt={item.name}
                                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }}
                                        />
                                    ) : (
                                        <div style={{ width: '80px', height: '80px', backgroundColor: '#ddd', borderRadius: '5px' }}>
                                            <Placeholder />
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div style={{ flex: '1', marginLeft: '10px' }}>
                                    <p style={{ margin: '0 0 5px 0', fontWeight: 500 }}>{item.name}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em' }}>
                                        <span>{item.formated_price}</span>
                                        <span>x{item.quantity}</span>
                                    </div>
                                </div>
                            </div>
                        )) : <p style={{ textAlign: 'center', padding: '20px' }}>Your cart is empty</p>}
                    </div>

                    <hr />

                    {/* Coupon */}
                    <div style={{ display: 'flex', marginBottom: '15px' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Your Coupon Code"
                            style={{ flex: 1, marginRight: '10px' }}
                            onChange={(e) => this.setState({ coupan: e.target.value })}
                        />
                        <button
                            className="btn btn-solid"
                            style={{ fontSize: '0.8em', padding: '8px 12px' }}
                            onClick={(coupon == null) ? () => this.applyCoupan() : () => this.removeCoupan()}
                        >
                            {coupon == null ? "Apply Coupon" : "Remove Coupon"}
                        </button>
                    </div>

                    <hr />

                    {/* Summary Details */}
                    {[
                        { label: 'Subtotal', value: subTotal },
                        { label: 'Tax Price', value: taxTotal },
                        { label: 'Shipping', value: shippingRate },
                        { label: 'Discounted Price', value: FDiscount }
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span>{item.label} :</span>
                            <span>{item.value}</span>
                        </div>
                    ))}

                    <hr />

                    {/* Total */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2em', fontWeight: 600 }}>
                        <span>Total :</span>
                        <span>{FGTotal}</span>
                    </div>

                </div>
            </div>


        )
    }
}

export default DetailsSidebar;