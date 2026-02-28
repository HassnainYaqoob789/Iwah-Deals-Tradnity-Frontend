import "./../pages/viewDetails.css";

import { connect } from 'react-redux'
import React, {Component} from 'react';
import Heading from "./heading";
import { getOrders, LeopardTracking, postReturn } from "../../actions";
import store from "../../store";
import ScrollToTop from "./scroll_to_top";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import Placeholder from "../../svg_code/placeholder";
import HeadSEO from "../layouts/tradnity/headSEO";




class ViewDetails extends Component {
    constructor () {
        super ()

        this.state = {
          "myState":'initialState',
          'current':'detail',
          'active':true,
          'reason':''
        }
       
    }

returnsubmit = async (e) =>{
    // document.querySelector(".loader-wrapper").style = "display: block";

        var order_id = e
        var product = [];
        var qty = [];

        let itemHO = this.props.location.state?.data?.items;

        (itemHO.length !== 0) &&itemHO.map(d =>(
            product.push(d.product.id)
            ))

        product.map(id =>(
        qty.push(document.querySelector(`#qty${id}`).value)
        ));
        
        
        const removeItemAll = () => {
            let i = 0;
            while (i < qty.length) {
              if (qty[i] === 'Select') {
                qty.splice(i, 1);
                product.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
          await removeItemAll();



          let obj ={
              order_no : order_id,
              product_id : JSON.stringify(product),
              qty : JSON.stringify(qty),
              reason: this.state.reason
          }




        store.dispatch(postReturn(obj));
    }
  componentDidMount() {
            document.querySelector('body').scrollTo(0,0)
            store.dispatch(getOrders());


    }
    
    render (){
        let {currencies, appconfigs} = this.props;
       let getorders = this.props && this.props.location && this.props.location.state && this.props.location.state.data;



       const colorCodes = localStorage.getItem("color_theme");
       let parsedColorCodes = JSON.parse(colorCodes);
       let appconfig = parsedColorCodes && (parsedColorCodes !== null) ? parsedColorCodes : appconfigs


  return (
  <>  
     <HeadSEO title="Order Details" />

  <ScrollToTop />



{
getorders 
?

<div style={{marginTop:"8%"}}>
<Heading name="Order Details" />

<div className="cardis">
    <div className="row px-4" style={{display:'flex', justifyContent:"space-between"}}>

            <div className="title col-sm-4 fw-bold">Order No. #{(getorders)?getorders.id : null} </div>
            <div className="title col-sm-7 text-end text-capitalize">Order Status : {(getorders)?getorders.status:''}</div>
    </div>
            <div className="info">
                <div className="row">
                    <div className="col-md-8 py-1">
                        <span className=" fw-bold" id="heading">Name:</span><br />
                        <span id="details">{(getorders)? (getorders?.customer_first_name + ' ' + getorders?.customer_last_name):null}</span>
                    </div>
                    <div className="col-md-4 py-1 pull-right">
                        <span className=" fw-bold" id="heading">Phone No:</span><br />
                        <span id="details">{((getorders)?getorders.customer:'')?getorders.customer.phone:''}</span>
                    </div>
                </div>    
                <div className="row">
                    <div className="col-md-8 py-1">
                        <span className=" fw-bold" id="heading">Email:</span><br />
                        <span id="details">{getorders.customer_email}</span>
                    </div>
                    <div className="col-md-4 py-1 pull-right">
                        <span className=" fw-bold" id="heading">Postal Code:</span><br />
                        <span id="details">{(getorders.shipping_address)?getorders.shipping_address.postcode:''}</span>

                    </div>
                </div>    
                <div className="row">
                    <div className="col-md-12 py-1">
                        <span className=" fw-bold" id="heading">Address:</span><br />
                        <span id="details">{getorders.shipping_address? getorders.shipping_address.address1[0] : ""} {(getorders.shipping_address)? getorders.shipping_address.city  + ', ' +  getorders.shipping_address.state + ', ' + getorders.shipping_address.country: null}</span>
                    </div>
                   
                </div>    












            </div>      
            <div className="pricing" style={{borderCollapse:"collapse"}}>

                    {(this.state.current === 'detail')?

                            (getorders) &&

                            (getorders?.items) &&
                            getorders.items.map((item_data,key) =>{

                return(
                <div className="row py-3 my-2" style={{border: '1px solid rgba(0,0,0,0.08)'}} key={key}>
                 <div className="col-md-3" style={{
                            display: 'flex',flexDirection: 'column', alignContent: 'center',justifyContent: 'center',alignItems: "center"
                    }}>

{
    (item_data?.product?.images.length !== 0 && item_data.product?.images[0].url ) ?
    <LazyLoadImage style={{width:'80px'}} src={(item_data?.product?.images.length !== 0 && item_data.product?.images[0].url )} alt="PI"  />
    :
    <span style={{width:'80px', height:'80px'}}>
    <Placeholder />
     </span>

}

                 </div>
                    <div className="col-md-6" style={{
                            display: 'flex',flexDirection: 'column', alignContent: 'center',justifyContent: 'center',
                    }}>
                        <span id="name" className="text-capitalize fw-bold">{item_data?.name}</span>  
                        <br />
                        <span id="price"><b>Quantity: {item_data?.qty_ordered} </b>
                            {(item_data.qty_refunded !== 0)?
                         <>
                         <br /><span className="base_color fw-bold">
                           {item_data?.qty_refunded} <b> Refunded</b></span>
                         </>   : null }
                        </span>
                    </div>

                  
                    <div className="col-md-3" style={{
                            display: 'flex',flexDirection: 'column', alignContent: 'center',justifyContent: 'center',alignItems: "center"
                    }}>
                    <span id="price"><b>{item_data?.formated_price}</b></span> 
                    </div>

                </div>)
             
            })
            : null
        }


{
    (this.state.current === 'return') ?
    
    (getorders.items) && getorders.items.map((item_data,key) =>
    {
        return(

        <div className="row py-3" key={key} style={{border: '1px solid rgba(0,0,0,0.08)'}}>
<div className="col-md-3" style={{
                            display: 'flex',flexDirection: 'column', alignContent: 'center',justifyContent: 'center',alignItems: "center"
                    }}>     
                    
                    {(item_data?.product.images.length !== 0 && item_data?.product?.images[0]?.url) ?

<LazyLoadImage src={(item_data?.product.images.length !== 0 && item_data?.product?.images[0]?.url)} alt="PI"  />
    :
    <span style={{width:'80px', height:'80px'}}>
        <Placeholder />
    </span>
    }
        </div>
           <div className="col-md-7" style={{
                            display: 'flex',flexDirection: 'column', alignContent: 'center',justifyContent: 'center',
                    }}>
               <span id="name" className="text-capitalize fw-bold">{item_data?.name}</span>  
       <br />
               <span id="price" style={{display:"flex", alignItems:"center"}}><b>Quantity: </b><select style={{width:80}} className="py-1 px-1 mx-2 form-fields" name={`qty${item_data.product.id}`} id={`qty${item_data.product.id}`}>
               <option value='Select'>Select</option>
                       {[...Array.from(Array(item_data.qty_ordered).keys())].map((num, i) => <option value={num+1} key={i}>{num+1}</option>)}
                       </select>               </span>
           </div>
           <div className="col-md-2" style={{
                            display: 'flex',flexDirection: 'column', alignContent: 'center',justifyContent: 'center',alignItems: "center"
                    }}>
           <span id="price">{item_data?.formated_price}</span> 
           </div>

       </div>

    )}) : null

}

            </div>
           





           <div className="info">

            
           <div className="row g-0 border-collapse border my-2">
                             <div className="col-md-6">
                                 <div className="p-3 d-flex justify-content-center align-items-center fw-bold"> <span>Payment Method</span> </div>
                             </div>
                             <div className="col-md-6">
                                 <div className="p-3 d-flex justify-content-center align-items-center"> <span>
                                     {(getorders)?getorders.payment_title:''}</span> </div>
                             </div>
                         </div>
                         <div className="row g-0  border-collapse border my-2">
                             <div className="col-md-6">
                                 <div className="p-3 d-flex justify-content-center align-items-center fw-bold"> <span>Subtotal</span> </div>
                             </div>
                             <div className="col-md-6">
                                 <div className="p-3 d-flex justify-content-center align-items-center"> <span>
                                     {/* {getorders.sub_total} */}
                                     {(getorders)?getorders.formated_sub_total:""}
                                     </span> </div>
                             </div>
                         </div>
                         <div className="row g-0  border-collapse border my-2">
                             <div className="col-md-6">
                                 <div className="p-3 d-flex justify-content-center align-items-center fw-bold"> <span>Shipping fees</span> </div>
                             </div>
                             <div className="col-md-6">
                                 <div className="p-3 d-flex justify-content-center align-items-center"> <span>
                                     {(getorders)?getorders.formated_shipping_amount:''}
                                     </span> </div>
                             </div>
                         </div>
                         <div className="row g-0  border-collapse border my-2">
                             <div className="col-md-6">
                                 <div className="p-3 d-flex justify-content-center align-items-center"> <span className="font-weight-bold">Total</span> </div>
                             </div>
                             <div className="col-md-6">
                                 <div className="p-3 d-flex justify-content-center align-items-center"> <span className="font-weight-bold">
                                     {(getorders)?getorders.formated_grand_total:''}
                                     </span> </div>
                             </div>
                         </div>

                   { getorders && getorders.shipments && (getorders.shipments.length !== 0) && (getorders.status !== 'canceled') ?

                        <div className="row g-0  border-collapse border my-2">
                            <div className="col-md-6">
                                <div className="p-3 d-flex justify-content-center align-items-center"> <span className="font-weight-bold">Track Order</span> </div>
                            </div>
                            <div className="col-md-6">
                            <div className="d-flex justify-content-center align-items-center"> <span className="font-weight-bold">
                                    <Link onClick={()=> store.dispatch(LeopardTracking({'order_id': getorders.id}))} to={{pathname:"/trackOrder",  state:{trackData:getorders.shipments, orderID : (getorders) ? getorders.id : null}}}>
                                    <button style={{borderRadius:4}}  className="btn btn-success px-3 py-2 my-2">Track Order</button>
                                    </Link>
                                
                                    </span> </div>
                            </div>
                        </div>
                     : null   
                    }

                        {getorders?.formated_grand_total_refunded && (getorders?.formated_grand_total_refunded !== `${currencies.code} 0.00`)
                        ?
                         <div className="row g-0  border-collapse border my-2" >
                         <div className="col-md-6">
                             <div className="p-3 d-flex justify-content-center align-items-center"> <span className="font-weight-bold">Refund</span> </div>
                         </div>
                         <div className="col-md-6">
                             <div className="p-3 d-flex justify-content-center align-items-center"> <span className="font-weight-bold">
                                 {getorders.formated_grand_total_refunded}
                                 </span> </div>
                         </div>
                     </div>
                     :
                     ''
                        }
                       
                        

                      {(getorders.status === 'completed')?
                      <>
                        {(this.state.current === 'detail')?
                        <div className="row g-0">
                            <div className="col-md-6">
                            </div>
                            <div className="col-md-6">
                                <div className="p-3 d-flex justify-content-center align-items-center"> <span className="font-weight-bold">
                                    <button  className="btn btn-danger px-3 py-2 my-2" style={{borderRadius:4}} onClick={()=>this.setState({current:'return'})} >Return </button>
                                
                                    </span> </div>
                            </div>
                        </div>
: <>
                        
                        <div className="col-md-12">
                            <div className=" d-flex justify-content-center align-items-center">
                                <textarea name="reason" className="modifierI m-4" id="reason" cols="80" rows="4" required onChange={(e)=>this.setState({reason:e.target.value})} placeholder="Enter Your Reason">

                                </textarea>
                                 </div>
                        </div>

            <div className="col-md-12">
                <div className="p-3 d-flex justify-content-center align-items-center"> <span className="font-weight-bold">
                <div className="row">
                                    <div className="col-lg-8">
                                    <button  className="btn btn-solid" onClick={()=>this.returnsubmit(getorders.id) } >Return Submit </button>
                                    </div>
                                    <div className="col-lg-4">
                                    <button  className="btn btn-solid"  onClick={()=>this.setState({current:'detail',active:false})} >Cancel </button>
                                    </div>

                                </div>
    
        </span> 
        </div>
</div>
</>
            

                            }
                      </>
                    :''
                    }

                      


                </div>
                <div> 



           </div>
          

           

           {appconfig && appconfig?.nav_contact && (appconfig.nav_contact === 1)
											?

            <div className="footer text-center my-3" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <div style={{fontSize:13,}} className="text-center">Want any help? Please <Link to="/contact">Contact Us</Link></div>

            </div>
            :null}
        </div>


</div>



: 
<h4>No Data Found</h4>
}





</>
  )
}
}
const mapStateToProps = (state) => ({
    getorders:(state && state.orders && state.orders.order_detail && state.orders.order_detail.data)? state.orders.order_detail.data:'',
    currencies: (state?.user?.currencies) ? state?.user?.currencies : '',
    appconfigs: (state?.user?.config) ? state?.user?.config : '',

})
export default connect(
    mapStateToProps,
    {}
)(ViewDetails)