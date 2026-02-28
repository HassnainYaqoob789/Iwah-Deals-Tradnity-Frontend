import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { toast } from 'react-toastify';
import axios from 'axios';
import FormData from 'form-data';
import * as url from '../../constants/Endpoints'
import { dispatchAddrress, FetchCategAreas } from '../../actions';
import shop from '../../api/shop';
import store from '../../store';
import DOMPurify from 'dompurify';
import ScrollToTop from './scroll_to_top';
import unirest from 'unirest';
import history from '../../history';
import HeadSEO from '../layouts/tradnity/headSEO';
import Heading from './heading';
import { Country, State, City } from 'country-state-city';

const Add_Address = ({
  getareas
}) => {
  const [accessToken, setAccessToken] = useState("");
  const [countries, setCountries] = useState([]);
  const [staties, setStaties] = useState([]);
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [post_code, setPost_Code] = useState("");
  const [statesa, setStatesa] = useState("");
  const [itemsa, setItems] = useState("")

  let SubmitReviews = (e) => {
    var CryptoJS = require("crypto-js");
    var getData = localStorage.getItem('customerData');
    var bytes = CryptoJS.AES.decrypt(getData, url.encrypt_code);
    var items = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (items) {
      setItems(itemsa);
    }
    var data = new FormData();

    let Addresss = DOMPurify.sanitize(address1, { USE_PROFILES: { html: false } });
    let Cities = DOMPurify.sanitize(city, { USE_PROFILES: { html: false } });
    let Countries = DOMPurify.sanitize(country, { USE_PROFILES: { html: false } });
    let Phones = DOMPurify.sanitize(phone, { USE_PROFILES: { html: false } });
    let PostalCodes = DOMPurify.sanitize(post_code, { USE_PROFILES: { html: false } });
    let States = DOMPurify.sanitize(statesa, { USE_PROFILES: { html: false } });
    let CountryNames = DOMPurify.sanitize(country, { USE_PROFILES: { html: false } });

    data.append('address1[0]', Addresss);
    data.append('city', Cities);
    data.append('country', Countries);
    data.append('phone', Phones);
    data.append('postcode', PostalCodes);
    data.append('state', States);
    data.append('country_name', CountryNames);

    var config = {
      method: 'post',
      url: `${url.temp_url}api/addresses/create?token=true`,
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + items.token,
      },
      data: data
    };
    axios(config)
      .then(function (response) {
        toast.success("Your Address has been added successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          bodyClassName: 'toastStyle',
        });
        shop.getAddress(e => {
          store.dispatch(dispatchAddrress(e));
        });
        setTimeout(() => {
          history.goBack();
        }, 2000)
      })
      .catch(function (error) {
        toast.error("Your Address has not been added successfully!");
      });
  }


  useEffect(() => {
    store.dispatch(FetchCategAreas());

    const allCountries = Country.getAllCountries();

    const bahrainOnly = allCountries.filter(
      (c) => c.name === "Bahrain"
    );

    setCountries(bahrainOnly);

    // Optional: default selected bhi karna ho to
    setCountry("Bahrain");
  }, []);


  

  // useEffect(() => {
  //   if ((countries.length !== 0)) {

  //     let countriesa = countries && countries.length !== 0 && countries.filter((e) => e.name === country);

  //     setStaties(State.getStatesOfCountry(countriesa[0]?.isoCode) || [])
  //   }
  // }, [country, statesa])


  return (
    <section className="register-page section-b-space">
      <ScrollToTop />


      <HeadSEO title="Add Address" />

      <div className="container">
        <div className="row">
          <div className="col-md-2" />
          <div className="col-lg-8" >
            <Heading name="Add Address" />

            <div className="theme-card" style={{ boxShadow: "0px 10px 20px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.05)" }}>
              <div className="theme-form" >
                <div className="form-row" >
                  <div className="col-md-6">
                    <div className='mx-3'>
                      <label htmlFor="Address">Address</label>
                      <br />
                      <input type="text" className="modifierI" style={{ width: "100%", fontWeight: 400, }} id="Address" value={address1}
                        placeholder="Address" required="required" name="address" onChange={e => setAddress1(e.target.value)} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className='mx-3'>
                      <label htmlFor="Country">Country</label>
                      <br />
                      <select disabled={(countries && countries.length !== 0) ? false : true} value={country}
                        onChange={e => {
                          setCountry(e.target.value)

                          setPhone("")
                          setStatesa("")
                          setCity("")

                        }}
                        type="text"
                        id="country" name="country"
                        className="modifierI" style={{
                          width: "100%", fontWeight: 400, borderColor: '#dddddd', fontSize: '12px',
                          padding: '17px 25px', marginBottom: '30px', height: 'inherit'
                        }}
                        aria-required="true" aria-invalid="false">
                        <option value="">Select Country</option>

                        {
                          countries && (countries.length !== 0) ? countries.map((data, i) => {
                            return (
                              <option key={i} value={data.name}>{data.name}</option>
                            )
                          }) : null


                        }



                      </select>
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                    <div className='mx-3'>
                      <label htmlFor="state">State</label><br />
                      <select disabled={(country === "" || countries.length === 0) ? true : false} value={statesa} onChange={e => {
                        setStatesa(e.target.value)
                        setCity("")
                      }} type="text"
                        id="State" name="State"
                        className="modifierI" style={{
                          width: "100%", fontWeight: 400, borderColor: '#dddddd', fontSize: '12px',
                          padding: '17px 25px', marginBottom: '30px', height: 'inherit'
                        }} aria-required="true" aria-invalid="false">
                        <option value="">Select State</option>
                        {
                          staties && (staties.length !== 0) ? staties.map((data, i) => {
                            return (
                              <option key={i} value={data.name}>{data.name}</option>
                            )

                          })
                            : null
                        }


                      </select>

                    </div>
                  </div> */}
                  <div className="col-md-6">
                    <div className="mx-3">
                      <label htmlFor="City">City/Area</label>
                      <select
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          setStatesa(e.target.value);
                        }}
                        id="City"
                        name="City"
                        className="modifierI"
                        style={{
                          width: "100%",
                          fontWeight: 400,
                          borderColor: "#dddddd",
                          fontSize: "12px",
                          padding: "17px 25px",
                          marginBottom: "4px", // ← reduced from 30px to tighten spacing
                          height: "inherit",
                        }}
                        aria-required="true"
                        aria-invalid="false"
                      >
                        <option value="">Select City</option>
                        {getareas?.data && getareas?.data?.length !== 0 ? (
                          getareas.data.map((data, i) => (
                            <option key={i} value={data.area_name}>
                              {data.area_name}
                            </option>
                          ))
                        ) : (
                          <option value="">
                            No areas found for {statesa || "selected state"}
                          </option>
                        )}
                      </select>

                      {/* Improved helper text with minimal spacing */}
                      <p
                        className="helper-text"
                        style={{
                          marginTop: "8px",
                          marginBottom: "0",
                          fontSize: "13px",
                          color: "#555",
                          lineHeight: "1.4",
                        }}
                      >
                        Select your city or the nearest area for faster delivery.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6 my-2">
                    <div className='mx-3'>
                      <label htmlFor="Postal">Postal Code</label>
                      <br />
                      <input type="number" className="modifierI" style={{
                        width: "100%", fontWeight: 400, borderColor: '#dddddd', fontSize: '12px',
                        padding: '17px 25px', marginBottom: '30px', height: 'inherit'
                      }} value={post_code} id="Postal"
                        placeholder="Enter your Postal Code" min={0} name="Postal" onChange={e => setPost_Code(e.target.value)} required="required" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className='mx-3'>
                      <label htmlFor="Phone">Phone</label><br />
                      <input type="number" className="modifierI" style={{
                        width: "100%", fontWeight: 400, borderColor: '#dddddd', fontSize: '12px',
                        padding: '17px 25px', marginBottom: '30px', height: 'inherit'
                      }} id="Phone"
                        placeholder="Enter your Phone" min={0} name="Phone" value={phone} onChange={e => setPhone(e.target.value)} required="required" />
                    </div>
                  </div>
                  <div className='text-center col-md-12'>
                    <button type="submit" className="btn btn-solid" onClick={(e) => SubmitReviews(e)} style={{ borderRadius: 5 }}>Add Address</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

}
const mapStateToProps = (state, ownProps) => ({
  user: state.user.user,
  Address: state.data.GETUSER_ADDRESSBYID,
  getareas: state.areasReducer.getareas,
});
export default connect(mapStateToProps)(Add_Address);