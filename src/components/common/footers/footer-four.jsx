import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SlideUpDown } from "../../../services/script"
import "./footer.css"
import { Link } from 'react-router-dom';
import ScrollToTop from '../../pages/scroll_to_top';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from 'react-icons/fa';  // ← fa6 has modern X logo
class FooterFour extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '' };
    }

    componentDidMount() {
        var contentwidth = window.innerWidth;
        if ((contentwidth) < 750) {
            SlideUpDown('slide-up');
        } else {
            var elems = document.querySelectorAll(".footer-title");
            [].forEach.call(elems, function (elemt) {
                let el = elemt.nextElementSibling;
                el.style = "display: block";
            });
        }
    }

    render() {
        const { sociallinks, contactDetails, categories, appconfigs, footerIcons } = this.props;

        const colorCodes = localStorage.getItem("color_theme");
        let parsedColorCodes = JSON.parse(colorCodes);
        let appconfig = parsedColorCodes && (parsedColorCodes !== null) ? parsedColorCodes : appconfigs;

        const styleString = sociallinks?.width ?? '';
        const widthh = styleString.match(/width:\s*([^,]+)/)?.[1] || '';
        const heightt = styleString.match(/height:\s*([^,]+)/)?.[1] || '';

        let checkPaymentArr = (paymentA) => paymentA.type === "payment";
        let checkShippingArr = (shipmentA) => shipmentA.type === "shipping";

        let paymentArr = footerIcons && (footerIcons.length !== 0) && footerIcons.filter(checkPaymentArr);
        let shippingArr = footerIcons && (footerIcons.length !== 0) && footerIcons.filter(checkShippingArr);

        const shopName = parsedColorCodes?.shop_name || (appconfigs?.shop_name) || '';
        const address = contactDetails?.data?.address || '';
        const phone = contactDetails?.data?.phone || '';
        const email = contactDetails?.data?.email || '';

        return (
            <footer className="footer-new" style={{ bottom: 0, width: "100%", left: 0 }}>
                <ScrollToTop />

                {/* Newsletter Section */}
                <div className="footer-newsletter-bar">
                    <div className="footer-newsletter-inner">
                        <div className="footer-newsletter-text">
                            <h2>Sign Up To Our Newsletter.</h2>
                            <p>Be the first to hear about the latest offers.</p>
                        </div>
                        <div className="footer-newsletter-form">
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={this.state.email}
                                onChange={(e) => this.setState({ email: e.target.value })}
                                className="footer-email-input"
                            />
                            <button className="footer-subscribe-btn">Subscribe</button>
                        </div>
                    </div>
                </div>

                {/* Main Footer Body */}
                <div className="footer-main-body">
                    <div className="footer-columns">

                        {/* Column 1: Information */}
                        <div className="footer-col">
                            <h4 className="footer-col-title">Information</h4>
                            <ul className="footer-col-links">
                                <li><Link to={`${process.env.PUBLIC_URL}/about-us`}>About Us</Link></li>
                                {/* <li><Link to={`${process.env.PUBLIC_URL}/`}>About Zip</Link></li> */}
                                <li><Link to={`${process.env.PUBLIC_URL}/privacy-policy`}>Return Policy</Link></li>
                                {/* <li><Link to={`${process.env.PUBLIC_URL}/shopPage`}>Search</Link></li> */}
                                <li><Link to={`${process.env.PUBLIC_URL}/terms`}>Terms & Conditions</Link></li>
                                {/* <li><Link to={`${process.env.PUBLIC_URL}/myOrders`}>Orders and Returns</Link></li> */}
                                {/* {appconfig?.nav_contact === 1 && (
                                    // <li><Link to={`${process.env.PUBLIC_URL}/contact`}>Contact Us</Link></li>
                                )} */}
                                {/* <li><Link to={`${process.env.PUBLIC_URL}/shopPage`}>Advanced Search</Link></li>
                                <li><Link to={`${process.env.PUBLIC_URL}/`}>Newsletter Subscription</Link></li> */}
                            </ul>
                        </div>

                        {/* Column 2: Categories / New Arrivals */}
                        <div className="footer-col">
                            <h4 className="footer-col-title">
                                {appconfig?.footer_new_arrival === 1 ? 'New Arrival' : 'Categories'}
                            </h4>
                            <ul className="footer-col-links">
                                {categories && categories.length !== 0
                                    ? (categories.length < 6 ? categories.slice(0, categories.length) : categories.slice(0, 6)).map((m, i) => (
                                        <li key={i}>
                                            <Link to={{ pathname: "/shopPage", state: { categories: m } }}>
                                                {m.name}
                                            </Link>
                                        </li>
                                    ))
                                    : <li>Loading...</li>
                                }
                            </ul>
                        </div>

                        {/* Column 3: Quick Links */}
                        <div className="footer-col">
                            <h4 className="footer-col-title">Quick Links</h4>
                            <ul className="footer-col-links">
                                {/* <li><Link to={`${process.env.PUBLIC_URL}/shopPage`}>Shop</Link></li> */}
                                {appconfig?.nav_contact === 1 && (
                                    <li><Link to={`${process.env.PUBLIC_URL}/contact`}>Contact</Link></li>
                                )}
                                <li><Link to={`${process.env.PUBLIC_URL}/`}>Home</Link></li>
                                {appconfig?.footer_accounts === 1 && (
                                    <>
                                        <li><Link to={`${process.env.PUBLIC_URL}/dashboard`}>My Account</Link></li>
                                        <li><Link to={`${process.env.PUBLIC_URL}/myOrders`}>My Orders</Link></li>
                                    </>
                                )}
                            </ul>
                        </div>

                        {/* Column 4: Follow Us */}
                        {appconfig?.footer_follow_us === 1 && (
                            // <div className="footer-col">
                            <div className="footer-col follow-us-col d-flex flex-column align-items-center">
                                <h4 className="footer-col-title">FOLLOW US</h4>
                                <ul className="footer-col-links social-icons-list">
                                    {sociallinks && sociallinks.data ? (
                                        <>
                                            {/* Facebook */}
                                            {sociallinks.data[0]?.is_active === 1 && (
                                                <li>
                                                    <a
                                                        href={contactDetails?.data?.facebook_page || "/#"}
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                        aria-label="Facebook"
                                                        className="social-link facebook"
                                                    >
                                                        <FaFacebookF size={18} /> {/* slightly larger for better visibility */}
                                                    </a>
                                                </li>
                                            )}

                                            {/* Instagram */}
                                            {sociallinks.data[1]?.is_active === 1 && (
                                                <li>
                                                    <a
                                                        href={contactDetails?.data?.instagram_page || "/#"}
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                        aria-label="Instagram"
                                                        className="social-link instagram"
                                                    >
                                                        <FaInstagram size={18} />
                                                    </a>
                                                </li>
                                            )}

                                            {/* TikTok */}
                                            {sociallinks.data[2]?.is_active === 1 && (
                                                <li>
                                                    <a
                                                        href={contactDetails?.data?.twitter_page || "/#"}
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                        aria-label="TikTok"
                                                        className="social-link tiktok"
                                                    >
                                                        <FaTiktok size={18} />
                                                    </a>
                                                </li>
                                            )}
                                            {sociallinks.data[3]?.is_active === 1 && (
                                                <li>
                                                    <a
                                                        href={
                                                            contactDetails?.data?.whatsapp_number
                                                                ? `https://wa.me/${contactDetails.data.whatsapp_number}`
                                                                : "/#"
                                                        }
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                        aria-label="WhatsApp"
                                                        className="social-link whatsapp"
                                                    >
                                                        <FaWhatsapp size={18} />
                                                    </a>
                                                </li>
                                            )}

                                            {/* YouTube (uncomment if you want to add it later) */}
                                            {/* {sociallinks.data[3]?.is_active === 1 && (
            <li>
              <a
                href={contactDetails?.data?.youtube_page || "/#"}
                rel="noopener noreferrer"
                target="_blank"
                aria-label="YouTube"
                className="social-link youtube"
              >
                <FaYoutube size={28} />
              </a>
            </li>
          )} */}
                                        </>
                                    ) : (
                                        <li>No Links Found</li>
                                    )}
                                </ul>
                            </div>
                        )}
                        {/* Column 5: Address */}
                        <div className="footer-col">
                            <h4 className="footer-col-title">Address</h4>
                            <div className="footer-address-block">
                                {email && (
                                    <p className="footer-address-line">
                                        E-mail: <a style={{ fontWeight: "bold" }} href={`mailto:${email}`}>{email}</a>
                                    </p>
                                )}

                                <p className="cr-no-heading footer-address-line company-info">
                                    <strong>IWAHDEALS TRADING</strong>
                                    <span className="cr-number font-weight-bold fontsize-16">CR: 176652-3</span>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-bottom-bar">
                    {/* Social Icons (left) */}
                    <div className="footer-bottom-social">
                        {sociallinks?.data && (
                            <>
                                {sociallinks.data[0]?.is_active === 1 && (
                                    <a href={contactDetails?.data?.facebook_page || "/#"} rel="noopener noreferrer" target="_blank" className="footer-social-icon-link">
                                        <LazyLoadImage alt="facebook" src={sociallinks.data[0].icon} width={28} height={28} />
                                    </a>
                                )}
                                {sociallinks.data[1]?.is_active === 1 && (
                                    <a href={contactDetails?.data?.instagram_page || "/#"} rel="noopener noreferrer" target="_blank" className="footer-social-icon-link">
                                        <LazyLoadImage alt="instagram" src={sociallinks.data[1].icon} width={28} height={28} />
                                    </a>
                                )}
                                {/* Static TikTok icon – always show (or wrap in condition if you add backend later) */}
                                <a
                                    href="https://www.tiktok.com/@iwahdeals.com"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="footer-social-icon-link"
                                    aria-label="Follow us on TikTok"
                                >
                                    <svg
                                        width="28"
                                        height="28"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-1.875 4.793 4.793 0 0 1-1.021-3.003h-3.195v13.59a2.88 2.88 0 1 1-2.88-2.88c.226 0 .445.026.655.075V9.345a6.07 6.07 0 0 0-.655-.036 6.075 6.075 0 1 0 6.075 6.075V8.736a8.02 8.02 0 0 0 4.79 1.593V6.686z" />
                                    </svg>
                                </a>
                            </>
                        )}
                    </div>

                    {/* Payment Icons (center) */}
                    {/* <div className="footer-bottom-payments">
                        {paymentArr && paymentArr !== false && paymentArr.length !== 0 && paymentArr.map((m, i) => (
                            m?.is_active === 1 && (
                                <LazyLoadImage key={i} style={{ height: 28, marginRight: 6 }} src={m?.icon} alt="payment" />
                            )
                        ))}
                    </div> */}

                    {/* Copyright (right) */}
                    <div className="footer-bottom-copy">
                        <span>
                            Copyright &copy; {new Date().getFullYear()} {shopName} | Powered By{' '}
                            <a style={{ color: '#fff', fontWeight: '700', textDecoration: 'underline' }} rel="noopener noreferrer" href='https://tradnity.com/' target="_blank">Tradnity</a>
                        </span>
                    </div>
                </div>
            </footer>
        );
    }
}

const mapStateToProps = (state) => ({
    sociallinks: state.contactDetails.socialLinks,
    contactDetails: state.contactDetails.contactDetails,
    categories: state.data.menu,
    appconfigs: (state?.user?.config) ? state?.user?.config : '',
    footerIcons: state?.user?.footerIcons,
});

export default connect(mapStateToProps)(FooterFour);