import React, { Component } from 'react';
import image from "../../assets/images/profile.png"
import Heading from './heading';
import ScrollToTop from './scroll_to_top';
import { toast } from 'react-toastify';
import { ChangePassword } from '../../actions';
import store from '../../store';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import * as url from '../../constants/Endpoints'
import { Link } from 'react-router-dom';
import { FiEdit } from "react-icons/fi"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "./register.css"
import EmptySearch from '../../svg_code/emptySearch';
import Loader from '../../svg_code/loader';
import HeadSEO from '../layouts/tradnity/headSEO';

class DashboardStructure extends Component {
    constructor(props) {
        super(props)
        this.counter = React.createRef(0);
        this.state = {
            'show': false,
            'old_password': '',
            'new_password': '',
            'confirm_pasword': '',
            loadingImage: true,
            loading: true,

        }
    }
   
    submitform = (e) => {
        var CryptoJS = require("crypto-js");
        const decryptedData = localStorage.getItem("customerData");
        var bytes = CryptoJS.AES.decrypt(decryptedData, url.encrypt_code);
        var getData = bytes.toString(CryptoJS.enc.Utf8);
        if (getData !== null) {
            const Data = JSON.parse(getData);
            const email = (Data != null) ? Data.data.email : '';
            if (this.state.new_password === this.state.confirm_pasword) {
                const obj = {
                    "old_password": this.state.old_password,
                    "password": this.state.confirm_pasword,
                    "email": email,
                }
                store.dispatch(ChangePassword(obj));
            } else {
                toast.error('Password Not Match', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    bodyClassName: 'toastStyle',
                });
            }
        }
        this.setState({ show: false })
    }

    render() {
        const { name,email,phone,profile,data } = this.props;
        if(name === undefined && email === undefined && phone === undefined && profile === undefined){
            setTimeout(()=>{
          
                this.setState({loading : false})
              },4000)
          
          }
     
        return (
            <div>
            <ScrollToTop />
            <HeadSEO title="Dashboard" />

            {/*Dashboard section*/}
         
                    <div className='head50' />

<br />
<br />

                    <Heading name="Dashboard" />
                 
                                 <div className="dashboard" style={{ border: "none", borderRadius: 10,}}>
                                    <div className="box-title my-2 mx-5">

                                    </div>
                                    <div className="box-account box-info">
                                        <div className="my-4" style={{ paddingTop: 28 }}>
                                            <h2 className='my-4' style={{ fontWeight: 600, fontSize: 30, paddingTop: 40 }}>Account Information</h2>
                                            <br />
                                        </div>


                                        {
                                            data ?
                                        
                                        <div className="row">
                                            <div className="col-md-2"></div>
                                            <div className="col-sm-12 col-md-8">
                                                <div className="box" style={{ padding: 5, backgroundColor: "#0000000d",borderRadius:8 ,boxShadow: "rgb(0 0 0 / 6%) 1px -1px 7px 0px" }}>
                                                    <div className="box-title" style={{ padding: 15 }}>
                                                        <h3 style={{fontWeight:500}}>Contact Information</h3>
                                                        
                                                            

                                       <Link to={`${process.env.PUBLIC_URL}/profileDetails`}>
                                                     
                                                            <a style={{ paddingTop: 20, paddingRight: 15 }}>
                                                            <FiEdit className='onlyColor' size={20} />
                                                            </a>
                                                            
                                                            </Link>


                                                    
                                                    </div>




                                                    {(data) ?
                                                        <div className="box-content row" style={{ padding: 8 }}>
                                                            <div className="col-md-9 px-4">
                                                                <h6 className='my-1'><i className="fa fa-user-circle-o my-2 " style={{ fontSize: "20px" }}></i><span className="p-2 text-capitalize" style={{ paddingLeft: 80, paddingBottom: 10, whiteSpace: "pre-wrap", fontSize: "1em", wordBreak: "break-all", }}>{name && name}</span></h6>
                                                                <h6 className='my-1'><i className="fa fa-envelope-o my-2" style={{ fontSize: "20px" }}></i><span className="p-2 " style={{ paddingLeft: 80, paddingBottom: 10, whiteSpace: "pre-wrap", fontSize: "1em", wordBreak: "break-all", }}>{email && email}</span></h6>
                                                                <span className='row'>
                                                                    {
                                                                        (phone !== null && phone !== "") ?
                                                                            <h6 className='m-1'><i className="fa fa-phone my-2" style={{ fontSize: 20 }}></i><span className="p-2 text-capitalize" style={{ paddingLeft: "20", paddingBottom: 10, textAlign: "left" }}>{phone && phone}</span></h6>
                                                                            :
                                                                            null
                                                                    }
                                                                   
                                                                </span>
                                                            </div>
                                                            <div className="col-md-3" style={{display: 'flex',alignItems: "center",justifyContent: 'flex-end', }}>
                                                                <LazyLoadImage style={{display: "block", width: "120px", height: "120px", border: "1px solid rgba(0,0,0,0.1)",borderRadius: "8px" }} alt="image"
                                                                    src={profile ? profile : image} />
                                                               
                                                            </div>
                                                        </div>
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
:


this.state.loading ?

<div className="text-center" style={{marginTop:"5vh"}}>

<Loader />

</div>   

:

<div className="text-center my-5">
                                    
<EmptySearch />
                                    <br />

                                    <span className='fs-5 my-3'>Sorry No User Details Found!</span>
                                    </div>



}
                                    </div>
                                </div>
                          
                       
        
            <Modal show={this.state.show} onHide={()=>this.setState({ show: false })} aria-labelledby="contained-modal-title-vcenter"
                centered
                size="md" style={{ margin:"auto"}} >
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">







                    <br /><br />
                    <input type="password" className="modifierI fw-normal w-100"  onChange={e => this.setState({ old_password: e.target.value })} placeholder="Enter Old Password" />
                    <br /><br />
                    <input type="password" className="modifierI fw-normal w-100"  onChange={e => this.setState({ new_password: e.target.value })} placeholder="Enter New Password" />
                    <br /><br />
                    <input type="password" className="modifierI fw-normal w-100"  onChange={e => this.setState({ confirm_pasword: e.target.value })} placeholder="Confirm New Password" />
                    <br /><br /><br />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" style={{ border: "none", borderRadius: 10 }} onClick={() => this.setState({ show: false })}>
                        Close
                    </Button>
                    <Button variant="primary" className='onlyBackColor' style={{ border: "none", borderRadius: 10 }} onClick={() => this.submitform()}>
                        Change Password
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        )
    }
}

export default DashboardStructure;