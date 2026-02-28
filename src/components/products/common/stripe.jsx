import React, { useState } from 'react'
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import { saveOrder, stripeApi } from '../../../actions/index';
import Image from "../../../assets/images/profile.png"
import { encrypt_code, privateKey } from '../../../constants/Endpoints';
import store from '../../../store';
import { JSEncrypt } from "jsencrypt";


const StripePayment = (props) => {

    const [tokens,setTokens] = useState("")

    var CryptoJS = require("crypto-js");


        const decryptedData = localStorage.getItem("customerData") ? localStorage.getItem("customerData") : localStorage.getItem("guest_address") ;
        var bytes = localStorage.getItem("customerData") || localStorage.getItem("guest_address") ? CryptoJS.AES.decrypt(decryptedData, encrypt_code) : "";
        var getDate =localStorage.getItem("customerData") || localStorage.getItem("guest_address") ? bytes.toString(CryptoJS.enc.Utf8) : "";

       let email = localStorage.getItem("customerData") || localStorage.getItem("guest_address") ? JSON.parse(getDate) : "";


    let {price, appconfig,currencies} = props;

    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey(privateKey);
    var uncryptedStripeKey = (appconfig && appconfig?.stripe_key ) ? decrypt.decrypt(appconfig?.stripe_key) : "";

    
    let newPrice = price;


 const onToken = (token) => {
    store.dispatch(stripeApi({
        amount : newPrice,
        id : token.id,
        order_id : localStorage.getItem("OrderId"),
        email: localStorage.getItem("customerData") ? email.data.email : localStorage.getItem("guest_address") ? email.billing.email : "Email Not Found",
    }));

setTokens(token)
    

    toast.success("Please wait your payment is being processed!", {
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
 const closeM = () => {
   if(tokens === ""){

          
        toast.error("Your transaction has been declined. Please contact the support department.", {
       position: "top-right",
       autoClose: 3000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: false,
       draggable: true,
       progress: undefined,
       bodyClassName: 'toastStyle',
   });

   setTimeout(()=>{
       window.location.replace("/orderNumber")
       
       },3000)


   }
   
}
const openM = () => {
    
    store.dispatch(saveOrder());

   

}

const colorCodes = localStorage.getItem("color_theme");
    let parsedColorCodes = JSON.parse(colorCodes);
 
    return (
      <div style={{paddingTop:"10%"}}>
{uncryptedStripeKey && (uncryptedStripeKey !== "") ?

      <StripeCheckout
      name={parsedColorCodes && parsedColorCodes?.shop_name}
      description="Online Shop E-Store"
      image={Image}
      token={onToken}
      
      closed={closeM}
      opened={openM}
      email={localStorage.getItem("customerData") ? email.data.email : localStorage.getItem("guest_address") ? email.billing.email : "Email Not Found"}
      stripeKey={uncryptedStripeKey}
      >
      
      <button className="btn btn-success w-100 py-3 my-3 onlyBackColor"   type="submit">
    Pay it with card {currencies && currencies?.code} {newPrice}
    </button>
    </StripeCheckout>

    :

    <p>Sorry Stripe is not supported</p>
}


        </div>
    )
  
}


function mapStateToProps(state) {
	return {
		appconfig: (state?.user?.config) ? state?.user?.config : '',
		currencies: (state?.user?.currencies) ? state?.user?.currencies : '',
	}
}
export default connect(mapStateToProps)(StripePayment);
