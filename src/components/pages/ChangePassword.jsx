import { Visibility, VisibilityOff } from '@mui/icons-material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ChangePassword } from '../../actions';
import store from '../../store';
import Heading from './heading';
import * as url from '../../constants/Endpoints'
import HeadSEO from '../layouts/tradnity/headSEO';


const ChangePasswordP = () => {
    const [previousPassword, setPreviousPassword] = useState('');
    const [showPreviousPassword, setShowPreviousPassword] = useState(false);

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);


    const SubmitForm = () =>{
      
        var CryptoJS = require("crypto-js");
        const decryptedData = localStorage.getItem("customerData");
        var bytes = CryptoJS.AES.decrypt(decryptedData, url.encrypt_code);
        var getData = bytes.toString(CryptoJS.enc.Utf8);
        if (getData !== null) {
            const Data = JSON.parse(getData);
            const email = (Data != null) ? Data.data.email : '';
            if (password === newPassword) {
                const obj = {
                    "old_password": previousPassword,
                    "password": newPassword,
                    "email": email,
                }
                store.dispatch(ChangePassword(obj));
            } else {
                toast.error('Password Not Match', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    bodyClassName: 'toastStyle',
                });
            }
        }



    }
  return (
    <>
          <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>




              <HeadSEO title="Change Password" />

   
<section className="text-center margini">
<div className="form-container">
  <div className="section-header">

    <Heading name='Change Password' />
    <h2 className="secondary-heading">
      Don't want to change? <Link to={`${process.env.PUBLIC_URL}/dashboard`} className="login-link">Go to Dashboard!</Link>
    </h2>
  </div>
  <form className="form my-4" onSubmit={(e)=>e.preventDefault()}>
    <div className="form-input">
      

      <div style={{ display:"flex"}}>

<input type={showPreviousPassword ? "text" : "password"} onChange={(e)=>setPreviousPassword(e.target.value)} style={{borderRadius:"6px 0px 0px 6px", width:"100%"}} className="modifierI fw-normal" name="passwordP" id="passwordP" placeholder="Enter Your Current Password" />
<div className="stylesa">

{
showPreviousPassword ?
<VisibilityOff onClick={()=>setShowPreviousPassword(!showPreviousPassword)} style={{fontSize:20}} />
:
<Visibility onClick={()=>setShowPreviousPassword(!showPreviousPassword)} style={{fontSize:20}} />
}

</div> 
</div>  
      <div style={{ display:"flex"}}>

<input type={showPassword ? "text" : "password"} onChange={(e)=>setPassword(e.target.value)} style={{borderRadius:"6px 0px 0px 6px", width:"100%"}} className="modifierI fw-normal" name="passwordN" id="passwordN" placeholder="Enter Your New Password" />
<div className="stylesa">

{
showPassword ?
<VisibilityOff onClick={()=>setShowPassword(!showPassword)} style={{fontSize:20}} />
:
<Visibility onClick={()=>setShowPassword(!showPassword)} style={{fontSize:20}} />
}

</div> 
</div>  
      <div style={{ display:"flex"}}>

<input type={showNewPassword ? "text" : "password"} onChange={(e)=>setNewPassword(e.target.value)} style={{borderRadius:"6px 0px 0px 6px", width:"100%"}} className="modifierI fw-normal" name="passwordCF" id="passwordCF" placeholder="Confirm Your New Password" />
<div className="stylesa">

{
showNewPassword ?
<VisibilityOff onClick={()=>setShowNewPassword(!showNewPassword)} style={{fontSize:20}} />
:
<Visibility onClick={()=>setShowNewPassword(!showNewPassword)} style={{fontSize:20}} />
}

</div> 
</div>  

      <div className="btn-input my-3">
      

      <button disabled={((password)  && (password.length !== 0 ) ) ? false : true} onClick={()=>SubmitForm()} style={{width:230, height:50}} type="submit" className="myButtons"><span className="spansa"></span>Change Password</button>
      </div>
     
    </div>
  </form>


</div>

  

</section>




  </div>
    </>
  )
}

export default ChangePasswordP
