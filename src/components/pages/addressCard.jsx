import React, { Component } from "react";
import {
  saveAddrestocart,
  getaddressbyid,
  deleteaddress,
  getAddress,
} from "../../actions";
import { Link } from "react-router-dom";
import * as url from "../../constants/Endpoints";
import { FiEdit } from "react-icons/fi";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import Slider from "react-slick";
import { connect } from "react-redux";
import store from "../../store";
import ScrollToTop from "./scroll_to_top";
import Loader from "../../svg_code/loader";
import HeadSEO from "../layouts/tradnity/headSEO";

class BillingStructureAddress extends Component {
  render() {
    const {
      addressNo,
      IdSend,
      DeleteA,
      country,
      city,
      state,
      postCode,
      phone,
      address,
      addressSave,
    } = this.props;

    return (
      <div
        className="row"
        style={{
          padding: 20,
          backgroundColor: "#0000000d",
          height: "400px",
          borderRadius: 8,
        }}
      >
        <div className="col-md-8 text-center">
          <h3 style={{ paddingTop: 0, fontWeight: "bold", paddingBottom: 10 }}>
            Address {addressNo}
          </h3>
        </div>
        <div className="col-md-4 text-center">
          <Link to={`${process.env.PUBLIC_URL}/address`}>
            <FiEdit
              className="mx-2 onlyColor"
              onClick={() => IdSend()}
              size={20}
            />
          </Link>
          <FiTrash2
            className="mx-2"
            color="grey"
            onClick={() => DeleteA()}
            size={20}
          />
        </div>
        <div className="row">
          <div>
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
              <p style={{ marginLeft: 10, paddingTop: 3 }}>
                {address}
                <br />
              </p>
            </div>
            <br />
            <div>
              <input
                name="address"
                id="radio-2"
                style={{ marginLeft: 10 }}
                onClick={() => addressSave()}
                type="radio"
              />
              <label className="px-2">Select</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class AddressCard extends Component {
  componentDidMount() {
    store.dispatch(getAddress());
  }

  saveaddress = (e, a) => {
    var CryptoJS = require("crypto-js");
    const decryptedData = localStorage.getItem("customerData");
    var bytes = CryptoJS.AES.decrypt(decryptedData, url.encrypt_code);
    var getData = bytes.toString(CryptoJS.enc.Utf8);
    if (getData !== null) {
      const Data = JSON.parse(getData);
      const users = Data != null ? Data.data : "";

      const addressData = {
        billing: {
          address1: {
            "0": a[0],
          },
          use_for_shipping: "true",
          first_name: users.first_name,
          last_name: users.last_name,
          email: users.email,
          address_id: e,
        },
        shipping: {
          address1: {
            "0": a[0],
          },
          first_name: users.first_name,
          last_name: users.last_name,
          email: users.email,
          address_id: e,
        },
      };
      store.dispatch(saveAddrestocart(addressData));
    }
  };
  getaddressid = (e) => {
    store.dispatch(deleteaddress(e));
  };
  render() {
    function sendid(e) {
      document.querySelector(".loader-wrapper").style = "display: block";
      store.dispatch(getaddressbyid(e));
    }
    function getaddressid(e) {
      store.dispatch(deleteaddress(e));
    }
    var settings = {
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 586,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    const { Address ,handleClickCustom} = this.props;
    return (
      <div style={{ width: "90%", marginLeft: "5%" }}>
        <ScrollToTop />
        <HeadSEO title="Save Address" />

        <span className="head50" />
        <h2 style={{ fontWeight: 600, fontSize: 30, paddingTop: "3%" }}>
          Shipping Address
        </h2>
        <div className="box-title" style={{ padding: 15 }}>
          <div className="box-title">
            <p>
              The following addresses will be used on the checkout page by
              default.
            </p>
          </div>
        </div>
        <div className="row">
          {Address ? (
            <Slider {...settings} className="slide-1 offer-slider">
              {Address.length !== 0
                ? Address.map((e, i) => {
                    return (
                      <div key={i} className="col-md-4" style={{ padding: 20 }}>
                        <BillingStructureAddress
                          addressNo={i + 1}
                          IdSend={() => sendid(e.id)}
                          DeleteA={() => getaddressid(e.id)}
                          country={e.country}
                          city={e.city}
                          state={e.state}
                          postCode={e.postcode}
                          phone={e.phone}
                          address={e.address1}
                          addressSave={(f) =>(
                            this.saveaddress(e.id, e.address1),handleClickCustom())
                          }
                        />
                      </div>
                    );
                  })
                : null}

              <div className="col-md-4" style={{ padding: "20px 8px" }}>
                <div
                  style={{
                    padding: 20,
                    textAlign: "center",
                    backgroundColor: "#0000000d",
                    margin: "6px 0px",
                    borderRadius: 8,
                  }}
                >
                  <Link
                    style={{ paddingTop: 15 }}
                    to={`${process.env.PUBLIC_URL}/add_address`}
                  >
                    <div style={{ marginTop: 120, marginBottom: 120 }}>
                      <FiPlusCircle size={80} className="onlyColor" />
                      <br />
                      <br />
                      <span className="onlyColor">Add New Address</span>
                    </div>
                  </Link>
                </div>
              </div>
            </Slider>
          ) : (
            <div className="text-center" style={{ marginTop: "4vh" }}>
              <Loader />
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  getorders: state.orders.get_orders.data,
  Address: state.address.userAddress.data,
});
export default connect(mapStateToProps, {})(AddressCard);
