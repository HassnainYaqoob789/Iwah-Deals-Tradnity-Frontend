import React, { Component } from 'react';
import { FiTrash2 } from "react-icons/fi"
import { Link } from 'react-router-dom';

import { FiEdit } from "react-icons/fi"

class DashboardStructureAddress extends Component {
  
    render() {
        const { addressNo, IdSend, DeleteA, country, city, state, postCode, phone, address } = this.props;
      
        return (
                                                                              
            <div style={{ padding: 20, backgroundColor: "#0000000d", height: "400px", borderRadius:8 ,boxShadow: "rgb(0 0 0 / 6%) 1px -1px 7px 0px"}}>
                <div className="row">
                <div className='col-md-8' style={{display:"flex", alignItems:"center"}}>
                    <h3 style={{ paddingTop: 0, fontWeight: "bold", fontSize:20 }}>Address {addressNo}</h3>
                </div>
                <div className='col-md-4 text-center' style={{display:"flex", alignItems:"center", justifyContent:"space-evenly",paddingBottom: 10, }}>
                    <Link to={`${process.env.PUBLIC_URL}/address`} ><FiEdit className='mx-1 onlyColor' onClick={() => IdSend()} size={20} /></Link>
                    <a><FiTrash2 className='mx-1' color='grey' onClick={() => DeleteA()} size={20} /></a>
                </div>
                </div>




                    <div style={{paddingTop:40}}>
                        <div style={{ display: "flex" }}>
                            <h6 style={{ fontWeight: "bold" }}>Country:</h6>
                            <p style={{ marginLeft: 10, paddingTop: 3 }}>{country}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <h6 style={{ fontWeight: "bold" }}>City:</h6>
                            <p style={{ marginLeft: 10, paddingTop: 3 }}>{city}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <h6 style={{ fontWeight: "bold" }}>State:</h6>
                            <p style={{ marginLeft: 10, paddingTop: 3 }}>{state}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <h6 style={{ fontWeight: "bold" }}>Post Code:</h6>
                            <p style={{ marginLeft: 10, paddingTop: 3 }}>{postCode}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <h6 style={{ width: 150, fontWeight: "bold" }}>Phone Number:</h6>
                            <p style={{ marginLeft: -2, paddingTop: 3 }}>{phone}</p>
                        </div>
                        <div style={{ display: "flex" }}>
                            <h6 style={{ fontWeight: "bold" }}>Address:</h6>
                            <p style={{ marginLeft: 10, paddingTop: 3, lineHeight:'20px' }}>
                                {address}<br />
                            </p>
                        </div>
                        <br />
                    </div>
            </div>
        )
    }
}


export default DashboardStructureAddress;