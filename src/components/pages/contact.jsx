import React, { Component } from 'react';
import { connect } from 'react-redux'
import store from '../../store';
import SimpleReactValidator from 'simple-react-validator';
import { SendContact, getContactDetail } from '../../actions'
import "../layouts/tradnity/carousel.css"
import Heading from './heading';
import ScrollToTop from './scroll_to_top';
import DOMPurify from 'dompurify';
import { Helmet } from 'react-helmet';
import HeadSEO from '../layouts/tradnity/headSEO';

class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: "",
            last_name: "",
            description: "",
            phone_number: "",
            email: "",
        }
        this.validator = new SimpleReactValidator();
    }
    setStateFromInput = (event) => {
        var obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    }
    SubmitContact = () => {
        if (this.validator.allValid()) {
            let FirstNames = DOMPurify.sanitize(this.state.first_name, { USE_PROFILES: { html: false } });
            let lastNames = DOMPurify.sanitize(this.state.last_name, { USE_PROFILES: { html: false } });
            let Descriptions = DOMPurify.sanitize(this.state.description, { USE_PROFILES: { html: false } });
            let Phone_Numbers = DOMPurify.sanitize(this.state.phone_number, { USE_PROFILES: { html: false } });
            let Emails = DOMPurify.sanitize(this.state.email, { USE_PROFILES: { html: false } });

            let data = {
                "first_name": FirstNames,
                "last_name": lastNames,
                "description": Descriptions,
                "phone_number": Phone_Numbers,
                "email": Emails
            };
            document.querySelector(".loader-wrapper").style = "display: block";
            store.dispatch(SendContact(data));
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {
        const { contactDetails } = this.props;
        return (
            <div>
                <ScrollToTop />

                <HeadSEO title="Contact Us" />

                <div className="row">


                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <section className=" contact-page section-b-space container">
                            <Heading name="Contact Us" />
                            <br />
                            <div className="container border py-4 px-3">
                                <div className="row section-b-space">
                                    <div className="col-md-6 map">
                                        <iframe
                                            src={contactDetails && contactDetails.data && contactDetails.data.map_location}
                                            allowFullScreen></iframe>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="contact-right">
                                            <ul>
                                                <li>
                                                    <div className="contact-icon">
                                                        <i className="fa fa-solid fa-envelope"></i>
                                                        <h6>Email</h6>
                                                    </div>
                                                    <div className="media-body">
                                                        <a
                                                            style={{ wordBreak: "break-word", overflowWrap: "break-word", color: "#777", fontSize: "14px" }}
                                                            href={`mailto:${contactDetails && contactDetails.data && contactDetails.data.email ? contactDetails.data.email : ""}`}
                                                            target="_blank"
                                                        >
                                                            {contactDetails && contactDetails.data && contactDetails.data.email ? contactDetails.data.email : "No Email Found"}
                                                        </a>

                                                        {/* <p style={{wordBreak:"break-word", overflowWrap:"break-word"}}>{contactDetails && contactDetails.data && contactDetails.data.email ? contactDetails.data.email : "No Email Found"}</p> */}
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="contact-icon">
                                                        <i className="fa fa-solid fa-phone" aria-hidden="true"></i>
                                                        <h6>Contact Us</h6>
                                                    </div>
                                                    <div className="media-body">
                                                        {/* <p style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>
                                                            {(contactDetails && contactDetails.data && contactDetails.data.phone_number && contactDetails.data.phone_number.toString().substring(0, 2) === "03") ? contactDetails.data.phone_number : (contactDetails && contactDetails.data && contactDetails.data.phone_number && contactDetails.data.phone_number.toString().substring(0, 2) !== "03") ? "+" + contactDetails.data.phone_number : "No Number Found"}
                                                        </p> */}
                                                        <a
                                                            style={{ wordBreak: "break-word", overflowWrap: "break-word", color: "#777", fontSize: "14px" }}
                                                            href={`tel:${(contactDetails && contactDetails.data && contactDetails.data.phone_number) ? contactDetails.data.phone_number : ""}`}
                                                        >
                                                            {(contactDetails && contactDetails.data && contactDetails.data.phone_number && contactDetails.data.phone_number.toString().substring(0, 2) === "03") ? contactDetails.data.phone_number : (contactDetails && contactDetails.data && contactDetails.data.phone_number && contactDetails.data.phone_number.toString().substring(0, 2) !== "03") ? "+" + contactDetails.data.phone_number : "No Number Found"}
                                                        </a>

                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="contact-icon">
                                                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                                                        <h6>Address</h6>
                                                    </div>
                                                    <div className="media-body">
                                                        <p style={{ wordBreak: "break-word", overflowWrap: "break-word" }}>{contactDetails && contactDetails.data && contactDetails.data.shop_address ? contactDetails.data.shop_address : "No Address Found"}</p>
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <form>
                                    <div className="row">
                                        <div className="col-md-6 my-3">
                                            <label htmlFor="name">First Name</label>
                                            <input type="text" className="form-fields" style={{ marginBottom: 0 }} id="first_name"
                                                placeholder="Enter Your name" required={true} name="first_name" onChange={this.setStateFromInput} />
                                            {this.validator.message('first_name', this.state.first_name, 'required|alpha')}
                                        </div>
                                        <div className="col-md-6 my-3">
                                            <label htmlFor="email">Last Name</label>
                                            <input type="text" className="form-fields" id="last_name " style={{ marginBottom: 0 }}
                                                placeholder="Last name" required={true} name="last_name" onChange={this.setStateFromInput} />
                                            {this.validator.message('last_name', this.state.last_name, 'required|alpha')}
                                        </div>
                                        <div className="col-md-6 my-3">
                                            <label htmlFor="review">Phone number</label>
                                            <input type="text" className="form-fields" id="phone_number" style={{ marginBottom: 0 }}
                                                placeholder="Enter your number" required={true} name="phone_number" onChange={this.setStateFromInput} />
                                            {this.validator.message('phone_number', this.state.phone_number, 'required|phone')}
                                        </div>
                                        <div className="col-md-6 my-3">
                                            <label htmlFor="email">Email</label>
                                            <input type="email" className="form-fields" id="email" style={{ marginBottom: 0 }} name="email" placeholder="Email"
                                                required={true} onChange={this.setStateFromInput} />
                                            {this.validator.message('email', this.state.email, 'required|email')}
                                        </div>
                                        <div className="col-md-12 my-3">
                                            <label htmlFor="review">Write Your Message</label>
                                            <textarea className="form-fields" placeholder="Write Your Message" style={{ marginBottom: 0 }}
                                                id="description" rows="6" name="description" onChange={this.setStateFromInput}></textarea>
                                            {this.validator.message('description', this.state.description, 'required')}
                                        </div>
                                        <div className="col-md-12 text-center">
                                            <a className="btn btn-solid" onClick={() => this.SubmitContact()}>Send Your Message</a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    contactDetails: state.contactDetails.contactDetails,
})
export default connect(mapStateToProps)(Contact);