import React, { useEffect, useState } from "react";
import "./header1.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import store from "../../../store";
import { FaAngleDown, FaSearch, FaHeart, FaTimes, FaShoppingCart, FaBars } from "react-icons/fa";
import {
  getCartData,
  getLogout,
  userLogoff,
  getWishlist,
  viewOrderDetail,
  getDeals,
  getNewDeals,
  fetchImages,
  getAllProducts,
  getOrders,
} from "../../../actions";
import { fetchBestSeller } from "../../../actions/index";
import { connect } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Placeholder from "../../../svg_code/placeholder";
import axios from "axios";

const Header2 = ({
  getWishlists,
  sociallinks,
  cartData,
  mainScreenText,
  currencies,
  ChangeCurrences,
  appconfigs,
  categories,
  getallcategories,
}) => {
  const [show, setShow] = useState(false);
  const [showA, setShowA] = useState(false);
  const [dispAccount, setDispAccount] = useState(false);
  const [dispCurrunce, setDispCurrence] = useState(false);

  const [drop, setDrop] = useState(false);
  const [profile, setprofile] = useState(false);
  const [data, setDaaataaa] = useState("");
  const [pageRoute, setPageRoute] = useState("");
  const [dataaaaaaaa, setDatataa] = useState("");
  const [stleeeeew, setStleeee] = useState(null);
  const params = useParams();
  const locaaaa = useLocation();

  // New states for subcategories
  const [subCategoriesMap, setSubCategoriesMap] = useState({});
  const [expandedMobileCat, setExpandedMobileCat] = useState(null); // For mobile accordion

  useEffect(() => {
    if (
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      setDrop(true);
    } else if (localStorage.getItem("changeCurrencies") == "EUR") {
      setDatataa(localStorage.getItem("changeCurrencies"));
    } else if (localStorage.getItem("changeCurrencies") == "USD") {
      setDatataa(localStorage.getItem("changeCurrencies"));
    } else if (localStorage.getItem("changeCurrencies") == "PKR") {
      setDatataa(localStorage.getItem("changeCurrencies"));
    }
    localStorage.setItem(
      "defaultDataaa",
      localStorage.getItem("changeCurrencies"),
    );
  }, []);



  useEffect(() => {
    setDaaataaa(localStorage.getItem("changeCurrencies"));
    store.dispatch(fetchImages());
    // setTimeout(() => {
    // this.setState({ apicondtionn: true })
    // localStorage.setItem("apiupdate", this.state.apicondtionn)
    // store.dispatch(getAllProducts());
    store.dispatch(getDeals());
    store.dispatch(getNewDeals());
    if (localStorage.getItem("customerData")) {
      store.dispatch(getOrders());
      store.dispatch(viewOrderDetail());
      store.dispatch(getCartData());
    }
    localStorage.setItem(
      "defaultDataaa",
      localStorage.getItem("changeCurrencies"),
    );
  }, [localStorage.getItem("changeCurrencies")]);
  useEffect(() => {
    if (
      ChangeCurrences &&
      ChangeCurrences.length &&
      !localStorage.getItem("changeCurrencies")
    ) {
      let currency_code = ChangeCurrences.map((v) => v.code);


      axios
        .get("https://ipapi.co/json/")
        .then((res) => {
          let current_currecncy = res.data?.currency;

          if (currency_code.includes(current_currecncy)) {
            localStorage.setItem("changeCurrencies", current_currecncy);
            localStorage.setItem("defaultDataaa", current_currecncy);

            // console.log("1", currency_code, current_currecncy)
          } else if (currency_code.includes("USD")) {
            localStorage.setItem("changeCurrencies", "USD");
            localStorage.setItem("defaultDataaa", "USD");
            // console.log("2", currency_code, current_currecncy)
          } else {
            localStorage.setItem("changeCurrencies", currency_code[0]);
            localStorage.setItem("defaultDataaa", currency_code[0]);
            // console.log("3", currency_code, current_currecncy)
          }
        })
        .catch(() => {
          if (currency_code.includes("PKR")) {
            localStorage.setItem("changeCurrencies", "PKR");
            localStorage.setItem("defaultDataaa", "BHD");
          } else if (currency_code.includes("USD")) {
            localStorage.setItem("changeCurrencies", "USD");
            localStorage.setItem("defaultDataaa", "USD");
          } else {
            localStorage.setItem("changeCurrencies", currency_code[0]);
            localStorage.setItem("defaultDataaa", currency_code[0]);
          }
        });
    }
  }, [ChangeCurrences]);


  useEffect(() => {
    if (localStorage.getItem("customerData")) {
      store.dispatch(getCartData());
      store.dispatch(getWishlist());
    }
  }, [pageRoute]);

  useEffect(() => {
    setPageRoute(window.location.pathname);
  }, []);

  const colorCodes = localStorage.getItem("color_theme");
  let parsedColorCodes = JSON.parse(colorCodes);
  let appconfig =
    parsedColorCodes && parsedColorCodes !== null
      ? parsedColorCodes
      : appconfigs;

  function handleClick(e) {
    document.querySelector(".loader-wrapper").style = "display: block";
    e.preventDefault();
    store.dispatch(getLogout());
    store.dispatch(userLogoff([]));
    localStorage.clear();
  }

  let item_lenght =
    cartData && cartData.items_qty ? cartData.items_qty.length : 0;
  let final_lenght =
    cartData && cartData.items_qty
      ? cartData.items_qty.substring(0, item_lenght - 5)
      : 0;

  useEffect(() => {
    if (!getallcategories?.data || !categories?.length) return;

    const subMap = {};

    categories.forEach((cat) => {
      subMap[cat.id] = getallcategories.data
        .filter((subCat) => subCat.parent_id === cat.id)
        .sort((a, b) => a?.position - b?.position); // 🔥 Descending order
    });

    setSubCategoriesMap(subMap);
  }, [getallcategories, categories]);

  useEffect(() => {
    const customStyle = sociallinks?.nav_style;
    if (customStyle) {
      try {
        const styleObject = JSON.parse(customStyle);
        setStleeee(styleObject);
      } catch (error) {
        console.error("Error parsing nav_style:", error);
      }
    }
  }, [sociallinks?.nav_style]);

  const styleString = sociallinks?.width ?? ""; // Provide a default value if sociallinks?.width is undefined
  const widthh = styleString.match(/width:\s*([^,]+)/)?.[1] || "";
  const heightt = styleString.match(/height:\s*([^,]+)/)?.[1] || "";

  const styleee = { widthh, heightt };
  return (
    <>
      <header className="header_header1 trans_300" style={{ zIndex: 9999999 }}>
        {/* <!-- Top Navigation --> */}

        <div className="top_nav_header1">
          <div className="container_header1">
            <div className="row">
              <div className="col-md-6 text-center">
                {/* <div
                  className="top_nav_left_header1"
                  style={{
                    display:
                      mainScreenText &&
                        mainScreenText.main_text === "none" &&
                        mainScreenText.sub_text === "none"
                        ? "none"
                        : "block",
                  }}
                >
                  {mainScreenText && mainScreenText?.main_text}{" "}
                  {mainScreenText && mainScreenText?.sub_text ? "|" : null}{" "}
                  {mainScreenText && mainScreenText?.sub_text}
                </div> */}
                <div
                  className="top_nav_left_header1"
                  style={{
                    display:
                      mainScreenText &&
                        mainScreenText.main_text === "none" &&
                        mainScreenText.sub_text === "none"
                        ? "none"
                        : "block",
                  }}
                >
                  <span>{mainScreenText && mainScreenText?.main_text}</span>
                  {mainScreenText && mainScreenText?.sub_text && (
                    <>
                      <span style={{ margin: "0 20px" }}>|</span>
                      <span>{mainScreenText?.sub_text}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="col-md-6 text-right">
                <div className="top_nav_right_header1">
                  <ul className="top_nav_menu_header1">
                    <li className="currency_header1">
                      <a
                        onClick={() => {
                          setPageRoute(window.location.pathname);
                          setDispCurrence(!dispCurrunce);
                        }}
                        style={{
                          color: "rgb(255, 255, 255)",
                          fontWeight: 500,
                          cursor: "pointer",
                          fontWeight: "600",
                        }}
                      >
                        {localStorage.getItem("changeCurrencies") || "BHD"}
                        <FaAngleDown
                          style={{
                            fontSize: '12px',          // size adjust kar sakta hai
                            marginLeft: '4px',
                            transition: 'transform 0.2s',  // rotate effect ke liye optional
                            transform: dispCurrunce ? 'rotate(180deg)' : 'rotate(0deg)'  // dropdown open/close pe arrow up/down
                          }}
                        />
                      </a>
                      <ul
                        className="account_selection_header1"
                        style={
                          dispCurrunce
                            ? {
                              zIndex: 9999,
                              visibility: "visible",
                              display: "block",
                              opacity: 1,
                              top: "100%",
                              width: "102%",
                            }
                            : {
                              zIndex: 9999,
                              visibility: "hidden",
                              display: "none",
                              opacity: 0,
                              top: "100%",
                              width: "102%",
                            }
                        }
                      >
                        <>
                          {ChangeCurrences &&
                            ChangeCurrences.length !== 0 &&
                            ChangeCurrences.map((i, v) => {
                              return (
                                <li
                                  className="currency_header1"
                                  key={i + v}
                                  style={{
                                    color: "#232530",
                                    fontSize: "14px",
                                    cursor: "pointer",
                                    backgroundColor: "white",
                                    borderColor: "white",
                                  }}
                                  onClick={() => {
                                    setPageRoute("/dashboard");
                                    localStorage.setItem(
                                      "defaultDataaa",
                                      i?.code,
                                    );
                                    setDispCurrence(!dispCurrunce);
                                    localStorage.setItem(
                                      "changeCurrencies",
                                      i?.code,
                                    );
                                    window.location.reload();

                                    // setDaaataaa(i?.code)
                                    i !== data && setDaaataaa(i?.code);
                                  }}
                                >
                                  {i?.code}
                                </li>
                              );
                            })}
                        </>
                        {/* <>
	<li style={{ color: '#232530', fontSize: '14px', cursor: "pointer" }} onClick={() => {
		setPageRoute('/login')
		setDispCurrence(!dispCurrunce)
	}}><Link to={`${process.env.PUBLIC_URL}/dashboard`}>EUR</Link></li>
	<li style={{ color: '#232530', fontSize: '14px', cursor: "pointer" }} onClick={() => {
		setPageRoute('/register')
		setDispCurrence(!dispCurrunce)
	}}><Link to={`${process.env.PUBLIC_URL}/dashboard`}>USD</Link></li>
</> */}
                      </ul>
                    </li>

                    <li className="account_header1">
                      <a
                        onClick={() => {
                          setPageRoute(window.location.pathname);
                          setDispAccount(!dispAccount);
                        }}
                        style={{
                          color: "#fff",
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                      >
                        My Account
                        {/* <i className="fa fa-angle-down"></i> */}
                        <FaAngleDown
                          style={{
                            fontSize: '12px',          // size adjust kar sakta hai
                            marginLeft: '4px',
                            transition: 'transform 0.2s',  // rotate effect ke liye optional
                            transform: dispAccount ? 'rotate(180deg)' : 'rotate(0deg)'  // dropdown open/close pe arrow up/down
                          }}
                        />
                      </a>
                      <ul
                        className="account_selection_header1"
                        style={
                          dispAccount
                            ? {
                              zIndex: 9999,
                              visibility: "visible",
                              display: "block",
                              opacity: 1,
                              top: "100%",
                            }
                            : {
                              zIndex: 9999,
                              visibility: "hidden",
                              display: "none",
                              opacity: 0,
                              top: "100%",
                            }
                        }
                      >
                        {localStorage.getItem("customerData") ? (
                          <>
                            <li
                              onClick={() => {
                                setPageRoute("/dashboard");
                                setDispAccount(!dispAccount);
                              }}
                            >
                              <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
                                Dashboard
                              </Link>
                            </li>
                            <li
                              onClick={() => {
                                setPageRoute("/myOrders");
                                setDispAccount(!dispAccount);
                              }}
                            >
                              <Link to={`${process.env.PUBLIC_URL}/myOrders`}>
                                My Orders
                              </Link>
                            </li>
                            <li
                              onClick={() => {
                                setPageRoute("/ChangePassword");
                                setDispAccount(!dispAccount);
                              }}
                            >
                              <Link
                                to={`${process.env.PUBLIC_URL}/ChangePassword`}
                              >
                                C Password
                              </Link>
                            </li>
                            <li
                              onClick={() => {
                                setDispAccount(!dispAccount);
                              }}
                            >
                              <Link
                                onClick={handleClick}
                                to={`${process.env.PUBLIC_URL}/`}
                              >
                                Logout
                              </Link>
                            </li>
                          </>
                        ) : (
                          <>
                            <li
                              onClick={() => {
                                setPageRoute("/login");
                                setDispAccount(!dispAccount);
                              }}
                            >
                              <Link to={`${process.env.PUBLIC_URL}/login`}>
                                Sign In
                              </Link>
                            </li>
                            <li
                              onClick={() => {
                                setPageRoute("/register");
                                setDispAccount(!dispAccount);
                              }}
                            >
                              <Link to={`${process.env.PUBLIC_URL}/register`}>
                                Register
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Main Navigation --> */}

        <div className="main_nav_container_header1">
          <div className="container_header1">
            <div className="row">
              <div className="col-lg-12 text-right">
                <nav className="navbar_header1" style={stleeeeew}>
                  <div className="nav_bar_left_mobile">
                    <div
                      className="hamburger_container_header1"
                      onClick={() => setShow(!show)}
                    >
                      {/* <i className="fa fa-bars" aria-hidden="true"></i> */}
                      <FaBars aria-hidden="true" />
                    </div>
                    <ul className="top_nav_menu_header1_mobile">
                      {/* <!-- Currency / Language / My Account --> */}

                      <li className="currency_header1_mobile">
                        <a
                          onClick={() => {
                            setPageRoute(window.location.pathname);
                            setDispCurrence(!dispCurrunce);
                          }}
                          style={{
                            color: "rgb(255, 255, 255)",
                            fontWeight: 500,
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          {localStorage.getItem("changeCurrencies") || "BHD"}

                          <FaAngleDown
                            style={{
                              fontSize: '12px',          // size adjust kar sakta hai
                              marginLeft: '4px',
                              transition: 'transform 0.2s',  // rotate effect ke liye optional
                              transform: dispCurrunce ? 'rotate(180deg)' : 'rotate(0deg)'  // dropdown open/close pe arrow up/down
                            }}
                          />
                        </a>
                        <ul
                          className="account_selection_header1"
                          style={
                            dispCurrunce
                              ? {
                                zIndex: 9999,
                                visibility: "visible",
                                display: "block",
                                opacity: 1,
                                top: "100%",
                                width: "102%",
                              }
                              : {
                                zIndex: 9999,
                                visibility: "hidden",
                                display: "none",
                                opacity: 0,
                                top: "100%",
                                width: "102%",
                              }
                          }
                        >
                          <>
                            {ChangeCurrences &&
                              ChangeCurrences.length !== 0 &&
                              ChangeCurrences.map((i, v) => {
                                return (
                                  <li
                                    className="currency_header1_mobile"
                                    key={i + v}
                                    style={{
                                      color: "#232530",
                                      fontSize: "14px",
                                      cursor: "pointer",
                                      backgroundColor: "white",
                                      borderColor: "white",
                                    }}
                                    onClick={() => {
                                      setPageRoute("/dashboard");
                                      localStorage.setItem(
                                        "defaultDataaa",
                                        i?.code,
                                      );
                                      setDispCurrence(!dispCurrunce);
                                      localStorage.setItem(
                                        "changeCurrencies",
                                        i?.code,
                                      );
                                      window.location.reload();

                                      // setDaaataaa(i?.code)
                                      i !== data && setDaaataaa(i?.code);
                                    }}
                                  >
                                    {i?.code}
                                  </li>
                                );
                              })}
                          </>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <Link
                    onClick={() => setPageRoute("/")}
                    to={`${process.env.PUBLIC_URL}/`}
                  >
                    {sociallinks && sociallinks?.logo ? (
                      <LazyLoadImage
                        width={widthh}
                        height={heightt}
                        className="logoW_header1"
                        src={sociallinks && sociallinks?.logo}
                        alt="Tradnity"
                      />
                    ) : (
                      <div className="skeleton-item skeleton-images"></div>
                    )}
                  </Link>
                  <ul className="navbar_menu_header1">
                    {categories.map((m) => {
                      const subs = subCategoriesMap[m.id] || [];
                      const hasSubs = subs.length > 0;
                      return (
                        <li key={m.id} className={hasSubs ? "has-submenu" : ""}>
                          <Link
                            to={{
                              pathname: "/shopPage",
                              search: `?category=${m.id}`,
                              state: { categories: m },
                            }}
                            style={{ textDecoration: "none", fontSize: "12px" }}
                          >
                            {m.name}
                            {hasSubs && (
                              <FaAngleDown
                                style={{
                                  fontSize: '12px',
                                  marginLeft: '4px',
                                  transition: 'transform 0.2s',
                                }}
                              />
                            )}
                          </Link>
                          {hasSubs && (
                            <ul className="submenu_header1" style={{ textAlign: "left" }}>
                              {subs.map((sub) => (
                                <li style={{ textAlign: "left" }} key={sub.id}>
                                  <Link
                                    to={{
                                      pathname: "/shopPage",
                                      search: `?category=${sub.id}`,
                                      state: { categories: sub },
                                    }}
                                    style={{ textDecoration: "none", fontSize: "12px", textAlign: "left" }}
                                  >
                                    {sub.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}

                    {/* {appconfig &&
                    appconfig?.nav_about &&
                    appconfig.nav_about === 1 ? (
                      <li>
                        <Link
                          onClick={() => setPageRoute("/about-us")}
                          className={
                            pageRoute === "/about-us"
                              ? "activeM_header1"
                              : "effects"
                          }
                          to={`${process.env.PUBLIC_URL}/about-us`}
                        >
                          about
                        </Link>
                      </li>
                    ) : null} */}
                    <li>
                      <Link
                        onClick={() => setPageRoute("/shopPage")}
                        className={
                          pageRoute === "/shopPage"
                            ? "activeM_header1"
                            : "effects"
                        }
                        style={{ textDecoration: "none", fontSize: "12px" }}
                        to={`${process.env.PUBLIC_URL}/shopPage`}
                      >
                        All Products
                      </Link>
                    </li>

                    {appconfig &&
                      appconfig?.nav_contact &&
                      appconfig.nav_contact === 1 ? (
                      <li>
                        <Link
                          onClick={() => setPageRoute("/contact")}
                          className={
                            pageRoute === "/contact"
                              ? "activeM_header1"
                              : "effects"
                          }
                          to={`${process.env.PUBLIC_URL}/contact`}
                        >
                          contact
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                  <ul className="navbar_user_header1">
                    <li className="checkout_header1 mx-1">
                      <Link
                        className="ancd ancx"
                        onClick={() => setPageRoute("/shopPage")}
                        to={`${process.env.PUBLIC_URL}/shopPage`}
                      >
                        {/* <i className="fa fa-search" aria-hidden="true"></i>{" "} */}
                        <FaSearch aria-hidden="true" />{" "}
                      </Link>
                    </li>
                    <li className="checkout_header1 mx-1">
                      <div className="cartsia">
                        <a
                          className="ancd ancx"
                          onClick={() => {
                            setPageRoute(window.location.pathname);
                            setprofile(!profile);
                          }}
                        >
                          <FaShoppingCart aria-hidden="true" />
                          {final_lenght && final_lenght !== 0 ? (
                            <span
                              id="checkout_items"
                              className="checkout_items"
                            >
                              {final_lenght}
                            </span>
                          ) : null}
                        </a>
                        <ul
                          className="cart-list_header1"
                          style={
                            profile ? { display: "block" } : { display: "none" }
                          }
                        >
                          <div
                            style={{
                              maxHeight: 250,
                              overflowY: "auto",
                              overflowX: "hidden",
                            }}
                          >
                            <br />
                            {cartData &&
                              cartData.items &&
                              cartData.items.length !== 0 ? (
                              cartData.items.map((item, index) => {
                                return (
                                  <li
                                    className="dats"
                                    key={index}
                                    style={{ display: "block" }}
                                  >
                                    <div className="row m-2">
                                      <div className="col-md-4">
                                        <Link
                                          to={`${process.env.PUBLIC_URL
                                            }/product/${item && item.parent_url !== null
                                              ? item.parent_url
                                              : item.product.url_key
                                            }`}
                                        >
                                          {item.product !== "" &&
                                            item.product.images[0].url ? (
                                            <LazyLoadImage
                                              alt="img"
                                              src={
                                                item?.product !== "" &&
                                                item?.product?.images[0]?.url
                                              }
                                              style={{
                                                width: "80px",
                                                height: "80px",
                                                padding: "7px",
                                                paddingTop: "0px",
                                              }}
                                            />
                                          ) : (
                                            <div
                                              style={{
                                                width: "80px",
                                                height: "80px",
                                                padding: "7px",
                                                paddingTop: "0px",
                                              }}
                                            >
                                              <Placeholder />
                                            </div>
                                          )}
                                        </Link>
                                      </div>

                                      <div className="col-md-8">
                                        <div className="row">
                                          <div
                                            className="col-md-12"
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-evenly",
                                            }}
                                          >
                                            <Link
                                              to={`${process.env.PUBLIC_URL
                                                }/product/${item && item.parent_url !== null
                                                  ? item.parent_url
                                                  : item.product.url_key
                                                }`}
                                            >
                                              <p
                                                className="cart-text fw-bold"
                                                style={{ lineHeight: "20px" }}
                                              >
                                                {item.name}
                                              </p>
                                            </Link>
                                          </div>
                                          <div className="col-md-6 col-md-6">
                                            <p> {item.formated_price}</p>
                                          </div>
                                          <div className="col-md-6 col-md-6 quantityHeader">
                                            <p> x{item.quantity}</p>
                                          </div>
                                        </div>
                                      </div>
                                      <hr />
                                    </div>
                                  </li>
                                );
                              })
                            ) : (
                              <section className="cart-section section-b-space">
                                <div className="container_header1">
                                  <div className="row">
                                    <div className="col-sm-12 empty-cart-cls text-center">
                                      <h3 className="headCart">
                                        <strong>Your Cart is Empty</strong>
                                      </h3>
                                      <h4>
                                        Explore more shortlist some items.
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                              </section>
                            )}
                          </div>

                          {cartData &&
                            cartData.items &&
                            cartData.items.length !== 0 ? (
                            <li
                              className="total dats "
                              style={{ display: "block" }}
                            >
                              <span className="pull-right fw-bold">
                                Total:{" "}
                                {cartData && cartData.formated_grand_total}
                              </span>
                              <br />
                              <br />
                              <div className="text-center">
                                <Link
                                  to="/cart"
                                  onClick={() => setprofile(!profile)}
                                  className="btn btn-sm btn-cart p-2 mx-2"
                                >
                                  View Cart
                                </Link>
                                <Link
                                  to="/cart-sidebar"
                                  onClick={() => setprofile(!profile)}
                                  className="btn btn-sm btn-checkout_header1 p-2 mx-2"
                                >
                                  Checkout
                                </Link>
                              </div>
                            </li>
                          ) : null}
                        </ul>
                      </div>
                    </li>
                    {appconfig &&
                      appconfig?.navbar_wishlist &&
                      appconfig.navbar_wishlist === 1 ? (
                      <li className="checkout_header1 mx-1">
                        <Link
                          className="ancd ancx"
                          to={`${process.env.PUBLIC_URL}/wishlist`}
                        >
                          {/* <i className="fa fa-heart" aria-hidden="true"></i> */}
                          <FaHeart aria-hidden="true" />
                          {getWishlists && getWishlists.length !== 0 ? (
                            <span
                              id="checkout_items"
                              className="checkout_items"
                            >
                              {getWishlists.length}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ) : null}
                  </ul>
                  {/* <div className="hamburger_container_header1" onClick={() => setShow(!show)}>
										<i className="fa fa-bars" aria-hidden="true"></i>
									</div> */}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="fs_menu_overlay_header1"></div>
      <div
        style={{ display: show ? "block" : "none" }}
        className={
          show ? "hamburger_menu_header1 active" : "hamburger_menu_header1"
        }
      >
        <div className="hamburger_menu_content_header1 text-center">
          <div
            className="hamburger_close_header1 my-5 py-5"
            onClick={() => setShow(!show)}
          >
            {/* <i className="fa fa-times" aria-hidden="true"></i> */}
            <FaTimes aria-hidden="true" />
          </div>

          <ul className="menu_top_nav">
            <br />
            <br />

            <li className="menu_item_header1">
              <Link
                to={`${process.env.PUBLIC_URL}/`}
                className={
                  pageRoute === "/" ? "activeM_header1 MobActive" : "effects"
                }
                onClick={() => {
                  setPageRoute("/");
                  setShow(!show);
                }}
              >
                homesss
              </Link>
            </li>
            {categories.map((m) => {
              const subs = subCategoriesMap[m.id] || [];
              const hasSubs = subs.length > 0;
              const isExpanded = expandedMobileCat === m.id;
              return (
                <li
                  key={m.id}
                  className={
                    hasSubs
                      ? "menu_item_header1 has-children" + (isExpanded ? " active" : "")
                      : "menu_item_header1"
                  }
                  style={{
                    padding: "8px 0",          // 👈 Top bottom spacing between categories
                    borderBottom: "1px solid #eee"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      padding: "6px 12px"       // 👈 Inner spacing
                    }}
                  >
                    {/* CATEGORY NAME */}
                    <Link
                      to={{
                        pathname: "/shopPage",
                        search: `?category=${m.id}`,
                        state: { categories: m },
                      }}
                      style={{
                        textDecoration: "none",
                        flex: 1,
                        color: "#333"
                      }}
                      onClick={() => setShow(false)}
                    >
                      {m.name}
                    </Link>

                    {/* ARROW ICON */}
                    {hasSubs && (
                      <div
                        onClick={() =>
                          setExpandedMobileCat(isExpanded ? null : m.id)
                        }
                        style={{
                          marginLeft: "8px",     // 👈 Text aur arrow ka gap
                          padding: "6px",        // 👈 Clickable area bada
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <FaAngleDown
                          style={{
                            fontSize: "14px",
                            transition: "transform 0.3s ease",
                            transform: isExpanded
                              ? "rotate(180deg)"
                              : "rotate(0deg)"
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* SUB MENU */}
                  {hasSubs && (
                    <ul
                      className="menu_selection"
                      style={{
                        overflow: "hidden",
                        transition: "max-height 0.3s ease",
                        maxHeight: isExpanded ? `${subs.length * 49}px` : 0,
                        paddingLeft: "20px",     // 👈 Sub category indent
                        background: "#fafafa"
                      }}
                    >
                      {subs.map((sub) => (
                        <li
                          key={sub.id}
                          style={{
                            padding: "8px 0"
                          }}
                        >
                          <Link
                            to={{
                              pathname: "/shopPage",
                              search: `?category=${sub.id}`,
                              state: { categories: sub },
                            }}
                            style={{
                              textDecoration: "none",
                              fontSize: "12px",
                              color: "#555"
                            }}
                            onClick={() => setShow(false)}
                          >
                            {sub.name}
                          </Link>

                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}

            {/* {appconfig && appconfig?.nav_about && appconfig.nav_about === 1 ? (
              <li className="menu_item_header1">
                <Link
                  to={`${process.env.PUBLIC_URL}/about-us`}
                  className={
                    pageRoute === "/about-us"
                      ? "activeM_header1 MobActive"
                      : "effects"
                  }
                  onClick={() => {
                    setPageRoute("/about-us");

                    setShow(!show);
                  }}
                >
                  about
                </Link>
              </li>
            ) : null} */}

            {/* <li className="menu_item_header1">
              <Link
                to={`${process.env.PUBLIC_URL}/shopPage`}
                className={
                  pageRoute === "/shopPage"
                    ? "activeM_header1 MobActive"
                    : "effects"
                }
                onClick={() => {
                  setPageRoute("/shopPage");

                  setShow(!show);
                }}
              >
                shop
              </Link>
            </li> */}

            {appconfig &&
              appconfig?.nav_contact &&
              appconfig.nav_contact === 1 ? (
              <li className="menu_item_header1">
                <Link
                  to={`${process.env.PUBLIC_URL}/contact`}
                  className={
                    pageRoute === "/contact"
                      ? "activeM_header1 MobActive"
                      : "effects"
                  }
                  onClick={() => {
                    setPageRoute("/contact");

                    setShow(!show);
                  }}
                >
                  contact
                </Link>
              </li>
            ) : null}

            <li
              className={
                showA
                  ? "menu_item_header1 has-children active"
                  : "menu_item_header1 has-children"
              }
            >
              <a onClick={() => setShowA(!showA)}>
                My Account
                {/* <i className="fa fa-angle-down"></i> */}
                <FaAngleDown
                  style={{
                    fontSize: '14px',              // size adjust kar sakta hai (12px–16px common)
                    transition: 'transform 0.3s ease',  // smooth rotate
                    transform: showA ? 'rotate(180deg)' : 'rotate(0deg)'  // open pe up, close pe down
                  }}
                />
              </a>
              <ul
                className="menu_selection"
                style={showA ? { maxHeight: "101px" } : null}
              >
                {localStorage.getItem("customerData") ? (
                  <>
                    <li>
                      <Link
                        to={`${process.env.PUBLIC_URL}/dashboard`}
                        className={
                          pageRoute === "/dashboard"
                            ? "activeM_header1 MobActive"
                            : "effects"
                        }
                        onClick={() => {
                          setPageRoute("/dashboard");

                          setShow(!show);
                        }}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`${process.env.PUBLIC_URL}/myOrders`}
                        className={
                          pageRoute === "/myOrders"
                            ? "activeM_header1 MobActive"
                            : "effects"
                        }
                        onClick={() => {
                          setPageRoute("/myOrders");

                          setShow(!show);
                        }}
                      >
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`${process.env.PUBLIC_URL}/ChangePassword`}
                        className={
                          pageRoute === "/ChangePassword"
                            ? "activeM_header1 MobActive"
                            : "effects"
                        }
                        onClick={() => {
                          setPageRoute("/ChangePassword");

                          setShow(!show);
                        }}
                      >
                        C Password
                      </Link>
                    </li>
                    <li onClick={() => setShow(!show)}>
                      <Link
                        onClick={handleClick}
                        to={`${process.env.PUBLIC_URL}/`}
                      >
                        Logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to={`${process.env.PUBLIC_URL}/login`}
                        className={
                          pageRoute === "/login"
                            ? "activeM_header1 MobActive"
                            : "effects"
                        }
                        onClick={() => {
                          setPageRoute("/login");
                          setShow(!show);
                        }}
                      >
                        Sign In
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`${process.env.PUBLIC_URL}/register`}
                        className={
                          pageRoute === "/register"
                            ? "activeM_header1 MobActive"
                            : "effects"
                        }
                        onClick={() => {
                          setPageRoute("/register");
                          setShow(!show);
                        }}
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {drop ? "" : <div style={{ paddingBottom: "25px" }} />}
    </>
  );
};
function mapStateToProps(state) {
  return {
    getWishlists: state.wishlist.getwishlist
      ? state.wishlist.getwishlist.data
      : [],
    sociallinks: state.contactDetails.socialLinks,
    cartData: state.cartList.getcartdata ? state.cartList.getcartdata.data : "",
    mainScreenText: state?.user?.mainScreenText
      ? state?.user?.mainScreenText
      : "",
    currencies: state?.user?.currencies ? state?.user?.currencies : "",
    ChangeCurrences: state?.user?.changeCurrences
      ? state?.user?.changeCurrences
      : "",
    appconfigs: state?.user?.config ? state?.user?.config : "",
    categories: state.data.menu,
    getallcategories: state.data.getCategory,
  };
}
export default connect(mapStateToProps, null)(Header2);