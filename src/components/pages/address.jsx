import React from 'react';
import { connect } from 'react-redux'
import store from '../../store';
import { getAddress, updateaddress } from '../../actions';
import DOMPurify from 'dompurify';
import ScrollToTop from './scroll_to_top';
import { useState } from 'react';
import { useEffect } from 'react';
import unirest from 'unirest';
import HeadSEO from '../layouts/tradnity/headSEO';
import Heading from './heading';

const Address = (props) => {
    useEffect(() => {


        store.dispatch(getAddress());
    }, [])
    const { Addresss } = props;


    const [countries, setCountries] = useState([]);
    const [staties, setStaties] = useState([]);
    const [cities, setCities] = useState([]);

    const [id, setId] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [post_code, setPost_code] = useState("");
    const [stating, setStating] = useState("");
    const [phoneCode, setPhoneCode] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [phones, setPhones] = useState("");


    useEffect(() => {

        setId(Addresss && Addresss.id ? Addresss.id : "");
        setAddress(Addresss && Addresss.address1 && Addresss.address1.length !== 0 && Addresss.address1[0] ? Addresss.address1[0] : "");
        setCity(Addresss && Addresss.city ? Addresss.city : "");
        setCountry(Addresss && Addresss.country ? Addresss.country : "");
        setPhones(Addresss && Addresss.phone ? Addresss.phone : "");
        setPost_code(Addresss && Addresss.postcode ? Addresss.postcode : "");
        setStating(Addresss && Addresss.state ? Addresss.state : "")

    }, [Addresss])

    useEffect(() => {
        if (!accessToken) {
            unirest
                .get("https://www.universal-tutorial.com/api/getaccesstoken/")
                .headers({
                    "Accept": "application/json",
                    "api-token": "p8IyRGey8OJnNXYXfCn2XRsW6yAXapyGM4JXBzWRZkUMkV1Wt8R5CRSkNr8ouA-E25E",
                    "user-email": "tempmail@gmail.com"
                })

                .then(function (response) {
                    setAccessToken(response && response.body && response.body?.auth_token);
                }).catch((err) => console.error(err))
        }
    })


    useEffect(() => {
        if (accessToken) {

            unirest
                .get("https://www.universal-tutorial.com/api/countries/")
                .headers({
                    "Authorization": `Bearer ${accessToken}`,
                    "Accept": "application/json"
                })

                .then(function (response) {
                    if (!response.body?.error) {
                        setCountries(response.body)
                    }
                    else {
                        setCountries([])
                    }

                }).catch((err) => console.error(err))
        }

    }, [accessToken])

    useEffect(() => {
        if ((countries.length !== 0)) {

            let countriesa = countries && countries.length !== 0 && countries.filter((e) => e.country_short_name === country);

            unirest
                .get(`https://www.universal-tutorial.com/api/states/${countriesa && countriesa.length !== 0 && countriesa[0]?.country_name}`)
                .headers({
                    "Authorization": `Bearer ${accessToken}`,
                    "Accept": "application/json"
                })
                .then(function (response) {
                    if (!response.body?.error) {

                        setStaties(response.body)
                    }
                    else {
                        setStaties([])
                    }

                })

        }
    }, [country, stating])
    useEffect(() => {
        if (stating !== "") {

            unirest
                .get(`https://www.universal-tutorial.com/api/cities/${stating}`)
                .headers({
                    "Authorization": `Bearer ${accessToken}`,
                    "Accept": "application/json"
                })
                .then(function (response) {
                    if (!response.body?.error) {
                        setCities(response.body)
                    }
                    else {
                        setCities([])
                    }

                })


        }
    }, [stating])



    const UpdateProfile = () => {
        let Ids = DOMPurify.sanitize(id, { USE_PROFILES: { html: false } });
        let Addresses = DOMPurify.sanitize(address, { USE_PROFILES: { html: false } });
        let Cities = DOMPurify.sanitize(city, { USE_PROFILES: { html: false } });
        let Countries = DOMPurify.sanitize(country, { USE_PROFILES: { html: false } });
        let Phonesa = DOMPurify.sanitize(phones, { USE_PROFILES: { html: false } });
        let Post_Codes = DOMPurify.sanitize(post_code, { USE_PROFILES: { html: false } });
        let States = DOMPurify.sanitize(stating, { USE_PROFILES: { html: false } });

        var upatecartitem = `${Ids}?token=true&address1[0]=${Addresses}&city=${Cities}&country=${Countries}&phone=${Phonesa}&postcode=${Post_Codes}&state=${States}`;
        store.dispatch(updateaddress(upatecartitem));
    }

    document.querySelector(".loader-wrapper").style = "display: none";



    return (
        <section className="register-page section-b-space">
            <ScrollToTop />
            <HeadSEO title="Edit Address" />

            <div className="container">
                <div className="row">
                    <div className="col-md-2" />
                    <div className="col-lg-8" >
                    <Heading name="Edit Address" />
                        {/* <h2 className='py-3' style={{ fontWeight: 700 }}>Edit Address</h2> */}
                        <div className="theme-card" style={{ boxShadow: "0px 10px 20px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.05)" }}>
                            <form className="theme-form" onSubmit={(e) => e.preventDefault()} >
                                <div className="form-row" >
                                    <div className="col-md-6">
                                        <div className='mx-3' >
                                            <label htmlFor="Address">Address</label><br />
                                            <input type="text" className="modifierI" style={{width:"100%",fontWeight:400,}} id="Address"
                                                placeholder="Address" required={true}
                                                value={address} onChange={(e) => setAddress(e.target.value)}
                                                name="address" />
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className='mx-3'>
                                            <label htmlFor="Country">Country</label>

<br />
                                            <select disabled={(countries && countries.length !== 0) ? false : true} value={country}
                                                onChange={e => {
                                                    setCountry(e.target.value)
                                                    setPhoneCode("")
                                                    setPhones("")
                                                    setStating("")
                                                    setCity("")

                                                }}
                                                type="text"
                                                id="country" name="country"
                                                className="modifierI" style={{width:"100%", fontWeight:400,borderColor: '#dddddd', fontSize: '12px',
                                                padding: '17px 25px', marginBottom: '30px', height: 'inherit'}} aria-required="true" aria-invalid="false">
                                                <option value="">Select Country</option>

                                                {
                                                    countries && (countries.length !== 0) ? countries.map((data, i) => {
                                                        return (
                                                            <option key={i} value={data.country_short_name}>{data.country_name}</option>
                                                        )
                                                    }) : null


                                                }



                                            </select>

                                        </div>
                                    </div>



                                    <div className="col-md-6">
                                        <div className='mx-3'>
                                            <label htmlFor="State">State</label>
<br />



                                            <select disabled={(country === "" || countries.length === 0) ? true : false} value={stating} onChange={e => {
                                                setStating(e.target.value)
                                                setCity("")
                                            }} type="text"
                                                id="State" name="State"
                                                className="modifierI" style={{width:"100%", fontWeight:400,borderColor: '#dddddd', fontSize: '12px',
                                                padding: '17px 25px', marginBottom: '30px', height: 'inherit'}}  aria-required="true" aria-invalid="false">
                                                <option value="">Select State</option>
                                                {
                                                    staties && (staties.length !== 0) ? staties.map((data, i) => {
                                                        return (
                                                            <option key={i} value={data.state_name}>{data.state_name}</option>
                                                        )

                                                    })
                                                        : null
                                                }


                                            </select>



                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className='mx-3'>
                                            <label htmlFor="City">City</label>
<br />
                                            <select disabled={(country === "" || stating === "" || countries.length === 0 || staties.length === 0) ? true : false} value={city} onChange={e => {
                                                setCity(e.target.value)
                                            }} type="text"
                                                id="City" name="City"
                                                className="modifierI" style={{width:"100%", fontWeight:400,borderColor: '#dddddd', fontSize: '12px',
                                                padding: '17px 25px', marginBottom: '30px', height: 'inherit'}} aria-required="true" aria-invalid="false">
                                                <option value="">Select City</option>
                                                {
                                                    cities && cities.length !== 0 ? cities.map((data, i) => {
                                                        return (
                                                            <option key={i} value={data.city_name}>{data.city_name}</option>
                                                        )
                                                    })
                                                        :
                                                        <option value={`No Cities Found From The State ${stating}`}>No Cities Found From The State {stating}</option>
                                                }


                                            </select>
                                        </div>
                                    </div>


                                    <div className="col-md-6">
                                        <div className='mx-3'>
                                            <label htmlFor="Postal">Postal Code</label>
                                            <br />
                                            <input type="number" className="modifierI" style={{width:"100%", fontWeight:400,borderColor: '#dddddd', fontSize: '12px',
                                                padding: '17px 25px', marginBottom: '30px', height: 'inherit'}} id="Postal"
                                                value={post_code} name='post_code' onChange={e => setPost_code(e.target.value)}
                                                placeholder="Enter your Postal Code" required="required" />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className='mx-3'>
                                            <label htmlFor="Phone">Phone</label>
<br />

                                                <input type="number" className="modifierI" style={{width:"100%", fontWeight:400,borderColor: '#dddddd', fontSize: '12px',
                                                padding: '17px 25px', marginBottom: '30px', height: 'inherit'}} id="Phone"
                                                    value={phones} name='phone' onChange={e => setPhones(e.target.value)}
                                                    placeholder="Enter your Phone" required="required" />
                               
                                        </div>
                                    </div>



                                    <div className='text-center col-md-12'>
                                        <button type="submit" className="btn btn-solid" disabled={Address && country && city && phones && post_code && stating ? false : true} onClick={() => UpdateProfile()} style={{ borderRadius: 5 }}>Update Address</button>
                                    </div>
                                </div>
                            </form>

















                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => ({
    Addresss: state.address.getAddressbyid.data,
});
export default connect(mapStateToProps)(Address);