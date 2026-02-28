import React, { useEffect, useState } from 'react'
import Heading from '../heading';
import * as EmailValidator from 'email-validator';
import { encrypt_code } from '../../../constants/Endpoints';
import { FacebookSignIn } from '../../../actions';
import store from '../../../store';
import CryptoJS from "crypto-js"

const Fbemail = () => {
    const [datao, setDatao] = useState("");
    const [emailia, setEmailia] = useState("");
  let validateEmail =  EmailValidator.validate(emailia);

useEffect(()=>{
    
    const decryptedData = localStorage.getItem("fud");
    if(decryptedData){
  var bytes = CryptoJS.AES.decrypt(decryptedData, encrypt_code);
  var getData = bytes.toString(CryptoJS.enc.Utf8);

  
  setDatao(JSON.parse(getData));

  
  
  
    }
},[datao])



if(datao.name) {
    var string = datao && datao.name;
       let hereS = string.split(" ");
       var stringArray = [];

       stringArray.push(hereS[0] , hereS.slice(1, hereS.length).join(" ")); 
    }
    
    const handleSubmit = () => {
        let datas  = {
            'first_name' : datao.name ? stringArray[0] : null,
            'last_name': datao.name ? stringArray[1] : null,
            'facebook_id': datao.userID ? datao.userID : null,
            'email': emailia,
            'is_social': '1'
         }
         store.dispatch(FacebookSignIn(datas));
      }

  return (
    <div>
         <section className="login-page section-b-space">
        <center>
          <div className="container">
          <div className='head50' />
            <div className="col-md-8 col-lg-5">
              <div className="theme-card" style={{borderRadius:15}}>
         <Heading name="Email" />
             
                <div className="theme-form" style={{marginTop:"40px"}} >
                  <div className="form-group">
                    <input type="text" className="form-control" id="email" placeholder="Enter Email..." name="email"
                      required="required" onChange={(e)=>setEmailia(e.target.value)} />
                  </div>
                  
                  <div className="form-group d-flex justify-content-center ">
                    <button onClick={()=>handleSubmit()} disabled={(validateEmail) ? false : true} type="submit" className="btn btn-solid px-5" style={{ borderRadius: 5 }}>Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </center>
      </section>
    </div>
  )
}

export default Fbemail