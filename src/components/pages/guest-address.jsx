import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
import { saveAddrestocart } from '../../actions';
import DOMPurify from 'dompurify';
import Heading from './heading';
import HeadSEO from '../layouts/tradnity/headSEO';
import { Country, State, City } from 'country-state-city';
import {FetchCategAreas } from '../../actions';

const GuestAddress = (props) => {
  const [countries, setCountries] = useState([]);
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");
  const [phone, setphone] = useState("");
  const [post_code, setpost_code] = useState("");
  const [states, setstates] = useState(""); // rakha hua hai sync aur payload ke liye

  useEffect(() => {
    // Fetch areas (jaise Add_Address mein tha)
    store.dispatch(FetchCategAreas());

    // Countries filter only Bahrain (tumhare reference ke mutabiq)
    const allCountries = Country.getAllCountries();
    const bahrainOnly = allCountries.filter((c) => c.name === "Bahrain");

    setCountries(bahrainOnly);

    // Default Bahrain select kar do
    setcountry("Bahrain");
  }, []);

  const SubmitAddress = () => {
    let Addresss = DOMPurify.sanitize(address, { USE_PROFILES: { html: false } });
    let FirstNames = DOMPurify.sanitize(first_name, { USE_PROFILES: { html: false } });
    let LastNames = DOMPurify.sanitize(last_name, { USE_PROFILES: { html: false } });
    let Emails = DOMPurify.sanitize(email, { USE_PROFILES: { html: false } });
    let Cities = DOMPurify.sanitize(city, { USE_PROFILES: { html: false } });
    let States = DOMPurify.sanitize(states, { USE_PROFILES: { html: false } });
    let PostCodes = DOMPurify.sanitize(post_code, { USE_PROFILES: { html: false } });
    let Countries = DOMPurify.sanitize(country, { USE_PROFILES: { html: false } });
    let Phones = DOMPurify.sanitize(phone, { USE_PROFILES: { html: false } });

    const AddressData = {
      billing: {
        address1: { "0": Addresss },
        use_for_shipping: "true",
        first_name: FirstNames,
        last_name: LastNames,
        email: Emails,
        city: Cities,
        state: States,          // ← YEH BHEJ RAHE HAIN (value = city)
        postcode: PostCodes,
        country: Countries,
        phone: Phones
      },
      shipping: {
        address1: { "0": Addresss }
      }
    };

    store.dispatch(saveAddrestocart(AddressData));

    // Reset form
    setaddress("");
    setfirst_name("");
    setlast_name("");
    setemail("");
    setcity("");
    setstates("");
    setpost_code("");
    setphone("");
    setcountry("Bahrain");

    props.handleClickCustom();
  };

  return (
    <section className="register-page section-b-space">
      <HeadSEO title="Save Guest Address" />

      <div className="container">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <Heading name="Save Guest Address" />

            <div className="theme-card" style={{ borderRadius: "8px", border: "1px solid rgba(0,0,0,0.05)" }}>
              <div className="form-row">
                <div className="col-md-6">
                  <div className="mx-3">
                    <label htmlFor="first_name">First Name</label>
                    <input
                      type="text"
                      className="form-fields"
                      value={first_name}
                      onChange={(e) => setfirst_name(e.target.value)}
                      placeholder="First Name"
                      required
                      name="first_name"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mx-3">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      type="text"
                      className="form-fields"
                      value={last_name}
                      onChange={(e) => setlast_name(e.target.value)}
                      placeholder="Last Name"
                      required
                      name="last_name"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mx-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-fields"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      placeholder="Email"
                      required
                      name="email"
                    />
                  </div>
                </div>

                {/* Country – bilkul tumhare reference jaisa */}
                <div className="col-md-6">
                  <div className="mx-3">
                    <label htmlFor="Country">Country</label>
                    <br />
                    <select
                      disabled={countries && countries.length !== 0 ? false : true}
                      value={country}
                      onChange={(e) => {
                        setcountry(e.target.value);
                        setphone("");
                        setstates("");
                        setcity("");
                      }}
                      id="country"
                      name="country"
                      className={countries && countries.length !== 0 ? "form-fields" : "form-fields disabledT"}
                      aria-required="true"
                      aria-invalid="false"
                      style={{
                        width: "100%",
                        fontWeight: 400,
                        borderColor: "#dddddd",
                        fontSize: "12px",
                        padding: "17px 25px",
                        marginBottom: "30px",
                        height: "inherit"
                      }}
                    >
                      <option value="">Select Country</option>
                      {countries && countries.length !== 0 ? (
                        countries.map((data, i) => (
                          <option key={i} value={data.name}>
                            {data.name}
                          </option>
                        ))
                      ) : null}
                    </select>
                  </div>
                </div>

                {/* City/Area – states sync rakha */}
                <div className="col-md-6">
                  <div className="mx-3">
                    <label htmlFor="City">City/Area</label>
                    <select
                      value={city}
                      onChange={(e) => {
                        setcity(e.target.value);
                        setstates(e.target.value); // ← YEH LINE RAHEGI – states ko city ke barabar rakhega
                      }}
                      className="form-fields"
                      name="City"
                      aria-required="true"
                    >
                      <option value="">Select City/Area</option>
                      {props.getareas?.data && props.getareas.data.length > 0 ? (
                        props.getareas.data.map((data, i) => (
                          <option key={i} value={data.area_name}>
                            {data.area_name}
                          </option>
                        ))
                      ) : (
                        <option value="">No areas found for Bahrain</option>
                      )}
                    </select>

                    <p
                      style={{
                        marginTop: "8px",
                        marginBottom: "16px",
                        fontSize: "13px",
                        color: "#555",
                        lineHeight: "1.4",
                      }}
                    >
                      Select your city or the nearest area for faster delivery.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mx-3">
                    <label htmlFor="Phone">Phone</label>
                    <input
                      type="tel"
                      className="form-fields"
                      value={phone}
                      onChange={(e) => setphone(e.target.value)}
                      placeholder="Enter your Phone"
                      required
                      name="Phone"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mx-3">
                    <label htmlFor="Postal">Postal Code</label>
                    <input
                      type="text"
                      className="form-fields"
                      value={post_code}
                      onChange={(e) => setpost_code(e.target.value)}
                      placeholder="Enter your Postal Code"
                      required
                      name="Postal"
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mx-3">
                    <label htmlFor="Address">Address</label>
                    <textarea
                      className="form-fields"
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                      placeholder="Full address"
                      required
                      name="address"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="text-center col-md-12" style={{ marginTop: "24px" }}>
                  <button
                    type="button"
                    className="btn btn-solid"
                    onClick={SubmitAddress}
                    style={{ borderRadius: 5 }}
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  getareas: state.areasReducer.getareas,
});

export default connect(mapStateToProps)(GuestAddress);