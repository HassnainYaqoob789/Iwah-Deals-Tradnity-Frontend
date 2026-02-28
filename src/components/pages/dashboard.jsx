import React, { Component } from 'react';
import { connect } from 'react-redux'
import store from '../../store';
import {deleteaddress, getAddress, getaddressbyid } from '../../actions';

import { Link } from 'react-router-dom';

import { FiPlusCircle } from "react-icons/fi"

import Slider from 'react-slick';

// CSS
import "./myOrders.scss";



import DashboardStructure from './DashboardStructure';
import DashboardStructureAddress from './DashboardStructureAddress';






class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.counter = React.createRef(0);
        this.state = {
            'show': false,
            'old_password': '',
            'new_password': '',
            'confirm_pasword': '',
            loadingImage: true,
        }
    }
    getaddressid = (e) => {
        store.dispatch(deleteaddress(e));
    }
   
    componentDidMount(){
        store.dispatch(getAddress());
    }

    render() {
        const { Info, Address } = this.props;
       
        function getaddressid(e) {
            store.dispatch(deleteaddress(e));
        }
        function sendid(e) {
            store.dispatch(getaddressbyid(e));
        }
  
        var settings = {
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 3,
            className: "center",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 586,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        }
        return (
            <div className='absoluteWidth' >
             <DashboardStructure
              name={Info && Info.data && Info.data.name } 
              email={Info &&  Info.data && Info.data.email } 
              phone={Info && Info.data && Info.data.phone } 
              profile={Info && Info.data && Info.data.profile } 
              data={Info?.data}
                />

<br/>
<br/>
<br/>
<br/>

      
      
                    
                                            <div>
                                                <h2 style={{ fontWeight: 600, fontSize: 30, paddingTop: 40 }}>Shipping Address</h2>
                                                <div className="box" style={{ padding: 10 }}>
                                                    <div className="box-title">
                                                        <p>The following addresses will be used on the checkout page by default.</p>
                                                    </div>
                                                    <div className="row">
                                                    
                                                            <Slider {...settings} className="slide-1 offer-slider">
                                                               {
                                                                    Address && Address.length !== 0 && Address.map((e, i) => {
                                                                        return (
                                                                            <div key={i} style={{ padding: 20 }}>

                                                                              <DashboardStructureAddress 
                                                                              addressNo={i + 1} 
                                                                              IdSend={()=>sendid(e.id)} 
                                                                              DeleteA = {() => getaddressid(e.id)}
                                                                              country={e.country}
                                                                              city={e.city}
                                                                              state={e.state}
                                                                              postCode={e.postcode}
                                                                              phone={e.phone}
                                                                              address={e.address1}
                                                                              />
                                                                              </div>
                                                                        )
                                                                    })}

                                                                <div style={{ padding: "20px 8px", }}>
                                                                    <div style={{ padding: 20, textAlign: "center", backgroundColor: "#0000000d" ,borderRadius:8,margin: "6px 0px" }}>
                                                                        <Link style={{ paddingTop: 15 }} to={`${process.env.PUBLIC_URL}/add_address`} >
                                                                            <div style={{ marginTop: 120, marginBottom: 120 }}>
                                                                                <FiPlusCircle size={80} className='onlyColor' />
                                                                                <br />
                                                                                <br />
                                                                                <span className='onlyColor'>Add New Address</span>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </Slider>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                    
       
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    Info: state.user.user,
    Address: (state.address.userAddress) ? state.address.userAddress.data : []
});
export default connect(mapStateToProps)(Dashboard);