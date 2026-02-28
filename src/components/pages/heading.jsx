import React from 'react'

const Heading = (props) => {
  return (
    <div style={{ textAlign: "center", }}>
       <h1 className="primary-heading py-3" style={{fontSize:45}}>
       {props.name}<span className="fullstop onlyColor" style={{fontSize: 85,fontWeight: 700,lineHeight: "12px"}}></span>
      </h1>
    </div>
  )
}
export default Heading