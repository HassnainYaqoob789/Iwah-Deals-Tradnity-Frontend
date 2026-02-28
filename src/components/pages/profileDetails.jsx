import React, { Component } from 'react';
import { updateProfile } from '../../actions'
import "./profileDetails.scss";
import store from '../../store';
import { connect } from 'react-redux'
import image from "../../assets/images/profile.png"
import Heading from './heading';
import ScrollToTop from './scroll_to_top';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import HeadSEO from '../layouts/tradnity/headSEO';
class ProfileDetails extends Component {
    constructor(props) {
        const { Info } = props;
        super(props)
        this.state = {
            "first_name": Info.first_name,
            "last_name": Info.last_name,
            "email": Info.email,
            "Profile": '',
            "date_of_birth": Info.date_of_birth,
            "phone": Info.phone,
            "gender": Info.gender,
            "img": Info.profile !== null ? Info.profile : image,
            "profile": null
        }
    }
    UpdateProfile = () => {
        document.querySelector(".loader-wrapper").style = "display: block";
        const data = new FormData()
        data.append('first_name', this.state.first_name)
        data.append('last_name', this.state.last_name)
        data.append('email', this.state.email)
        data.append('profile', this.state.profile)
        data.append('date_of_birth', this.state.date_of_birth)
        data.append('phone', this.state.phone)
        data.append('gender', this.state.gender)
        store.dispatch(updateProfile(data));
    }
    render() {
        let binaryData = [];


        const CreatingURL = (datas) =>{
            binaryData.push(datas) 
           let URLCreated = URL.createObjectURL(new Blob(binaryData, {type: "image"}));
           return URLCreated;
        }


        return (
                <section className="register-page section-b-space">
                <ScrollToTop />
                <HeadSEO title="Profile Details" />
                    <div className="container">
                        <div className="row">
                        <div className="col-md-2" />

                            <div className="col-lg-8">
                                <Heading name="Profile Details" />
                                <div className="theme-card" style={{ boxShadow: "0px 10px 20px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.05)" }}>
                                    <div className="theme-form" >
                                        <div className="form-row">
                                            <div className="col-md-6">
                                            <div className='mx-3'>
                                                <label htmlFor="email">First Name</label>
                                                <br />
                                                <input type="text" className="modifierI" style={{width:"100%",fontWeight:400,}} id="fname"
                                                    placeholder="First Name" required="required" value={this.state.first_name} name="first_name" onChange={e => this.setState({ first_name: e.target.value })} />
                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                            <div className='mx-3'>
                                                <label htmlFor="email">Last Name</label> <br />
                                                <input type="text" className="modifierI" style={{width:"100%", fontWeight:400,borderColor: '#dddddd', fontSize: '12px',
                                                padding: '17px 25px', marginBottom: '30px', height: 'inherit'}}
                                                id="fname"
                                                    placeholder="Last Name" required="required" value={this.state.last_name} name="last_name" onChange={e => this.setState({ last_name: e.target.value })} />
                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                            <div className='mx-3'>
                                                <label htmlFor="email">email</label><br />
                                                <input type="text" className="modifierI" style={{width:"100%", fontWeight:400,borderColor: '#dddddd', fontSize: '12px',
                                                padding: '17px 25px', marginBottom: '30px', height: 'inherit'}}
                                                id="email"
                                                    placeholder="Email" required="required" value={this.state.email} disabled="true" name="email" />
                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                            <div className='mx-3'>
                                                <label htmlFor="review">Date Of Birth</label><br />
                                                <input type="date" className="modifierI" style={{width:"100%", fontWeight:400,borderColor: '#dddddd', fontSize: '12px',
                                                padding: '17px 25px', marginBottom: '30px', height: 'inherit'}}
                                                id="review"
                                                    placeholder="Enter Date Of Birth" name="dob" value={this.state.date_of_birth} onChange={e => this.setState({ date_of_birth: e.target.value })} />
                                            </div>
                                            </div>
                                            <div className="col-md-6">
                                            <div className='mx-3'>
                                                <label htmlFor="review">Phone</label><br />
                                                <input type="number" className="modifierI" style={{width:"100%", fontWeight:400,borderColor: '#dddddd', fontSize: '12px',
                                                padding: '17px 25px', marginBottom: '30px', height: 'inherit'}}
                                                id="review"
                                                    placeholder="Enter Phone Number" name="phone" value={this.state.phone} onChange={e => this.setState({ phone: e.target.value })} />
                                            </div>
                                            </div>
                                            <div className="col-md-4">
                                            <div className='mx-3'>
                                                <label htmlFor="review">Profile</label><br />
                                                <input type="file" className="modifierI" style={{width:"100%", fontWeight:400,borderColor: '#dddddd', fontSize: '12px',
                                                padding: '17px 25px', marginBottom: '30px', height: 'inherit'}}
                                                    name="profile" accept="image/png, image/jpg, image/jpeg, image/bmp,image/webp" onChange={e => this.setState({ profile: e.target.files[0] })} />
                                            </div>
                                            </div>
                                            <div className="col-md-2">
                                                {
                                                    this.state.img !== null || this.state.profile !== null ?
                                                        <LazyLoadImage alt='imga' src={this.state.profile !== null ? CreatingURL(this.state.profile)
                                                          
                                                            : this.state.img} style={{ marginTop: 20, marginLeft: 40 }} width="50px" height="50px" />
                                                        :
                                                        null}
                                            </div>
                                            <div className="col-md-6">
                                                 <div className='mx-3'>
                                                <label htmlFor="gender">Gender</label>
                                                <br />
                                                <div className="radio" id="gender" style={{ marginTop: "10px", marginBottom: 50 }}>
                                                    <input id="radio-2" name="radio" type="radio" value="male" checked={this.state.gender === 'male'} onChange={e => this.setState({ gender: 'male' })} />
                                                    <label for="radio-2" className="radio-label" >Male</label>
                                                    <input id="radio-3" name="radio" type="radio" value="female" checked={this.state.gender === 'female'} onChange={e => this.setState({ gender: 'female' })} />
                                                    <label for="radio-3" className="radio-label" >Female</label>
                                                    <input id="radio-4" name="radio" type="radio" value="other" checked={this.state.gender === 'other'} onChange={e => this.setState({ gender: 'other' })} />
                                                    <label for="radio-4" className="radio-label">Prefer Not to say</label>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-solid" onClick={() => this.UpdateProfile()} style={{ borderRadius: 5 }}>Update Profile Details</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
    Info: (state.user.user.data) ? state.user.user.data : [],
});
export default connect(mapStateToProps)(ProfileDetails);
