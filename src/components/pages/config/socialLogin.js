import React from 'react'
import { getAuth, GoogleAuthProvider,signInWithPopup   } from "firebase/auth";
import store from '../../../store';
import { GoogleSignIn, FacebookSignIn, getAppConfig } from '../../../actions';
import ReactFacebookLogin from 'react-facebook-login';
import {FaFacebookF} from "react-icons/fa";
import "./socialLogin.css"
import CryptoJS from 'crypto-js';
import { encrypt_code, privateKey } from '../../../constants/Endpoints';
import { initializeApp } from 'firebase/app';
import { connect } from 'react-redux';
import { JSEncrypt } from "jsencrypt";


const SocialLoginG = ({appconfig}) => {
  store.dispatch(getAppConfig());

  const colorCodes = localStorage.getItem("color_theme");
  let parsedColorCodes = JSON.parse(colorCodes);



  var decrypt = new JSEncrypt();
  decrypt.setPrivateKey(privateKey);

  
  var uncryptedFirebaseKey = parsedColorCodes ? String(decrypt.decrypt(parsedColorCodes?.firebase)) : (appconfig && appconfig?.firebase ) ? String(decrypt.decrypt(appconfig?.firebase)) : "";
  var objme;
  eval('objme =' + uncryptedFirebaseKey);

  const firebaseConfig = (uncryptedFirebaseKey) && (uncryptedFirebaseKey !== "") && (typeof(objme) === "object") ? objme : null;
  initializeApp(firebaseConfig);
  
const provider = new GoogleAuthProvider();


const auth = getAuth();



const GoogleLogin = () =>{


    signInWithPopup(auth, provider)
    
    .then((result) => {
      document.querySelector(".loader-wrapper").style = "display: block";
    let datas  = {
        'name' : result && result.user.displayName,
        'email': result && result.user.email,
        'is_social': '1'
    }
    store.dispatch(GoogleSignIn(datas));

}).catch((error) => {
    console.error(error);
    document.querySelector(".loader-wrapper").style = "display: none";
});


}



const FacebookLogin = (data) =>{
  
      if(data.name) {
        var string = data && data.name;
           let hereS = string.split(" ");
           var stringArray = [];
        
           stringArray.push(hereS[0] , hereS.slice(1, hereS.length).join(" ")); 
 
        }


if(data.name) {

  document.querySelector(".loader-wrapper").style = "display: block";
 let datas  = {
          'first_name' : data.name ? stringArray[0] : null,
          'last_name': data.name ? stringArray[1] : null,
          'facebook_id': data.userID ? data.userID : null,
          'email': data.email ? data.email : null,
          'is_social': '1'
       }

       var encrypt_reg = CryptoJS.AES.encrypt(JSON.stringify(data), encrypt_code).toString();
    localStorage.setItem('fud', encrypt_reg);

       store.dispatch(FacebookSignIn(datas));
      }
}


const componentClicked = (resp) =>{
}



    return (
      <div>
       { (uncryptedFirebaseKey) && (uncryptedFirebaseKey !== "") && (typeof(objme) === "object") ?
<>
        	<div style={{margin:"0px 40px"}}>

          
          	<div className="or"></div>
</div>
          <button className='my-google-button-class m-2' onClick={()=>GoogleLogin()}>

          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="23" height="23" 
viewBox="0 0 48 48"
style={{fill:"#000000", marginRight:8}}><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
           Login with Google
             </button>
        
     <ReactFacebookLogin
    appId="469001825039946"
    autoLoad={false}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={FacebookLogin}
    cssClass="my-facebook-button-class m-2"
    icon={<FaFacebookF style={{marginRight:7}} size={20} />}

     />
            
     


            </>
 : null }

            </div>
            
    )
  }

 
  function mapStateToProps(state) {
	return {
		appconfig: (state?.user?.config) ? state?.user?.config : '',
	}
}
export default connect(mapStateToProps)(SocialLoginG);
