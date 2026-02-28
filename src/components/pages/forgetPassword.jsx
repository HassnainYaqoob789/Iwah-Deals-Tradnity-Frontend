import React, { Component } from 'react';
import { forgetotpsend } from '../../actions'
import store from '../../store';
import { connect } from 'react-redux'
import Heading from './heading';
import ScrollToTop from './scroll_to_top';
import validator from 'validator';
import { encrypt_code } from '../../constants/Endpoints';

class ForgetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "email": '',
        }
    }
    sendOtp = () => {
        let emailsa = { "email": this.state.email }
        

        store.dispatch(forgetotpsend(emailsa));
    }
    render() {
        return (
            <div>
                <ScrollToTop />
                <section className="pwd-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3">
                                <div className='head50' />
                                <Heading name="Forgot Password?" />
                                <form className="theme-form">
                                    <div className="form-row" >
                                        <div className="col-md-12">


                                            <input type="text" className="modifierI fw-normal" style={{maxWidth:"800px", textAlign:"start",backgroundColor:"#fff", width:"100%"}} id="email"
                                                placeholder="Enter Your Email" required onChange={(e) => this.setState({ email: e.target.value })} />



                                        </div>
<div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100vw", marginTop:"15px"}}>

                                        <button disabled={(this.state.email !== '') ? false : true} style={(validator.isEmail(this.state.email)) ? {
                                            pointerEvents: "auto",
                                            cursor: "pointer"
                                        } : {
                                            pointerEvents: "none",
                                            cursor: "default"
                                        }} onClick={() => this.sendOtp()} className="myButtons"><span className="spansa"></span>Submit</button>
                                        </div>









                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default ForgetPassword;