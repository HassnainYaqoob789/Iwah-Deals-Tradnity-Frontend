import React, { Component } from "react";
import "../../common/index.scss";
import { connect } from "react-redux";
import Slider from "react-slick";
import Cookies from "js-cookie";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Product4 } from "../../../services/script";
import history from "../../../history";
import womeneastern2 from "../../../assets/images/EASTERN FEMALE banner.png";
import menarabicImg from "../../../assets/images/menarabic22.png";
import menarabicImg2 from "../../../assets/images/12.png";
import menarabicImgWomenAccess from "../../../assets/images/Women accessories.png";
import menarabicImgMenAccess from "../../../assets/images/Men accessories.png";
import gadgetsNewImg from "../../../assets/images/gadgetnews.png";
import houseHoldGadgets from "../../../assets/images/House Hold Gadgets.png";
import banner5 from "../../../assets/images/banners/impression_banner5.png";
import banner1 from "../../../assets/images/banners/eastern_banner1.png";
import Placeholder from "../../../svg_code/placeholder";
import Service from "./../../../../src/components/products/common/service";
// CSS
import "react-toastify/dist/ReactToastify.css";

import Demoimage from "../../../assets/images/placeholderC.gif";

// Import custom components

import {
  fetchImages,
  getAllProducts,
  FetchCategByProducts,
  sendSubscriberEmail,
  removeWishlist,
  addItemToCart,
  fetchBestSeller,
} from "../../../actions";
import store from "../../../store";
import ProductItem from "./product-item";
import Collection from "./collection";
import TradnityCarousel from "./carousel";
import Collection2 from "./collection2";
import Notification from "../../../Notification";
import ScrollToTop from "../../pages/scroll_to_top";
import CategoriesImage from "./categoriesImage";
import { Product433 } from "../../../services/script";
import CustomChatbot from "../../chatbot/CustomChatbot";
import Loader from "../../../svg_code/loader";
import LoaderSpinner from "../../../components/loadingspin"
import SliderLoader from "../../../svg_code/sliderLoader";
import HeadSEO from "./headSEO";
import { Link } from "react-router-dom";

import bannerGif from "../../../assets/images/banners/webBanner7.gif";

const PAGE_WRAP = {
  width: "100%",
  maxWidth: "93rem",        // 1400px → rem
  margin: "0 auto",
  padding: "0 clamp(1rem, 3.5vw, 3rem)",  // 16px → 48px in rem
  boxSizing: "border-box",
};

const V_GAP = {
  marginTop: "clamp(1.75rem, 4.5vw, 4rem)",   // 28px → 64px
  marginBottom: "clamp(1.75rem, 4.5vw, 4rem)",
};

const BANNER_TO_COLLECTION = {
  marginBottom: "clamp(1rem, 2.5vw, 2rem)",       // 16px → 32px
};

const COLLECTION_GAP = {
  marginTop: "clamp(1rem, 2.5vw, 2rem)",          // 16px → 32px
};

const BANNER_IMG = {
  width: "100%",
  maxWidth: "100%",
  display: "block",
  borderRadius: "1rem",                            // 16px → rem
};

class TradnityMain extends Component {




  constructor(props) {
    super(props);
    this.counterT = 0;
    this.counterB = 0;

    this.state = {
      loadingCategory: true,
      loadingTop: true,
      apicondtionn: false,
      loadingBottom: true,
      subscribeModal: true,
      checkstatus: Cookies.get("SubscribeModal"),
      subscriberEmail: "",
      notification_token: true,
      check_notificaton: Cookies.get("Notification_token"),
      loading: true,
      carousel: "",
      productsLoading: true, // new state for products loading
    };
  }

  // API controlled loading
  setLoading = (value) => {
    this.setState({ productsLoading: value });
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log("Products loading state changed:", this.state.productsLoading);
  }

  componentDidMount() {
    const paramsObj = {
      token: "true",
      currency: localStorage.getItem("changeCurrencies"),
      order: "asc",
      // category_id: 6,
    };
    // store.dispatch(FetchCategByProducts({ params: paramsObj }));
    store.dispatch(fetchImages());
    // setTimeout(() => {
    // this.setState({ apicondtionn: true })
    // localStorage.setItem("apiupdate", this.state.apicondtionn)
    store.dispatch(getAllProducts(null, null, this.setLoading));
    // store.dispatch(fetchBestSeller());

    // }, 120000);
  }

  imageTopLoaded = () => {
    this.counterT += 1;
    if (this.counterT >= 1) {
      this.setState({ loadingTop: false });
    }
  };

  imageBottomLoaded = () => {
    this.counterB += 1;
    if (this.counterB >= 1) {
      this.setState({ loadingBottom: false });
    }
  };

  closeModal = () => {
    Cookies.set("SubscribeModal", true, { expires: 1 });
  };

  //

  render() {
    const {
      categories,
      user,
      appconfigs,
      getcatebyproducts,
      getallcategories,
      symbol,
    } = this.props;
    const {
      subscriberEmail,
      checkstatus,
      check_notificaton,
      loadingTop,
      loadingBottom,
    } = this.state;


    const { productsLoading } = this.state;

    // Agar products loading ho rahe hain → loader show karo
    if (productsLoading) {
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
          <SliderLoader />
        </div>
      );
    }
    // const category6Products = getcatebyproducts?.filter((product) =>
    //   product.category?.some((cat) => cat.category_id === 6),
    // );

    // console.log("checkcatebyprodd", category6Products);
    const colorCodes = localStorage.getItem("color_theme");
    const parsedColorCodes = JSON.parse(colorCodes);
    const appconfig = parsedColorCodes !== null ? parsedColorCodes : appconfigs;

    if (categories && categories.length === 0) {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 4000);
    }

    const sendEmail = () => {
      const { subscriberEmail } = this.state;
      const obj = {
        email: subscriberEmail,
      };
      store.dispatch(sendSubscriberEmail(obj));
      this.closeModal();
    };

    const top = user.sliderBannner
      ? user.sliderBannner.filter((data) => data.title === "Banner Top")
      : [];
    const bottom = user.sliderBannner
      ? user.sliderBannner.filter((data) => data.title === "Banner Bottom")
      : [];

    /* Custom prev / next arrows */
    const PrevArrow = ({ onClick }) => (
      <button className="col-arrow col-arrow-prev" onClick={onClick}>
        &#8249;
      </button>
    );
    const NextArrow = ({ onClick }) => (
      <button className="col-arrow col-arrow-next" onClick={onClick}>
        &#8250;
      </button>
    );

    const sliderSettings = {
      ...Product4,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
    };

    function handleClick(e) {
      store.dispatch(removeWishlist(e));
    }
    function addItemTOCart(e) {
      document.querySelector(".loader-wrapper").style = "display: block";
      var item = { product_id: e, quantity: 1 };
      store.dispatch(addItemToCart(item));
    }

    let obj9shopPage = getallcategories?.data?.filter((e) => e?.id == "9")[0] || {};
    let obj10shopPage = getallcategories?.data?.filter((e) => e?.id == "10")[0] || {};
    let obj13shopPage = getallcategories?.data?.filter((e) => e?.id == "13")[0] || {};
    let obj15shopPage = getallcategories?.data?.filter((e) => e?.id == "15")[0] || {};
    let obj12shopPage = getallcategories?.data?.filter((e) => e?.id == "12")[0] || {};
    let obj20shopPage = getallcategories?.data?.filter((e) => e?.id == "20")[0] || {};
    let obj6shopPage = getallcategories?.data?.filter((e) => e?.id == "6")[0] || {};
    let obj17shopPage = getallcategories?.data?.filter((e) => e?.id == "17")[0] || {};

    const items = [

      /* ── 1. Main carousel ── */
      {
        ids: 1,
        id: appconfig?.slider_option,
        text:
          appconfig?.slider === 1 ? (
            /* No horizontal padding on the full-bleed slider */
            <div style={{ width: "100%", margin: "0", ...V_GAP, padding: 0, marginBottom: "0px !important" }}>
              <TradnityCarousel image={user} />
            </div>
          ) : null,
      },

      /* ── 2. GIF banner ── */
      {
        ids: 2,
        id: appconfig?.slider_option,
        text:
          appconfig?.slider === 1 ? (
            <div style={{ ...PAGE_WRAP, ...V_GAP, marginTop: "0px !important", marginBottom: "0px !important" }}>
              <LazyLoadImage
                placeholder={<SliderLoader />}
                className="imgHeightT"
                src={bannerGif}
                alt="Promotional banner"
                style={BANNER_IMG}
                width="100%"
                height="auto"
              />
            </div>
          ) : null,
      },

      /* ── 3. Category icons ── */
      /* ── 3. Category icons ── */
      /* ── 3. Category icons ── */
      {
        ids: 3,
        id: appconfig?.slider_option,
        text: (
          <>
            {appconfig?.categories === 1 ? (
              <section style={{ ...PAGE_WRAP, ...V_GAP }}>
                {categories && categories.length !== 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "16px",
                      paddingBottom: "12px",
                      paddingTop: "4px",
                    }}
                  >
                    {categories.map((m) => (
                      <div
                        key={m.id}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          width: "130px",
                        }}
                      >
                        <Link
                          to={{ pathname: "/shopPage", search: `?category=${m.id}`, state: { categories: m } }}
                          style={{ textDecoration: "none", width: "100%" }}
                        >
                          {/* Icon Box - overflow visible taake image bahar nikale */}
                          <div
                            style={{
                              width: "130px",
                              height: "130px",
                              borderRadius: "20px",
                              overflow: "visible",
                              position: "relative",
                            }}
                          >
                            <img
                              loading="lazy"
                              style={{
                                position: "absolute",
                                bottom: "-41px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "110%",
                                height: "145%",
                                objectFit: "contain",
                                objectPosition: "bottom",
                                display: "block",
                              }}
                              src={m?.category_icon_path}
                              alt="Category"
                            />
                          </div>

                          {/* Category Name */}
                          <div style={{ textAlign: "center", marginTop: "36px" }}>
                            <h3
                              style={{
                                textTransform: "uppercase",
                                fontSize: "0.75rem",
                                margin: "0",
                                color: "#8B0000",
                                fontWeight: "700",
                                lineHeight: "1.3",
                                letterSpacing: "0.02em",
                                whiteSpace: "normal",
                                wordBreak: "break-word",
                              }}
                            >
                              {m.name}
                            </h3>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: "center", marginTop: "7%", marginBottom: "7%" }}>
                    <Loader />
                  </div>
                )}
              </section>
            ) : null}
          </>
        ),
      },

      /* ── 4. Best Selling Products ── */
      {
        ids: 4,
        id: appconfig?.new_arrival_option,
        text:
          appconfig?.new_arrival === 1 ? (
            <div style={{ ...PAGE_WRAP, ...V_GAP }}>
              <Collection type="new" title="Best Selling Products" />
            </div>
          ) : null,
      },

      /* ── 5. Top banner + Women collections ──
         Banner and both Collection2s share the SAME PAGE_WRAP so left/right edges match exactly */
      {
        ids: 5,
        id: appconfig?.banner1_option,
        text: (
          <>
            {top.length !== 0 && appconfig?.banner1 === 1 &&
              top.map((res, key) => (
                <div key={key} style={{ ...PAGE_WRAP, ...V_GAP }}>
                  {/* Banner image */}
                  <div style={BANNER_TO_COLLECTION}>
                    <Link
                      to={{
                        pathname: "/shopPage",
                        search: `?category=${obj9shopPage.id}`,
                        state: { categories: obj9shopPage },
                      }}
                    >
                      <LazyLoadImage
                        placeholder={<SliderLoader />}
                        className="imgHeightT"
                        src={res?.image_url}
                        alt="Banner"
                        style={BANNER_IMG}
                        width="100%"
                      />
                    </Link>
                  </div>

                  {/* Arabic Collection – Women (same wrapper = same edges as banner) */}
                  {appconfig?.featured === 1 && (
                    <>
                      <Collection2
                        type="isfeatured"
                        title="Arabic Collection"
                        subtitle="Womens Wear"
                        categoryID="9"
                        SeeAllProductsBtnCdn={true}
                      />
                      <div style={BANNER_TO_COLLECTION}>
                        <Link
                          to={{
                            pathname: "/shopPage",
                            search: `?category=${obj10shopPage.id}`,
                            state: { categories: obj10shopPage },
                          }}
                        >
                          <LazyLoadImage
                            placeholder={<SliderLoader />}
                            className="imgHeightT"
                            src={womeneastern2}
                            alt="Banner"
                            style={BANNER_IMG}
                            width="100%"
                          />
                        </Link>
                      </div>
                      <div style={COLLECTION_GAP}>
                        <Collection2
                          type="isfeatured"
                          title="Eastern Collection"
                          subtitle="Womens Wear"
                          categoryID="10"
                          SeeAllProductsBtnCdn={true}

                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
          </>
        ),
      },

      /* ── 6. Bottom banner + Men collections ── */
      {
        ids: 6,
        id: appconfig?.banner2_option,
        text: (
          <>
            {bottom.length !== 0 && appconfig?.banner2 === 1 &&
              bottom.map((res, key) => (
                <div key={key} style={{ ...PAGE_WRAP, ...V_GAP }}>
                  {/* Banner image */}
                  <div style={BANNER_TO_COLLECTION}>
                    <Link
                      to={{
                        pathname: "/shopPage",
                        search: `?category=${obj13shopPage.id}`,
                        state: { categories: obj13shopPage },
                      }}
                    >
                      <LazyLoadImage
                        placeholder={<SliderLoader />}
                        className="imgHeightT"
                        src={menarabicImg}
                        alt="Banner"
                        style={BANNER_IMG}
                        width="100%"
                      />
                    </Link>
                  </div>

                  {/* Arabic & Eastern – Men (same wrapper = same edges as banner) */}
                  {appconfig?.featured === 1 && (
                    <>
                      <Collection2
                        type="isfeatured"
                        title="Arabic Collections"
                        subtitle="Men's Wear"
                        categoryID="13"
                        SeeAllProductsBtnCdn={true}

                      />
                      <div style={BANNER_TO_COLLECTION}>
                        <Link
                          to={{
                            pathname: "/shopPage",
                            search: `?category=${obj15shopPage.id}`,
                            state: { categories: obj15shopPage },
                          }}
                        >
                          <LazyLoadImage
                            placeholder={<SliderLoader />}
                            className="imgHeightT"
                            src={menarabicImg2}
                            alt="Banner"
                            style={BANNER_IMG}
                            width="100%"
                          />
                        </Link>
                      </div>
                      <div style={COLLECTION_GAP}>
                        <Collection2
                          type="isfeatured"
                          title="Eastern Collections"
                          subtitle="Men's Wear"
                          categoryID="15"
                          SeeAllProductsBtnCdn={true}

                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
          </>
        ),
      },

      /* ── 7. Accessories (banner2 + Women + Men) ── */
      {
        ids: 7,
        id: appconfig?.featured_option,
        text:
          appconfig?.featured === 1 ? (
            <div style={{ ...PAGE_WRAP, ...V_GAP }}>
              <div style={BANNER_TO_COLLECTION}>
                <Link
                  to={{
                    pathname: "/shopPage",
                    search: `?category=${obj12shopPage.id}`,
                    state: { categories: obj12shopPage },
                  }}
                >
                  <LazyLoadImage
                    src={menarabicImgWomenAccess}
                    effect="opacity"
                    className="pic2-images"
                    style={BANNER_IMG}
                    width="100%"
                    placeholder={<Placeholder />}
                  />
                </Link>
              </div>
              <Collection2
                type="isfeatured"
                title="Accessories"
                subtitle="Women's Wear"
                categoryID="12"
                SeeAllProductsBtnCdn={true}

              />
              <div style={BANNER_TO_COLLECTION}>
                <Link
                  to={{
                    pathname: "/shopPage",
                    search: `?category=${obj20shopPage.id}`,
                    state: { categories: obj20shopPage },
                  }}
                >
                  <LazyLoadImage
                    src={menarabicImgMenAccess}
                    effect="opacity"
                    className="pic2-images"
                    style={BANNER_IMG}
                    width="100%"
                    placeholder={<Placeholder />}
                  />
                </Link>
              </div>
              <div style={COLLECTION_GAP}>
                <Collection2
                  type="isfeatured"
                  title="Accessories"
                  subtitle="Men's Wear"
                  categoryID="20"
                  SeeAllProductsBtnCdn={true}

                />
              </div>
            </div>
          ) : null,
      },

      /* ── 8. Gadgets ── */
      {
        ids: 8,
        id: appconfig?.featured_option,
        text:
          appconfig?.featured === 1 ? (
            <div style={{ ...PAGE_WRAP, ...V_GAP }}>
              <div style={BANNER_TO_COLLECTION}>
                <Link
                  to={{
                    pathname: "/shopPage",
                    search: `?category=${obj6shopPage.id}`,
                    state: { categories: obj6shopPage },
                  }}
                >
                  <LazyLoadImage
                    src={gadgetsNewImg}
                    effect="opacity"
                    className="pic2-images"
                    style={BANNER_IMG}
                    width="100%"
                    placeholder={<Placeholder />}
                  />
                </Link>
              </div>
              <Collection2 type="isfeatured" title="Gadgets" categoryID="6"
                SeeAllProductsBtnCdn={true}
              />
            </div>
          ) : null,
      },

      /* ── 9. Household Items ── */
      {
        ids: 9,
        id: appconfig?.featured_option,
        text:
          appconfig?.featured === 1 ? (
            <div style={{ ...PAGE_WRAP, ...V_GAP }}>
              <div style={BANNER_TO_COLLECTION}>
                <Link
                  to={{
                    pathname: "/shopPage",
                    search: `?category=${obj17shopPage.id}`,
                    state: { categories: obj17shopPage },
                  }}
                >
                  <LazyLoadImage
                    src={houseHoldGadgets}
                    effect="opacity"
                    className="pic2-images"
                    style={BANNER_IMG}
                    width="100%"
                    placeholder={<Placeholder />}
                  />
                </Link>
              </div>
              <Collection2
                type="isfeatured"
                title="Houshold Items"
                categoryID="17"
                SeeAllProductsBtnCdn={true}

              />
            </div>
          ) : null,
      },

      // /* ── 10. Home Decor + Boys Clothing ── */
      // {
      //   id: appconfig?.featured_option,
      //   text:
      //     appconfig?.featured === 1 ? (
      //       <div style={{ ...PAGE_WRAP, ...V_GAP }}>
      //         <div style={BANNER_TO_COLLECTION}>
      //           <LazyLoadImage
      //             src={banner5}
      //             effect="opacity"
      //             className="pic2-images"
      //             style={BANNER_IMG}
      //             width="100%"
      //             placeholder={<Placeholder />}
      //           />
      //         </div>
      //         <Collection2
      //           type="isfeatured"
      //           title="Home Decor"
      //           categoryID="8"
      //         />
      //         <div style={COLLECTION_GAP}>
      //           <Collection2
      //             type="isfeatured"
      //             title="Boys Clothing"
      //             categoryID="14"
      //           />
      //         </div>
      //       </div>
      //     ) : null,
      // },

      /* ── 11. Subscribe / Service ── */
      {
        ids: 10,
        id: appconfig?.subscribe_option,
        text: (
          <>
            {this.state.checkstatus !== true && appconfig?.subscribe === 1 ? (
              <div style={{ ...PAGE_WRAP, ...V_GAP }}>
                <Service />
              </div>
            ) : null}
          </>
        ),
      },
    ];

    // const sortedItems = items.sort((a, b) => a.ids - b.ids);
    const sortedItems = [...items].sort((a, b) => a.ids - b.ids);

    return (
      <div>
        <ScrollToTop />
        {this.state.notification_token === true &&
          this.state.check_notificaton !== "true" ? (
          <>
            <Notification />
            {this.setState({ notification_token: false })}
            {Cookies.set("Notification_token", true, { expires: 10 })}
          </>
        ) : null}
        <HeadSEO title="Home" />
        <div style={{ marginTop: "132px" }} />
        {sortedItems.map((item, index) => (
          <div key={index}>{item.text}</div>
        ))}

        <CustomChatbot />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.images,
  categories: state.data.menu,
  appconfigs: state?.user?.config ?? "",
  getcatebyproducts: state.categoryByProducts.getcatebyproducts,
  symbol: state.data.symbol,
  getallcategories: state.data.getCategory,

});

export default connect(mapStateToProps)(TradnityMain);
