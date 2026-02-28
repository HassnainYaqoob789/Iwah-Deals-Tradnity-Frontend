import React from 'react'
import { hblsaveOrder} from '../../../actions/index';
import store from '../../../store';
 
const HBLPayPayment = () => {

    return (


    <button className="btn btn-success w-100 py-3 my-3 onlyBackColor" onClick={ async () => {
        document.querySelector(".loader-wrapper").style = "display: block";
       await store.dispatch(hblsaveOrder());}} type="submit">
                                             Pay With HBL PAY
                                             </button>
    )
  
}
export default HBLPayPayment;