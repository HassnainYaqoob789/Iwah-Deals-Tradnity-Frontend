import React, { Component } from 'react';
import { applyCoupan, codsaveOrder, hblPayApi, removeCoupan, saveOrder } from '../../actions';
import store from '../../store';
import HBLPayPayment from '../products/common/hblPay';
import PaypalMethod from '../products/common/paypal';
import StripePayment from '../products/common/stripe';
import EasyPaisa from '../products/common/easypaisa'

class BillingStructureSidebar extends Component {
    constructor() {
        super()
        this.state = {
           coupan : "",
           disable_btn:0
        }
    }
    applyCoupan = (e) => {
        const coupan = {
            "code": this.state.coupan
        }
        store.dispatch(applyCoupan(coupan));
    }
    saveOrder = () => {
        document.querySelector(".loader-wrapper").style = "display: block";
        this.setState({ disable_btn: 1 })
        store.dispatch(saveOrder());
        
    }
    removeCoupan = () => {
        store.dispatch(removeCoupan());
    }

    render() {
      const { name,
      email,
      phone,
      address,
      items,
      FSTotal,
      ShippingFee,
      coupan,
      FDiscount,
      datas,
      price,
      FGTotal} = this.props;
  
      return (
      

  <div className="col-md-5" style={{ boxShadow: "0px 10px 20px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.05)", padding: 20 }}>
                        <div className="py-4">
                            <h3 className='onlyColor' style={{ fontSize: "28px", fontWeight: "bold", textAlign:"center" }}>Shipping & Billing</h3>
                        </div>
                            <h5 style={{ whiteSpace: "pre-wrap", fontSize: "1em", fontWeight: 500, textTransform: "capitalize", wordBreak: "break-all" }}><b>Name:</b> {name}</h5>
                        <h5 style={{ whiteSpace: "pre-wrap", fontSize: "1em", wordBreak: "break-all" }}><b>Email:</b> {email}</h5>
                        <h5 style={{ whiteSpace: "pre-wrap", fontSize: "1em", wordBreak: "break-all" }}><b>Phone:</b> {phone}</h5>
                        <h5 style={{ fontSize: "1em", wordBreak: "break-all" }}> <b>Address:</b> {address}</h5>
                        <div style={{ marginTop: 30 }}>
                            <h3 className='fw-bold my-5' style={{ color: "#000", textAlign:"center" }}>Order Summary</h3>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                            <h5 className='fw-bold'>Subtotal ({items} Items)</h5>
                            <p>{FSTotal}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                            <h5 className='fw-bold'>Shipping Fee</h5>
                            <p>{ShippingFee}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10 }}>
                            <input className="form-control no-border" type="text" onChange={(e) => this.setState({ coupan: e.target.value })} />
                            {(coupan == null) ? <input className='btn btn-solid' style={{ fontSize: "0.7em" }} onClick={(e) => this.applyCoupan()} type="button" value="Apply Coupon" /> : <input className='btn btn-solid' style={{ fontSize: "0.7em" }} onClick={(e) => this.removeCoupan()} type="button" value="Remove Coupon" />}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 35 }}>
                            <h5 className='fw-bold'>Discounted Price:</h5>
                            <p>{FDiscount}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h5 className='fw-bold'>Total:</h5>
                            <p className='fw-bold'>{FGTotal}</p>
                        </div>
                        <div className='my-4'>
                        </div>
                            
                            
                            {
                                (datas === "cashondelivery") ?
                                <button className="btn btn-success w-100 py-3 my-3 onlyBackColor" disabled={(this.state.disable_btn === 1) ? true : false}
                                 onClick={async () => {
                                    
                                    document.querySelector(".loader-wrapper").style = "display: block";
                                    await store.dispatch(codsaveOrder());
                                   }}
                                    type="submit">
                            Confirm Order
                            </button>
: (datas === "moneytransfer") ?

<StripePayment price={price} /> 


: (datas === "paypal_smart_button") ?


<PaypalMethod price={price} />

 : (datas === "hblpayment") ? 

<HBLPayPayment />
 :
 (datas === "Easypaisa") ? 

<EasyPaisa />
 :
            <button className="btn btn-success w-100 py-3 my-3 onlyBackColor" disabled={(this.state.disable_btn === 1) ? true : false} 
            onClick={async () => {
                                    
                document.querySelector(".loader-wrapper").style = "display: block";
                await store.dispatch(codsaveOrder());
               }}
               
               type="submit">
                         Confirm Order
                         </button>

                            }
                            
                            
                    </div>


      )
    }
  }

  export default BillingStructureSidebar;