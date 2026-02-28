import React from 'react'
import { Card } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { FaCheck } from 'react-icons/fa'
import HeadSEO from '../layouts/tradnity/headSEO'

const OrderNumberS = (props) => {
    let {name, orderId, createdAt } = props;
  return (
    <div style={{ width: 'auto', padding: '15px' }}>


     <HeadSEO title="Order Confirmation" />




 <br /><br /><br /><br /><br />
 <Card className="md-6" style={{ marginLeft: 10, maxWidth: "600px", height: "50%", marginTop: "40px" }}>
   <Card.Header style={{ fontWeight: "700", fontSize: "25px" }} className="base_color_bg">Order Confirmed</Card.Header>
   <Card.Body>
     <div className="icon my-3">
       <FaCheck size={30} color={"#34f234"} />
     </div>
     <Card.Title style={{ color: "green" }}>Order Success</Card.Title>
     <Card.Text>
       <p style={{ fontSize: "25px" }}> Hey {name}</p>
       <p>We've got your order! Your world is about to look a whole lot better.</p>
     </Card.Text>
     <h3>Order Number: #{orderId}</h3>
   </Card.Body>
   <Card.Footer className=" base_color_bg">Timestamp: {createdAt}</Card.Footer>
 </Card>
</div>

  )
}

export default OrderNumberS