import React, { Component } from 'react';
import store from '../../store';
import { connect } from 'react-redux'
import { removeFromWishlist, saveOrder, applyCoupan, removeCoupan } from '../../actions'
import DOMPurify from 'dompurify';
import ScrollToTop from './scroll_to_top';

import { encrypt_code } from '../../constants/Endpoints';
import CryptoJS from "crypto-js";
import ProductsTable from './productsTableS';
import BillingStructureSidebar from './billingSidebarS';
import HeadSEO from '../layouts/tradnity/headSEO';





class BillingOptions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shippingM: "",
            paymentM: "",
            coupan: '',
            disable_btn: 0,
        }
    }
    removeCoupan = () => {
        store.dispatch(removeCoupan());
    }
    saveOrder = () => {
        document.querySelector(".loader-wrapper").style = "display: block";
        this.setState({ disable_btn: 1 })
        store.dispatch(saveOrder());
        
    }
    applyCoupan = (e) => {

        let Coupans = DOMPurify.sanitize(this.state.coupan, { USE_PROFILES: { html: false } });

        const coupan = {
            "code": Coupans
        }
        store.dispatch(applyCoupan(coupan));
    }







    render() {
        const { GetData } = this.props;


        const decryptedData = localStorage.getItem("PaymentMethod");
        var bytes = CryptoJS.AES.decrypt(decryptedData, encrypt_code);
        var getDate = bytes.toString(CryptoJS.enc.Utf8);
        let datas = getDate.substring(1, (getDate.length - 1))
        
        let pric = GetData && GetData.grand_total && GetData.grand_total.substring(0, (GetData.grand_total.length - 2))
  

        return (
            <div>
                <ScrollToTop />
                <HeadSEO title="Billing Page" />

                <div />
                <div className='head50' />
                <div className='row' style={{ margin: 0 }}>
                    <div className="col-md-7">

<ProductsTable data={GetData} />


                    </div>


<BillingStructureSidebar
name={GetData?.billing_address?.first_name + " " + GetData?.billing_address?.last_name}
email={GetData?.billing_address?.email}
phone={GetData?.billing_address?.phone}
address= {GetData?.billing_address?.address1[0] + ", " + GetData?.billing_address?.city + ", " + GetData?.billing_address?.state + ", " + GetData?.billing_address?.country}
items={GetData?.items_count}
FSTotal={GetData?.formated_sub_total}
ShippingFee={(GetData?.selected_shipping_rate) ? GetData.selected_shipping_rate.formated_price : null}
coupan={GetData.coupon_code}
FDiscount={GetData.formated_discount}
FGTotal={GetData.formated_grand_total}
datas = {datas}
price={pric}
/>

                  

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    GetData: state.cartList.getcartdata.data
})
export default connect(
    mapStateToProps,
    { removeFromWishlist }
)(BillingOptions)