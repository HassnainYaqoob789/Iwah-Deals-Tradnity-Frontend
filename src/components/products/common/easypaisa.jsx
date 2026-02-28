import React from 'react'
import { easypaisasaveOrder } from '../../../actions/index';
import store from '../../../store';

const EasyPaisa = () => {

    return (


        <button className="btn btn-success w-100 py-3 my-3 onlyBackColor" onClick={async () => {
            document.querySelector(".loader-wrapper").style = "display: block";
            await store.dispatch(easypaisasaveOrder());
        }} type="submit">
            Pay With Easypaisa
        </button>
    )

}
export default EasyPaisa;