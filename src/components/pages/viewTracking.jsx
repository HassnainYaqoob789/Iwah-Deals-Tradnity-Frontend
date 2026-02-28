import React from 'react';
import { Link } from 'react-router-dom';
import "./viewDetails.css"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Heading from './heading';
import Placeholder from '../../svg_code/placeholder';
import { LeopardTracking } from '../../actions';
import store from '../../store';
const ViewTracking = (props) => {
const trackData = props && props.location && props.location.state && props.location.state.trackData && props.location.state.trackData.length !== 0 ? props.location.state.trackData : [];
const OrderTrack = props && props.location && props.location.state && props.location.state?.orderDetailsTrack ? props?.location?.state?.orderDetailsTrack : null;
const OrderId = props && props.location && props.location.state && props.location.state.orderID ? props.location.state.orderID : null;
// store.dispatch(LeopardTracking({order_id:800}));



return (
    <div className="row my-5" >
        <div className='head50' />

        <Heading name="Track Order" />
{
    trackData && trackData.length !== 0 ?
    <article className="cardis" style={{maxWidth:"600px"}}>
            <h6 className='fw-bold py-5 text-dark' style={{fontSize:26, textAlign:"center"}}>Order ID: <span className='fw-bold'>#{OrderId}</span> </h6>

{
    trackData.length !== 0 && trackData.map((e,i)=>{
        
        return(

            <div className="card-body" style={{  paddingLeft: '1.25rem',paddingBottom: '1.25rem',paddingRight: '1.25rem', paddingTop:0}} key={i}>
                <div className="card-body row">
                    <div className="col-md-6 py-2"> <strong>Shipping By: </strong>
                    {e.carrier_title}</div>
                    <div className="col-md-6 py-2"> <strong>Tracking ID: </strong>{e.track_number} </div>
              

                {
  OrderTrack && (OrderTrack !== null) && OrderTrack?.TrackDetailReply && OrderTrack?.TrackDetailReply?.TrackInfo &&  (OrderTrack?.TrackDetailReply?.TrackInfo.length !== 0) ?
  OrderTrack?.TrackDetailReply?.TrackInfo.map((e,i)=>{
return(
<>
                    {e?.consignmentNo ? <div className="col-md-6 py-2"> <strong>Consignment No: </strong>{e?.consignmentNo} </div> : null}
                   {e?.consignee ? <div className="col-md-6 py-2"> <strong>Consignee: </strong>{e?.consignee} </div> : null}
                   {e?.shipper ? <div className="col-md-6 py-2"> <strong>Shipper: </strong>{e?.shipper} </div> : null}
                    {e?.bookingDate ? <div className="col-md-6 py-2"> <strong>Booking Date: </strong>
                    {e?.bookingDate}</div> : null}
                    {e?.origin ?<div className="col-md-6 py-2"> <strong>Origin: </strong>{e?.origin} </div> : null}
                    {e?.destination ? <div className="col-md-6 py-2"> <strong>Destination: </strong>{e?.destination} </div> : null}
</>
                    )
                  })
                  
                  :
                  null
}
                  </div>










            <ul className="row py-5">
            <h4 className='py-1 fw-bold text-dark'>Items:</h4>
                {
                    e.items && e.items.length !== 0 ? e.items.map((item,key)=>{
                     
                        return(
                            <li className="col-md-12"  key={key}>
                            <figure className="itemside mb-3 row mx-3" style={{border:'1px solid rgba(0,0,0,0.1)', borderRadius:8}}>
                                <div className="col-md-3 text-center" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                   {
                                    (item?.images && (item.images.length !== 0) && item?.images[0]) ?
                                    <div>

                        <LazyLoadImage style={{width:'40px',}} src={item?.images && (item.images.length !== 0) && item?.images[0]} className="img-sm" />
                                    </div>
:
<div style={{width:'40px'}}>
                                        <Placeholder />
                                    </div>
                                    }
                        </div>
                                <figcaption className="info text-center col-md-9" style={{flexDirection:"column",
                            display: 'flex', alignItems: 'center',justifyContent: 'center', padding:10
                    }}>
                                    <p className="fw-bold py-2 trackPColor" >{item.name}</p> <p className="fw-bold text-muted">{item.formated_total} </p>
                                </figcaption>
                            </figure>
                        </li>
                        ) 
                    })
                    :
                     <h3>No Items Found</h3>
                }
          






















            </ul>




                                        <h4 className='py-1 fw-bold text-dark'>Order Tracking:</h4>

{OrderTrack && (OrderTrack !== null) ?


   
    <div class="row contentss">
      <div class="timeline">


      {
  OrderTrack && (OrderTrack !== null) && OrderTrack?.TrackDetailReply && OrderTrack?.TrackDetailReply?.DeliveryInfo &&  (OrderTrack?.TrackDetailReply?.DeliveryInfo.length !== 0) ?
  OrderTrack?.TrackDetailReply?.DeliveryInfo.map((e,i)=>{
return(

  <>
    <div class="item active">
          <div class="item-label">
            <div class="item-label-date">
            {e?.dateTime ? String(e?.dateTime).substring(e?.dateTime, e?.dateTime.length - 5) : null}
            </div>
            <div class="item-label-hour">
            {e?.dateTime ? String(e?.dateTime).substring(e?.dateTime.length - 6, e?.dateTime.length) : null}
            </div>
          </div>
          <div class="item-description">
            <div class="item-description-status">
              {e?.status ? e?.status : null}
            </div>
            <div class="item-description-location">
             {e?.station ? e?.station : null} ({e?.code ? e?.code : null})
            </div>
          </div>
        </div>
  </>
  )
  })

  :
  null
}





{
  OrderTrack && (OrderTrack !== null) && OrderTrack?.TrackDetailReply && OrderTrack?.TrackDetailReply?.Checkpoints &&  (OrderTrack?.TrackDetailReply?.Checkpoints.length !== 0) ?
  OrderTrack?.TrackDetailReply?.Checkpoints.map((e,i)=>{
return(

  <>
    <div class="item active">
          <div class="item-label">
            <div class="item-label-date">
            {String(e?.dateTime).substring(e?.dateTime, e?.dateTime.length - 5)}
            </div>
            <div class="item-label-hour">
            {String(e?.dateTime).substring(e?.dateTime.length - 6, e?.dateTime.length)}
            </div>
          </div>
          <div class="item-description">
            <div class="item-description-status">
              {e?.status}
            </div>
            <div class="item-description-location">
             {e?.recievedBy}
            </div>
          </div>
        </div>
  </>
  )
  })

  :
  null
}


      
      </div>
    </div>

    :
   
        <p>Fetching Tracking...</p>
    

}














            <hr />
            <Link to="/myOrders" className="btn btn-solid"> <i className="fa fa-chevron-left"></i> &nbsp; Back To Details</Link>
        </div>


        )
    })
}
      
    </article>
:
<p>Your Order Tracking Has not Started Yet</p>
}
</div>
  )
}

export default ViewTracking;