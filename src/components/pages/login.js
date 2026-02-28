import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import Heading from './heading';
import store from '../../store';
import { custSignIn } from '../../actions';
import loadable from '@loadable/component'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import HeadSEO from '../layouts/tradnity/headSEO';
const SocialLoginG = loadable(() => import('./config/socialLogin'));

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}
function signForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  const check_login = localStorage.getItem("customerData");
  useEffect(() => {
    if (check_login) {
      props.history.push(`${process.env.PUBLIC_URL}/`); 
    }
  }, [props.user]);
  useEffect(() => {
    document.querySelector('body').scrollTo(0, 0)
  }, [])
  const [formData, setFormData] = useReducer(formReducer, {});
  const handleSubmit = async event => {
    event.preventDefault();
    store.dispatch(custSignIn(formData));
  }
  const handleChange = event => {
    setFormData({
      name: "Token",
      value: '',
    });
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

      <HeadSEO title="Login" />





      <section className="marginia text-center">
        <div className="form-container">
          <div className="section-header">
            <h1 className="primary-heading">
              Login
            </h1>
            <h2 className="secondary-heading">
              New Here? <Link to={`${process.env.PUBLIC_URL}/register`} className="login-link">Register Now!</Link>
            </h2>
          </div>
          <form className="form my-4" >
            <div className="form-input">




              <input type="email" autoComplete={false} className="modifierI fw-normal" required={true} name="email" onChange={handleChange} id="email" placeholder="Enter Your Email" />






              <div style={{ display: "flex" }}>

                <input autoComplete={false} type={showPassword ? "text" : "password"} required={true} onChange={handleChange} style={{ borderRadius: "6px 0px 0px 6px", width: "100%" }} className="modifierI fw-normal" name="password" id="password" placeholder="Enter Your Password" />
                <div className="stylesa">

                  {
                    showPassword ?
                      <VisibilityOff onClick={() => setShowPassword(!showPassword)} style={{ fontSize: 20 }} />
                      :
                      <Visibility onClick={() => setShowPassword(!showPassword)} style={{ fontSize: 20 }} />
                  }

                </div>
              </div>

              <div className="btn-input my-3">


                <button disabled={((formData.email && formData.password) && (formData.email.length !== 0 && formData.password.length !== 0)) ? false : true} onClick={handleSubmit} type="submit" className="myButtons"><span className="spansa"></span>Login</button>
                <br />
                <Link to={`${process.env.PUBLIC_URL}/forgetPassword`}> <p className="social-text my-3 onlyColor" style={{ fontSize: 15, fontWeight: 600 }}>Forgot Password?</p></Link>
              </div>

            </div>
          </form>


        </div>

        {/* <SocialLoginG /> */}


      </section>




    </div>
  )
}

export default signForm;
