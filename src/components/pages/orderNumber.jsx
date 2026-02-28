import React from 'react'
import EmptySearch from '../../svg_code/emptySearch';
import "./orderNumber.css";
import OrderNumberS from './orderNumberS';
import ScrollToTop from './scroll_to_top';


const OrderNumber = () => {
  const OrderDetail = JSON.parse(localStorage.getItem("Order-number"));
  return (
    <center>
      <ScrollToTop />
      {
        OrderDetail ?

        <OrderNumberS name={OrderDetail && OrderDetail?.customer_first_name + " " + OrderDetail?.customer_last_name} 
        orderId={OrderDetail && OrderDetail?.id} createdAt={OrderDetail && OrderDetail?.created_at} />
    
      :
      
      <div className="text-center" style={{marginTop:"20vh"}}>

<EmptySearch />
                                            <br />

                                            <span className='fs-5 my-3'>No Recent Order Found!</span>
                                        </div>

      }
    </center>
  )
}
export default OrderNumber