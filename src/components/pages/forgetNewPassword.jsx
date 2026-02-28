import React, { Component } from 'react';
import { forgetNewPassword } from '../../actions'
import 'react-toastify/dist/ReactToastify.css';
import store from '../../store';
import { toast } from 'react-toastify';
import ScrollToTop from './scroll_to_top';
import { encrypt_code } from '../../constants/Endpoints';
import PageNF from './PageNF';

class NewForgetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "newPassword": '',
            "confirmPassword": '',
        }
    }
    submitPassword = (e) => {
        if (this.state.confirmPassword === this.state.newPassword) {
            var password = { "email": e, "password": this.state.confirmPassword }
            store.dispatch(forgetNewPassword(password));
        } else {
            toast.error("Password Not Match");
        }
    }
    render() {

        
        var CryptoJS = require("crypto-js");

        const decryptedData = localStorage.getItem("ForgetPasswordUser") ? localStorage.getItem("ForgetPasswordUser") : localStorage.getItem("RegisterUser");
        var bytes = decryptedData ? CryptoJS.AES.decrypt(decryptedData, encrypt_code) : null;
        var getData = decryptedData ? bytes.toString(CryptoJS.enc.Utf8) : null;
    
        let Dataa = localStorage.getItem("ForgetPasswordUser") ?  JSON.parse(getData)?.email : JSON.parse(getData) ;
    
    

        return (
            <div>
                <ScrollToTop />

                {
                    decryptedData ?
                
                <section className="register-page section-b-space">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4" />
                            <div className="col-lg-4" >
                                <h2 className='py-3' style={{ fontWeight: 700 }}>New Password</h2>
                                <div className="theme-card" style={{ boxShadow: "rgb(0 0 0 / 19%) 0px 10px 20px", border: "1px solid rgba(0,0,0,0.05)" }}>
                                    <div className="theme-form" >
                                        <div className="form-row" >
                                            <div className="col-md-12">
                                                <div className='mx-3'>
                                                    <label htmlFor="New Password">New Password</label>
                                                    <input type="password" className="form-control" id="New Password"
                                                        placeholder="New Password" required="required" name="New Password" onChange={(e) => this.setState({ newPassword: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className='mx-3'>
                                                    <label htmlFor="Confirm Password">Confirm Password</label>
                                                    <input type="password" className="form-control" id="Confirm Password" onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                                                        placeholder="Confirm Password" required="required" name="Confirm Password" />
                                                </div>
                                            </div>
                                            <div className='text-center col-md-12'>
                                                <button type="submit" className="btn btn-solid" onClick={(e) => this.submitPassword(Dataa)} style={{ borderRadius: 5 }}>Change Password</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

:
<PageNF />
                }
            </div>
        )
    }
}

export default NewForgetPassword;
