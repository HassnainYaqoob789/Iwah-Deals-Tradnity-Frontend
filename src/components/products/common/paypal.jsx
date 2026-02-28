import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react'
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { paypalApi, saveOrder } from '../../../actions';
import { encrypt_code, privateKey } from '../../../constants/Endpoints';
import store from '../../../store';
import { JSEncrypt } from "jsencrypt";


function PaypalMethod(props) {
let {appconfig} = props;
    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey(privateKey);
    var uncryptedPaypalKey = (appconfig && appconfig?.paypal_key ) ? decrypt.decrypt(appconfig?.paypal_key) : "";



    let CryptoJS = require("crypto-js")
    const decryptedData = localStorage.getItem("PaymentMethod");
    var bytes = CryptoJS.AES.decrypt(decryptedData, encrypt_code);
    var getDate = bytes.toString(CryptoJS.enc.Utf8);

   let datas = getDate.substring(1, (getDate.length - 1))

   const decryptedDatai = localStorage.getItem("customerData") ? localStorage.getItem("customerData") : localStorage.getItem("guest_address") ;
   var bytess = localStorage.getItem("customerData") || localStorage.getItem("guest_address") ? CryptoJS.AES.decrypt(decryptedDatai, encrypt_code) : "";
   var getDatesia = localStorage.getItem("customerData") || localStorage.getItem("guest_address") ? bytess.toString(CryptoJS.enc.Utf8) : "";

  let email = localStorage.getItem("customerData") || localStorage.getItem("guest_address") ? JSON.parse(getDatesia) : "";






	return (
        <div>
{
    uncryptedPaypalKey && (uncryptedPaypalKey !== "") ?
    <PayPalScriptProvider options={{"client-id" : uncryptedPaypalKey}}>
        <PayPalButtons
        fundingSource="paypal"
        createOrder={(data, actions)=>{
            
            
            store.dispatch(saveOrder());
            
            return actions.order.create({
                purchase_units: [
                    {
                        amount:{
                            value: props.price,
                        }
                    }
                ]
            })
        }}
        onCancel={(data,actions) =>{
            
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
        }}
        onApprove={(data,actions)=>{
            return actions.order.capture().then(function(details){
            
                store.dispatch(paypalApi({
                    type : data.paymentSource,
                    transaction_id  : data.orderID,
                    payment_method  : datas,
                    email: localStorage.getItem("customerData") ? email.data.email : localStorage.getItem("guest_address") ? email.billing.email : "Email Not Found",
                    data:{
                        id: details.id,
                        country: details.payer.address.country_code,
                        email: localStorage.getItem("customerData") ? email.data.email : localStorage.getItem("guest_address") ? email.billing.email : "Email Not Found",
                        name: details.payer.name.given_name + " " + details.payer.name.surname,
                        payerId : details.payer.payer_id,
                        status: details.status,
                        amount: props.price,
                        type: data.paymentSource
                    },
                    order_id : localStorage.getItem("OrderId"),
                }));
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
                
                setTimeout(()=>{
                    window.location.replace("/orderNumber")
                    
                },2000)
                
            })
        }}
        
        />
        <PayPalButtons
        fundingSource="card"
        createOrder={(data, actions)=>{
            store.dispatch(saveOrder());
            return actions.order.create({
                purchase_units: [
                    {
                        amount:{
                            value: props.price,
                        }
                    }
                ]
            })
        }}
        onCancel={(data,actions) =>{
            
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
    }}
    onApprove={(data,actions)=>{
        return actions.order.capture().then(function(details){
            
            store.dispatch(paypalApi({
                type : data.paymentSource,
                transaction_id  : data.orderID,
                payment_method  : datas,
                email: localStorage.getItem("customerData") ? email.data.email : localStorage.getItem("guest_address") ? email.billing.email : "Email Not Found",
                data:{
                    id: details.id,
                    country: details.payer.address.country_code,
                    email: localStorage.getItem("customerData") ? email.data.email : localStorage.getItem("guest_address") ? email.billing.email : "Email Not Found",
                    name: details.payer.name.given_name + " " + details.payer.name.surname,
                    payerId : details.payer.payer_id,
                    status: details.status,
                    amount: props.price,
                    type: data.paymentSource
                },
                order_id : localStorage.getItem("OrderId"),
            }
            )
            );
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
                setTimeout(()=>{
                    window.location.replace("/orderNumber")
                    
                },2000)
            })
        }}
        />
    </PayPalScriptProvider> 
:
<p>Sorry Paypal is not supported</p>

}
</div>
	);
}

function mapStateToProps(state) {
    return {
        appconfig: (state?.user?.config) ? state?.user?.config : '',
	}
}
export default connect(mapStateToProps)(PaypalMethod);
