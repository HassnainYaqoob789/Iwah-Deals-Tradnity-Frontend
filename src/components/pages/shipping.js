import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import store from '../../store';
import { connect } from 'react-redux'
import { removeFromWishlist, saveShipping, savePayment } from '../../actions'
import "./shipping.scss"
import ScrollToTop from './scroll_to_top';
import { encrypt_code } from '../../constants/Endpoints';
import CryptoJS from "crypto-js";
import HeadSEO from '../layouts/tradnity/headSEO';


class ShippingOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shippingM: "",
            paymentM: "",
            payD: [],
        }
    }
    saveShipping = (e) => {
        document.querySelector(".loader-wrapper").style = "display: block";
        const shipping = {
            "shipping_method": e
        }
        store.dispatch(saveShipping(shipping));
    }
    savepayment = (e) => {
        const shipping = {
            "payment": {
                "method": e
            }
        }
        var encrypt_data = CryptoJS.AES.encrypt(JSON.stringify(e), encrypt_code).toString();
        localStorage.setItem('PaymentMethod', encrypt_data);
        store.dispatch(savePayment(shipping));
    }
    render() {
        const getData = localStorage.getItem("shipping-rates");
        const Data = JSON.parse(getData);
        const shipping = (Data != null) ? Data : '';


        const decryptedData = localStorage.getItem("PaymentMe");

        var bytes = decryptedData !== null ? CryptoJS.AES.decrypt(decryptedData, encrypt_code) : [];
        let getD = decryptedData !== null ? bytes.toString(CryptoJS.enc.Utf8) : []
        let dataD = decryptedData !== null ? JSON.parse(getD) : []

        return (
            <div>
                <ScrollToTop />
                <HeadSEO title="Shipping Page" />

                <div className='shipping-top' style={{ paddingTop: 100 }}>
                    <h1 style={{ fontSize: 25, marginLeft: 50 }}>Select Shipping Method</h1>
                    {(shipping) ?

                        shipping.map((shppingdata, key) => {
                            let carrier_titleS = shppingdata.rates[0].carrier_title;
                            let method_title = shppingdata.rates[0].method_title;
                            return (
                                <div key={key} className="radio" style={{ marginTop: 25, marginLeft: 50 }}>
                                    <input value={shppingdata.rates[0].method} onClick={(e) => this.saveShipping(e.target.value)} id={shppingdata.rates[0].method} name="radio" type="radio" />
                                    <label for={shppingdata.rates[0].method} className="radio-label">
                                        <span style={{ fontWeight: 600 }}>{shppingdata.rates[0].formated_price}</span>  <br />
                                        <span style={{ fontWeight: 600, marginLeft: 35 }}>{method_title ? method_title : carrier_titleS}</span>
                                    </label>
                                </div>
                            )
                        })
                        : ''
                    }
                </div>

                <div style={{ paddingTop: 20, margin: 50, display: 'none' }} className="paymentOption" >
                    <h1 style={{ fontSize: 25, marginBottom: "25px" }}>Select Payment Method</h1>

                    {
                        dataD.length !== 0 ?
                            dataD.map((ao, i) => {
                                return (
                                    <div key={i} className="radio">
                                        <input onClick={(e) => this.savepayment(e.target.value)} value={ao.method} id={ao.method} name="radioP" type="radio" />
                                        <label for={ao.method} className="radio-label">
                                            <span style={{ fontWeight: 600 }}>{ao.method_title}</span>
                                            {/* <br />
                                            <span style={{ marginLeft: 35 }}>{ao.description}</span> */}
                                        </label>
                                    </div>

                                )
                            })
                            : null
                    }

                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    datas: state,
})
export default connect(
    mapStateToProps,
    { removeFromWishlist }
)(ShippingOptions)