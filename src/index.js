import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { ScrollContext } from 'react-router-scroll-4';
import ReactGA from 'react-ga';
import loadable from '@loadable/component';
import history from './history';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import './inputStyle.css';
import './components/pages/register.css';
import store from './store';
import ReactPixel from 'react-facebook-pixel';
import { base_url, appConfig } from './constants/Endpoints';
import axios from 'axios';

// Import custom components
import HeaderThree from './components/common/headers/header-three';
import FooterFour from './components/common/footers/footer-four';
import PageNF from './components/pages/PageNF';

import {
        fetchMenu,
        getAllProducts,
        fetchHomeBanner,
        fetchOrigin,
        getSocialLink,
        getWishlist,
        getCartData,
        getProductCategory,
        getcustomer,
        fetchBestSeller,
        getContactDetail,
        getMainScreenText,
        getFooterIcons,
        getCurrencies,
        ChangeCurrences,
        recieveSliderimages,
        getAddress,
        getAppConfig,
} from './actions'

// Import custom components
// import ViewDetails from'./components/pages/viewDetails';
// import Address from './components/pages/address';
import PrivateRoute from './containers/PrivateRoute';
import TradnityMain from './components/layouts/tradnity/main';
// import Cart from './components/cart';
// import axios from 'axios';
import LeftSideBar from "./components/products/left-sidebar";
// import shopAlgoliaA from './components/pages/shopAlgoliaA';
// import HeaderThree from './components/common/headers/header-three';
// import FooterFour from './components/common/footers/footer-four';
import aboutUs from './components/pages/about-us';
import Contact from './components/pages/contact';



const ViewDetails = loadable(() => import('./components/pages/viewDetails'));
const Address = loadable(() => import('./components/pages/address'));
// const PrivateRoute = loadable(() => import('./containers/PrivateRoute'));
// const TradnityMain = loadable(() => import('./components/layouts/tradnity/main'));
const Cart = loadable(() => import('./components/cart'));
// const LeftSideBar = loadable(() => import("./components/products/left-sidebar"));
const shopAlgoliaA = loadable(() => import('./components/pages/shopAlgoliaA'));




const ViewTracking  = loadable(() => import('./components/pages/viewTracking'));
const wishList = loadable(() => import('./components/wishlist'))
const Login = loadable(() => import('./components/pages/login'))
const Dashboard = loadable(() => import('./components/pages/dashboard'))
const registerForm = loadable(() => import('./components/pages/register'))
const Add_Address = loadable(() => import('./components/pages/add-address'))
const ShippingOptions = loadable(() => import('./components/pages/shipping'))
const BillingOptions = loadable(() => import('./components/pages/billing'))
const ForgetOtp = loadable(() => import('./components/pages/forgetOtp'))
const NewForgetPassword = loadable(() => import('./components/pages/forgetNewPassword'))
const MyOrders = loadable(() => import('./components/pages/myOrders'))
const PrivacyPolicy = loadable(() => import('./components/pages/privacy-policy'))
const TermsandCondition = loadable(() => import('./components/pages/termsCondition'))




const Otp = loadable(() => import('./components/pages/otp'))
const ProfileDetails = loadable(() => import('./components/pages/profileDetails'))
const AddressCard = loadable(() => import('./components/pages/addressCard'))
const AddressEdit = loadable(() => import('./components/pages/addressEdit'))
const ForgetPassword = loadable(() => import('./components/pages/forgetPassword'))
const OrderNumber = loadable(() => import('./components/pages/orderNumber'))
const CustomizedTooltips = loadable(() => import('./components/pages/cart'))
const CartSidebars = loadable(() => import('./components/pages/Sidebarcart'))
const StripePayment = loadable(() => import('./components/products/common/stripe'))
const Fbemail = loadable(() => import('./components/pages/config/fbemail'))
const ChangePasswordP = loadable(() => import('./components/pages/ChangePassword'))
// const PageNF = loadable(() => import('./components/pages/PageNF'))



const Root =  () => {
        
        const decryptedData = localStorage.getItem("customerData")
        const [headerType,setHeaderType]=useState(null)  
        
        const RunDispatch = () => {
                


                ReactGA.initialize('UA-235248904-1');
                ReactPixel.init('836996394386059');



              
                store.dispatch(getMainScreenText());
                store.dispatch(getFooterIcons());
                store.dispatch(getCurrencies());
                store.dispatch(ChangeCurrences());
                store.dispatch(getAppConfig());
                
                if (decryptedData) {
                        store.dispatch(getcustomer());
                        store.dispatch(getAddress());
                        store.dispatch(getCartData());
                        store.dispatch(getWishlist());
                }


                store.dispatch(getCartData());
                store.dispatch(recieveSliderimages());
                store.dispatch(fetchHomeBanner());
                
                
                store.dispatch(fetchOrigin());
                // store.dispatch(fetchBestSeller());
                store.dispatch(getContactDetail());
                
                
         

                store.dispatch(fetchMenu());

                
                store.dispatch(getSocialLink());
                store.dispatch(getProductCategory());
                
                

                ReactGA.pageview(window.location.pathname);
                ReactPixel.pageView(window.location.pathname);

                                
        }

        
        


        
        let colorCodesa = localStorage.getItem("color_theme")
        let parsedColorCodesa = colorCodesa && (colorCodesa !== undefined) && JSON.parse(colorCodesa)
        


        // if (document.querySelector(".loader-wrapper").style.display !== "none") {
        //         document.body.style.overflowY = 'hidden';
        //       } else {
        //         document.body.style.overflowY = 'auto';
        //       }

        useEffect(() => {
                const handleVisibilityChange = () => {
                  document.title = document.visibilityState === 'visible'
                    ? 'Welcome back!'
                    : 'Come back .';
                    
                };
                // Add event listener when component mounts
                document.addEventListener('visibilitychange', handleVisibilityChange);
                // Remove event listener when component unmounts
                return () => {
                  document.removeEventListener('visibilitychange', handleVisibilityChange);
                };
                // console.log("kksthththtj",document)
              }, []);

        
        useEffect(() => {
                // store.dispatch(getAllProducts());
                
                document.getElementById("color").setAttribute("href", '../assets/css/color18.css');
               
                const colorCodes = localStorage.getItem("color_theme");
                let parsedColorCodes = colorCodes && (colorCodes !== undefined) && JSON.parse(colorCodes);
                colorCodes && document.querySelector(":root").style.setProperty('--primary-theme-color', parsedColorCodes.color);
                colorCodes && document.querySelector(":root").style.setProperty('--primary-theme-color_rgb', parsedColorCodes.color_rgb);

                document.querySelector(".loader-wrapper").style = "background-color: rgba(255, 255, 255, 1)";
              
                axios.get(base_url + appConfig)
                .then(res => {
                localStorage.setItem("categeories",res.data.data.category_type)
                  const configData = res.data;
                  localStorage.setItem('color_theme', JSON.stringify(configData?.data));
                  
                  document.querySelector(":root").style.setProperty('--primary-theme-color', configData?.data.color);
                
                  document.querySelector(":root").style.setProperty('--primary-theme-color_rgb', configData?.data.color_rgb);
                  
                  
                  var r1 = parseInt(String(configData?.data.color).substr(1,2),16);
                  var g1 = parseInt(String(configData?.data.color).substr(3,2),16);
                  var b1 = parseInt(String(configData?.data.color).substr(5,2),16);
                
                  // calculate relative luminance using sRGB formula
                  var luminance1 = 0.2126 * Math.pow(r1/255, 2.2) + 0.7152 * Math.pow(g1/255, 2.2) + 0.0722 * Math.pow(b1/255, 2.2);
                  
                  let finalDec1 = (luminance1 > 0.5) ? '#000' : '#fff';
                  
                  document.querySelector(":root").style.setProperty('--primary-theme-slider_color', finalDec1);
                  setHeaderType(configData)
                                   
                })
                
                colorCodesa = localStorage.getItem("color_theme")
                parsedColorCodesa = colorCodes  && (colorCodes !== undefined) && JSON.parse(colorCodesa)
                colorCodesa && document.querySelector(":root").style.setProperty('--primary-theme-color', parsedColorCodesa.color);
                colorCodesa && document.querySelector(":root").style.setProperty('--primary-theme-color_rgb', parsedColorCodesa.color_rgb);

                RunDispatch();
                setTimeout(()=>{
                        document.querySelector(".loader-wrapper").style = "display:none";
                },5000);
        }, [])

        setTimeout(()=>{

                // console.clear();
        },4000);


        return (

                <Provider store={store}>


                        <Router  history={history} basename={'/'} >
<>

                                <HeaderThree headerType={headerType}/>

                                <ScrollContext>

<div className={`main_root ${headerType?headerType?.data?.header_type==1? "":"header_type2":""}`} style={{minHeight:"100vh", marginTop: headerType?headerType?.data?.header_type==1? "8%":"5%":"8%"}}>

                                        <Switch>

                                                <Route exact path="/" component={TradnityMain} />

                                                {/* <Layout> */}


                                                        <Route exact path="/product/:id" component={LeftSideBar} />


                                                        <Route exact path="/cart-sidebar" component={CartSidebars} />
                                                        {/*Routes For custom Features*/}
                                                        <Route path="/cart" component={Cart} />
                                                        <Route path="/otp" exact component={Otp} />
                                                        {/* {parsedColorCodesa && parsedColorCodesa?.navbar_wishlist && (parsedColorCodesa.navbar_wishlist === 1)
											? */}
                                                        <PrivateRoute path="/wishlist" component={wishList} />
{/* :null} */}
                                                        <PrivateRoute path="/myOrders" component={MyOrders} />
                                                        <Route path="/privacy-policy" component={PrivacyPolicy} />
                                                        <Route path="/terms" component={TermsandCondition} />



                                                        <PrivateRoute path="/viewDetails" component={ViewDetails} />
                                                        <Route path="/shopPage" component={shopAlgoliaA} />
                                                        <Route path="/NewForgetPassword" component={NewForgetPassword} />
                                                        <Route path="/cartitem" component={CustomizedTooltips} />


                                                        <Route path="/ForgetOtp" component={ForgetOtp} />

                                                        {/*Routes For Extra Pages*/}
                                                        {/* {parsedColorCodesa && parsedColorCodesa?.nav_about && (parsedColorCodesa.nav_about === 1)
											? */}
                                                        <Route path="/about-us" component={aboutUs} />
{/*  :null} */}
                                                        <Route path="/orderNumber" component={OrderNumber} />


                                                        <Route path="/login" component={Login} />
                                                        {/* {parsedColorCodesa && parsedColorCodesa?.nav_about && (parsedColorCodesa.nav_about === 1)
							? */}
                                                        <Route path="/contact" component={Contact} />
                                                        {/* :null} */}
                                                        <Route path="/register" component={registerForm} />
                                                        <PrivateRoute path="/dashboard" component={Dashboard} />
                                                        <PrivateRoute path="/address" component={Address} />
                                                        <PrivateRoute path="/add_address" component={Add_Address} />
                                                        <Route path="/ShippingOptions" component={ShippingOptions} />
                                                        <Route path="/trackOrder" component={ViewTracking} />
                                                        <Route path="/BillingOptions" component={BillingOptions} />
                                                        <PrivateRoute path="/addressEdit" component={AddressEdit} />
                                                        <PrivateRoute path="/addressCard" component={AddressCard} />

                                                        <PrivateRoute path="/profileDetails" component={ProfileDetails} />
                                                        <PrivateRoute path="/ChangePassword" component={ChangePasswordP} />
                                                        <Route path="/forgetPassword" component={ForgetPassword} />
                                                        <Route path="/stripepayment" component={StripePayment} />
                                                        <Route path="/user_email" component={Fbemail} />


                                                {/* </Layout> */}

                                                <Route exact path="*" component={PageNF} />

                                        </Switch>
                                        </div>



                                </ScrollContext>
      
                                        <FooterFour />
</>

                        </Router>


                </Provider>


        )
}

ReactDOM.render(<Root />, document.getElementById('root'));


