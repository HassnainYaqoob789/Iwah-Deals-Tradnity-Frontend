


import React, {Component } from 'react'
import { connect } from 'react-redux'
import store from '../../store';
import {verify_otp,resendOtp, forgetverifyotp, forgetotpsend} from '../../actions'
import {ResendOTP} from "otp-input-react";
import * as url from '../../constants/Endpoints'
import Heading from './heading';
import ScrollToTop from './scroll_to_top';
import OtpInput from 'react-otp-input';
import "./register.css"
import PageNF from './PageNF';

class ForgetOtp extends Component {
    constructor () {
        super ()
        this.state = {
           otp:""
        }
    }

    handleChange = (otp) => this.setState({ otp });

    SubmitOtp = (e) => {
        var otp = this.state.otp;
        var data = {'otp':otp,'email':e}
        store.dispatch(forgetverifyotp(data));
    }
    resend = (e) => {
        var user = {"email":e}
        store.dispatch(forgetotpsend(user));
    }
    render (){
        var CryptoJS = require("crypto-js");









    const decryptedData = localStorage.getItem("ForgetPasswordUser") ? localStorage.getItem("ForgetPasswordUser") : localStorage.getItem("RegisterUser");
    var bytes = decryptedData ? CryptoJS.AES.decrypt(decryptedData, url.encrypt_code) : null;
    var getData = decryptedData ? bytes.toString(CryptoJS.enc.Utf8) : null;

let Dataa = localStorage.getItem("ForgetPasswordUser") ?  JSON.parse(getData)?.email : JSON.parse(getData) ;




    let email_length = Dataa ? Dataa.length : null;
    let first = Dataa ? Dataa.substring(0,3) : null;
    let last = Dataa ? Dataa.substring(email_length-4, email_length) : null;
    let final = first +'*********' + last;
    const renderButton = (buttonProps) => {
        return <button onClick={() => this.resend(Dataa)} className="btn btn-solid" {...buttonProps}>Resend</button>;
      };
      const renderTime = (remainingTime) => {
        return <span style={{marginTop:15, }}>{remainingTime} seconds remaining</span>;
      };
    return (
        <>
        <ScrollToTop />
        {
            decryptedData ?
        
            <div className="container height-100 d-flex justify-content-center align-items-center" >
                <div className="position-relative" style={{marginTop:100}}>
                <div className='head50' />
         <Heading name="OTP Verification" />
                    <div className="my-5 p-8 text-center">
                        <h6>Please enter the one time password <br /> to verify your account</h6>
                        <div> <span>A code has been sent to</span> <small className='onlyColor' style={{fontWeight:700}}>{final}</small> </div>
                        <div id="otp" className="inputs d-flex flex-row justify-content-center mt-4" > 
                           

<OtpInput
        value={this.state.otp}
        onChange={this.handleChange}
        numInputs={4}
        isInputNum={true}
        shouldAutoFocus={true}
        inputStyle={{
            width: "3rem",
            height: "3rem",
            margin: "0 1rem",
            fontSize: "1.2rem",
            borderRadius: 4,
            fontWeight:400,
            outline: "none",
            boxShadow:"0px 2px 20px rgba(0,0,0,0.07)",
            border: "1px solid #bd1e2e9c"
          }}
        separator={<span>.</span>}
      />

                        </div>
                        <div className="mt-4">
                        <button disabled={(this.state.otp !== null) ? false : true} onClick={() => this.SubmitOtp(Dataa)} type="submit" className="myButtons"><span className="spansa"></span>Validate</button>
</div>
                    </div>
                    <div className="card-2" style={{marginTop:15}}>
                        <div className="content">
                            <div className='text-center' style={{marginTop:10}}>
                            <span className='fw-bold'>Didn't get the code?</span>
                            </div>
                            <br />
                            <ResendOTP onResendClick={()=>this.resend(Dataa)} renderButton={renderButton} renderTime={renderTime} maxTime={30} />
                              </div>
                    </div>
                </div>
            </div>
:
<PageNF />
        }
        </>
    )
}
}
const mapStateToProps = (state) => ({
})
export default connect(
    mapStateToProps,
    {}
)(ForgetOtp)