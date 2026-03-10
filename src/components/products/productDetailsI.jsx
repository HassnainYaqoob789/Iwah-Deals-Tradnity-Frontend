import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
} from "react-share";
import ReactStars from "react-rating-stars-component";
import ProductImagesSlider from "./productSlider/productSlider";
import { IoArrowBack } from 'react-icons/io5';   // ya FiArrowLeft from 'react-icons/fi' — dono acha lagta hai
import ScrollToTop from "../pages/scroll_to_top";
import Demoimg from "../../assets/images/placeholder.gif";
import Collection3 from "../layouts/tradnity/collection3";
import Heart from "react-heart";
import Loader from "../../svg_code/loader";
import LoaderSpinner from "../../components/loadingspin"

import React, { useEffect, useRef, useState } from "react";
import Service from "./common/service";
import store from "../../store";
import { FiShoppingCart } from "react-icons/fi";
import DetailsTopTabs from "./common/details-top-tabs";
import {
  removeWishlist,
  addItemToCart,
  fetchReviews,
  getAllProducts,
} from "../../actions";
import _ from "lodash";
import PeopleViewed from "../layouts/tradnity/peopleViewed";
import { Link, useLocation } from "react-router-dom";
import { Modal, Button } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { connect } from "react-redux";
import history from "../../history";
import Placeholder from "../../svg_code/placeholder";
import HeadSEO from "../layouts/tradnity/headSEO";
import "../../assets/css/custom.css";

const ProductDetailsMe = (props) => {
  let {
    item,
    pathName,
    shortView,
    currencies,
    appconfigs,
    CutLoading,
    // LoadingSSS,
    contactDetails,
  } = props;
  const myurl = window.location.href;
  const modalRef = useRef();
  const initialState = [];
  const locaaaa = useLocation();
  const queryParams = new URLSearchParams(locaaaa.search);
  const [LoadingSSS, setLoadingSSSS] = useState(true);
  const [gData, setGData] = useState(initialState);
  // console.log("dataaaaaaaa", item);
  async function minFunc() {
    for (let va = 0; va < item?.api?.grouped_products.length; va++) {
      await initialState.push({
        id: item?.api?.grouped_products[va].id,
        qty: Number(item?.api?.grouped_products[va].qty),
        url_key: item?.api?.grouped_products[va]?.parent?.url_key
          ? item?.api?.grouped_products[va]?.parent?.url_key
          : item?.api?.grouped_products[va].url_key,
        name: item?.api?.grouped_products[va].name,
      });
    }
  }
  if (item?.api?.grouped_products && item?.api?.grouped_products.length !== 0) {
    minFunc();
  }

  const DeductGQty = (pid) => {
    // 👇️ passing function to setGData method
    setGData((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === pid) {
          return { ...obj, qty: obj.qty === 0 ? 0 : obj.qty - 1 };
        }
        return obj;
      });

      return newState;
    });
  };

  const AddGQty = (pid) => {
    // 👇️ passing function to setGData method
    setGData((prevState) => {
      const newState = prevState.map((obj) => {
        if (obj.id === pid) {
          return { ...obj, qty: obj.qty + 1 };
        }
        return obj;
      });

      return newState;
    });
  };

  const colorCodes = localStorage.getItem("color_theme");
  let parsedColorCodes = JSON.parse(colorCodes);
  let appconfig =
    parsedColorCodes && parsedColorCodes !== null
      ? parsedColorCodes
      : appconfigs;

  function add_wishlist(e) {
    store.dispatch(removeWishlist(e));
  }
  const [validateC, setValidateC] = useState(false);

  const [myTestArr, setMyTestArr] = useState({});
  let allKeys = Object.keys(myTestArr);

  const [qty, setqty] = useState(1);
  const [wishlisted, setWishlisted] = useState(item.wishlist);
  const [image, setImage] = useState(
    item.api.images ? item.api.images : Demoimg,
  );
  const [name, setname] = useState(item.name);
  const [shortDetails, setshortDetails] = useState(item.shortDetails);
  const [rprice, setRprice] = useState(
    item.api.formated_regular_price ? item.api.formated_regular_price : "",
  );
  const [price, setprice] = useState(item.price);
  const [ratingI, setRatingI] = useState(
    item.api.reviews.average_rating ? item.api.reviews.average_rating : "0.0",
  );
  const [totalI, setTotalI] = useState(
    item.api.reviews.total ? item.api.reviews.total : "0",
  );
  const [p_id, setp_id] = useState(item.id);
  const [drop, setDrop] = useState(false);
  const [sp_price, set_sp_price] = useState(0);
  const [ff_price, set_ff_price] = useState(0);

  const [loadingImg, setLoadingImg] = useState(true);
  const counter = useRef(0);

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= 1) {
      setLoadingImg(false);
    }
  };

  const LoadNow = () => {
    setImage(item.api.images ? item.api.images : "");
    setname(item.name);
    setshortDetails(item.shortDetails);
    setprice(item.price);
    setp_id(item.id);
    setRatingI(item.api.reviews.average_rating);
    setLoadingImg(true);
    setTotalI(item.api.reviews.total);
    setRprice(
      item.api.formated_regular_price ? item.api.formated_regular_price : "",
    );
    setGData(initialState);
    store.dispatch(fetchReviews(item?.api.id));
    if (item?.api?.is_variant === 0) {
      setValidateC(false);
    }
  };

  useEffect(() => {
    LoadNow();
  }, [window.location.pathname]);

  const addItemTOCart = async (e) => {
    document.querySelector(".loader-wrapper").style = "display: block";
    var item;
    var groupP;
    let dataaaa;
    if (Array.isArray(gData) && gData.length !== 0) {
      item = { product_id: `${e}`, quantity: qty };
      dataaaa = gData.map(
        (da) => (groupP = { ...groupP, [da.id]: da.qty.toString() }),
      );
    } else {
      item = { product_id: e, quantity: qty };
      await store.dispatch(addItemToCart(item));
      setqty(1);
    }

    // let mostQ = { qty: dataaaa[dataaaa.length - 1] };
    // const children = { ...item, ...mostQ };
    // if (Array.isArray(gData) && gData.length !== 0) {
    //   await store.dispatch(addItemToCart(children));
    // }
    modalRef.current && modalRef.current.setProps({ visible: false });
  };

  const getvariant = async (e, code) => {
    if ((allKeys && allKeys.length !== 0) || code) {
      item &&
        item.api &&
        item.api.variants &&
        item.api.variants
          .filter((item) => {
            if (allKeys.length >= 0 || code) {
              if (allKeys.length === 0) {
                return item[code] == e;
              }
              if (allKeys.length === 1) {
                if (allKeys.find((keya) => keya == code)) {
                  myTestArr[code] = e;
                }

                return (
                  item[allKeys[0]] == myTestArr[allKeys[0]] && item[code] == e
                );
              }
              if (allKeys.length === 2) {
                if (allKeys.find((keya) => keya == code)) {
                  myTestArr[code] = e;
                }

                return (
                  item[allKeys[0]] == myTestArr[allKeys[0]] &&
                  item[allKeys[1]] == myTestArr[allKeys[1]] &&
                  item[code] == e
                );
              }
              if (allKeys.length === 3) {
                if (allKeys.find((keya) => keya == code)) {
                  myTestArr[code] = e;
                }

                return (
                  item[allKeys[0]] == myTestArr[allKeys[0]] &&
                  item[allKeys[1]] == myTestArr[allKeys[1]] &&
                  item[allKeys[2]] == myTestArr[allKeys[2]] &&
                  item[code] == e
                );
              }
              if (allKeys.length === 4) {
                if (allKeys.find((keya) => keya == code)) {
                  myTestArr[code] = e;
                }

                return (
                  item[allKeys[0]] == myTestArr[allKeys[0]] &&
                  item[allKeys[1]] == myTestArr[allKeys[1]] &&
                  item[allKeys[2]] == myTestArr[allKeys[2]] &&
                  item[allKeys[3]] == myTestArr[allKeys[3]] &&
                  item[code] == e
                );
              }
              if (allKeys.length === 5) {
                if (allKeys.find((keya) => keya == code)) {
                  myTestArr[code] = e;
                }

                return (
                  item[allKeys[0]] == myTestArr[allKeys[0]] &&
                  item[allKeys[1]] == myTestArr[allKeys[1]] &&
                  item[allKeys[2]] == myTestArr[allKeys[2]] &&
                  item[allKeys[3]] == myTestArr[allKeys[3]] &&
                  item[allKeys[4]] == myTestArr[allKeys[4]] &&
                  item[code] == e
                );
              }
              if (allKeys.length === 6) {
                if (allKeys.find((keya) => keya == code)) {
                  myTestArr[code] = e;
                }

                return (
                  item[allKeys[0]] == myTestArr[allKeys[0]] &&
                  item[allKeys[1]] == myTestArr[allKeys[1]] &&
                  item[allKeys[2]] == myTestArr[allKeys[2]] &&
                  item[allKeys[3]] == myTestArr[allKeys[3]] &&
                  item[allKeys[4]] == myTestArr[allKeys[4]] &&
                  item[allKeys[5]] == myTestArr[allKeys[5]] &&
                  item[code] == e
                );
              }
              if (allKeys.length === 7) {
                if (allKeys.find((keya) => keya == code)) {
                  myTestArr[code] = e;
                }

                return (
                  item[allKeys[0]] == myTestArr[allKeys[0]] &&
                  item[allKeys[1]] == myTestArr[allKeys[1]] &&
                  item[allKeys[2]] == myTestArr[allKeys[2]] &&
                  item[allKeys[3]] == myTestArr[allKeys[3]] &&
                  item[allKeys[4]] == myTestArr[allKeys[4]] &&
                  item[allKeys[5]] == myTestArr[allKeys[5]] &&
                  item[allKeys[6]] == myTestArr[allKeys[6]] &&
                  item[code] == e
                );
              }
              if (allKeys.length === 8) {
                if (allKeys.find((keya) => keya == code)) {
                  myTestArr[code] = e;
                }

                return (
                  item[allKeys[0]] == myTestArr[allKeys[0]] &&
                  item[allKeys[1]] == myTestArr[allKeys[1]] &&
                  item[allKeys[2]] == myTestArr[allKeys[2]] &&
                  item[allKeys[3]] == myTestArr[allKeys[3]] &&
                  item[allKeys[4]] == myTestArr[allKeys[4]] &&
                  item[allKeys[5]] == myTestArr[allKeys[5]] &&
                  item[allKeys[6]] == myTestArr[allKeys[6]] &&
                  item[allKeys[7]] == myTestArr[allKeys[7]] &&
                  item[code] == e
                );
              }
              if (allKeys.length === 9) {
                if (allKeys.find((keya) => keya == code)) {
                  myTestArr[code] = e;
                }

                return (
                  item[allKeys[0]] == myTestArr[allKeys[0]] &&
                  item[allKeys[1]] == myTestArr[allKeys[1]] &&
                  item[allKeys[2]] == myTestArr[allKeys[2]] &&
                  item[allKeys[3]] == myTestArr[allKeys[3]] &&
                  item[allKeys[4]] == myTestArr[allKeys[4]] &&
                  item[allKeys[5]] == myTestArr[allKeys[5]] &&
                  item[allKeys[6]] == myTestArr[allKeys[6]] &&
                  item[allKeys[7]] == myTestArr[allKeys[7]] &&
                  item[allKeys[8]] == myTestArr[allKeys[8]] &&
                  item[code] == e
                );
              }
              if (allKeys.length === 10) {
                if (allKeys.find((keya) => keya == code)) {
                  myTestArr[code] = e;
                }

                return (
                  item[allKeys[0]] == myTestArr[allKeys[0]] &&
                  item[allKeys[1]] == myTestArr[allKeys[1]] &&
                  item[allKeys[2]] == myTestArr[allKeys[2]] &&
                  item[allKeys[3]] == myTestArr[allKeys[3]] &&
                  item[allKeys[4]] == myTestArr[allKeys[4]] &&
                  item[allKeys[5]] == myTestArr[allKeys[5]] &&
                  item[allKeys[6]] == myTestArr[allKeys[6]] &&
                  item[allKeys[7]] == myTestArr[allKeys[7]] &&
                  item[allKeys[8]] == myTestArr[allKeys[8]] &&
                  item[allKeys[9]] == myTestArr[allKeys[9]] &&
                  item[code] == e
                );
              }
              if (allKeys.length === 11) {
                if (allKeys.find((keya) => keya == code)) {
                  myTestArr[code] = e;
                }

                return (
                  item[allKeys[0]] == myTestArr[allKeys[0]] &&
                  item[allKeys[1]] == myTestArr[allKeys[1]] &&
                  item[allKeys[2]] == myTestArr[allKeys[2]] &&
                  item[allKeys[3]] == myTestArr[allKeys[3]] &&
                  item[allKeys[4]] == myTestArr[allKeys[4]] &&
                  item[allKeys[5]] == myTestArr[allKeys[5]] &&
                  item[allKeys[6]] == myTestArr[allKeys[6]] &&
                  item[allKeys[7]] == myTestArr[allKeys[7]] &&
                  item[allKeys[8]] == myTestArr[allKeys[8]] &&
                  item[allKeys[9]] == myTestArr[allKeys[9]] &&
                  item[allKeys[10]] == myTestArr[allKeys[10]] &&
                  item[code] == e
                );
              }
              if (allKeys.length === 12) {
                if (allKeys.find((keya) => keya == code)) {
                  myTestArr[code] = e;
                }

                return (
                  item[allKeys[0]] == myTestArr[allKeys[0]] &&
                  item[allKeys[1]] == myTestArr[allKeys[1]] &&
                  item[allKeys[2]] == myTestArr[allKeys[2]] &&
                  item[allKeys[3]] == myTestArr[allKeys[3]] &&
                  item[allKeys[4]] == myTestArr[allKeys[4]] &&
                  item[allKeys[5]] == myTestArr[allKeys[5]] &&
                  item[allKeys[6]] == myTestArr[allKeys[6]] &&
                  item[allKeys[7]] == myTestArr[allKeys[7]] &&
                  item[allKeys[8]] == myTestArr[allKeys[8]] &&
                  item[allKeys[9]] == myTestArr[allKeys[9]] &&
                  item[allKeys[10]] == myTestArr[allKeys[10]] &&
                  item[allKeys[11]] == myTestArr[allKeys[11]] &&
                  item[code] == e
                );
              }
              if (allKeys.length === 13) {
                if (allKeys.find((keya) => keya == code)) {
                  myTestArr[code] = e;
                }

                return (
                  item[allKeys[0]] == myTestArr[allKeys[0]] &&
                  item[allKeys[1]] == myTestArr[allKeys[1]] &&
                  item[allKeys[2]] == myTestArr[allKeys[2]] &&
                  item[allKeys[3]] == myTestArr[allKeys[3]] &&
                  item[allKeys[4]] == myTestArr[allKeys[4]] &&
                  item[allKeys[5]] == myTestArr[allKeys[5]] &&
                  item[allKeys[6]] == myTestArr[allKeys[6]] &&
                  item[allKeys[7]] == myTestArr[allKeys[7]] &&
                  item[allKeys[8]] == myTestArr[allKeys[8]] &&
                  item[allKeys[9]] == myTestArr[allKeys[9]] &&
                  item[allKeys[10]] == myTestArr[allKeys[10]] &&
                  item[allKeys[11]] == myTestArr[allKeys[11]] &&
                  item[allKeys[12]] == myTestArr[allKeys[12]] &&
                  item[code] == e
                );
              }
              if (allKeys.length === 14) {
                if (allKeys.find((keya) => keya == code)) {
                  myTestArr[code] = e;
                }

                return (
                  item[allKeys[0]] == myTestArr[allKeys[0]] &&
                  item[allKeys[1]] == myTestArr[allKeys[1]] &&
                  item[allKeys[2]] == myTestArr[allKeys[2]] &&
                  item[allKeys[3]] == myTestArr[allKeys[3]] &&
                  item[allKeys[4]] == myTestArr[allKeys[4]] &&
                  item[allKeys[5]] == myTestArr[allKeys[5]] &&
                  item[allKeys[6]] == myTestArr[allKeys[6]] &&
                  item[allKeys[7]] == myTestArr[allKeys[7]] &&
                  item[allKeys[8]] == myTestArr[allKeys[8]] &&
                  item[allKeys[9]] == myTestArr[allKeys[9]] &&
                  item[allKeys[10]] == myTestArr[allKeys[10]] &&
                  item[allKeys[11]] == myTestArr[allKeys[11]] &&
                  item[allKeys[12]] == myTestArr[allKeys[12]] &&
                  item[allKeys[13]] == myTestArr[allKeys[13]] &&
                  item[code] == e
                );
              }
              if (allKeys.length === 15) {
                if (allKeys.find((keya) => keya == code)) {
                  myTestArr[code] = e;
                }

                return (
                  item[allKeys[0]] == myTestArr[allKeys[0]] &&
                  item[allKeys[1]] == myTestArr[allKeys[1]] &&
                  item[allKeys[2]] == myTestArr[allKeys[2]] &&
                  item[allKeys[3]] == myTestArr[allKeys[3]] &&
                  item[allKeys[4]] == myTestArr[allKeys[4]] &&
                  item[allKeys[5]] == myTestArr[allKeys[5]] &&
                  item[allKeys[6]] == myTestArr[allKeys[6]] &&
                  item[allKeys[7]] == myTestArr[allKeys[7]] &&
                  item[allKeys[8]] == myTestArr[allKeys[8]] &&
                  item[allKeys[9]] == myTestArr[allKeys[9]] &&
                  item[allKeys[10]] == myTestArr[allKeys[10]] &&
                  item[allKeys[11]] == myTestArr[allKeys[11]] &&
                  item[allKeys[12]] == myTestArr[allKeys[12]] &&
                  item[allKeys[13]] == myTestArr[allKeys[13]] &&
                  item[allKeys[14]] == myTestArr[allKeys[14]] &&
                  item[code] == e
                );
              }
            }
          })

          .map((value) => {
            let priceV =
              value &&
              value.price &&
              value.price.substring(0, value.price.length - 2);
            let priceVsp =
              value.special_price !== null
                ? value.special_price.substring(
                  0,
                  value.special_price.length - 2,
                )
                : 0;
            set_ff_price(1);
            setname(value.name);
            setImage(
              value.images && value.images.length !== 0 ? value.images : "",
            );
            setshortDetails(value.short_description);
            setprice(`${currencies.code} ${priceV}`);
            setp_id(value.id);
            set_sp_price(priceVsp);
            // const variantPrices = item.api.active_variant.original.data.variant_prices;
            // const idToFind =  891;

            // const foundObject = Object.values(variantPrices).find(obj => obj.id === idToFind);

            const variantPrices =
              item.api.active_variant.original.data.variant_prices;
            const foundObject = variantPrices?.[value?.id];
            if (
              foundObject?.final_price?.formated_price ==
              foundObject?.regular_price?.formated_price
            ) {
              setprice(foundObject?.final_price?.formated_price);
              set_sp_price(foundObject?.final_price?.formated_price);
              setRprice(0);
              // alert("same priceee")
            } else {
              set_sp_price(foundObject?.final_price?.formated_price);
              setRprice(foundObject?.regular_price?.formated_price);
              // setprice(foundObject.regular_price.formated_price)
            }
          });
    }
  };

  const getFilteredOptionListByFirstSelectedItem = (
    allOptions,
    options,
    selected,
  ) => {
    const firstSelect = allOptions[0];
    const firstSelectedValue = selected[firstSelect?.code];
    const selectedProductIds =
      firstSelect?.options.find((v) => v?.id == firstSelectedValue)?.products ||
      [];

    // If we're rendering the same control, just return all its options
    if (firstSelect?.code === options?.code) {
      return options.options || [];
    }

    // Otherwise, only return those options whose `products` array
    // contains at least one of the selectedProductIds
    if (selectedProductIds.length > 0) {
      return (options.options || []).filter(
        (opt) =>
          Array.isArray(opt.products) &&
          opt.products.some((productId) => {
            return selectedProductIds.includes(productId);
          }),
      );
    }

    // No selected products → empty list
    return [];
  };

  const getNumberFromQuery = (value) => {
    if (!value) return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  };

  useEffect(() => {
    if (
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      setDrop(true);
    }
    const colorCodes = localStorage.getItem("color_theme");
    let parsedColorCodes = JSON.parse(colorCodes);
    let appconfig =
      parsedColorCodes && parsedColorCodes !== null
        ? parsedColorCodes
        : appconfigs;

    setLoadingSSSS(true)
    const categoryPId = getNumberFromQuery(queryParams.get("category"));
    const productPId = getNumberFromQuery(queryParams.get("product"));


    let categoryId = locaaaa?.state?.category_ids || categoryPId || null;
    let productId = locaaaa?.state?.product_id || productPId || null;
    // let productId = false || null;
    store.dispatch(getAllProducts(categoryId, productId, setLoadingSSSS));
  }, [contactDetails, colorCodes]);

  document.querySelector(".loader-wrapper").style = "display: none";
  // Check if loading
  const isLoading = LoadingSSS

  // Loading UI
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center", // horizontal center
          alignItems: "center",     // vertical center
          height: "100vh",          // viewport height
        }}
      >
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />

      {!shortView && <HeadSEO title={name} />}
      <div className={!drop && !shortView ? "row px-5 container-custom" : "row mx-0 px-0 container-custom"}>
        {drop ? (
          <div className="col-md-2"></div>
        ) : (
          !shortView && (
            <div className="px-5" style={{ marginTop: 90 }}>
              <Service />
            </div>
          )
        )}

        <div className="img-select row" style={{ marginTop: "3rem" }}>
          <div className="firstDiv col-md-4 col-sm-12">
            {shortView ? (
              <>
                {image && image.length !== 0 && typeof image[0] == "string" ? (
                  <LazyLoadImage
                    src={image && image[0]}
                    style={{
                      width: "100%",
                      height: "auto",
                      border: "1px solid rgb(236 132 95 / 50%)",
                      display: "block",
                    }}
                  />
                ) : image &&
                  image.length !== 0 &&
                  image[0]?.original_image_url ? (
                  <LazyLoadImage
                    src={
                      image &&
                      image.length !== 0 &&
                      image[0]?.original_image_url
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "1px solid rgb(236 132 95 / 50%)",
                      display: "block",

                    }}
                  />
                ) : (
                  <span
                    style={{
                      width: "100%",
                      border: "1px solid rgb(236 132 95 / 50%)",
                    }}
                  >
                    <Placeholder />
                  </span>
                )}
                {/* <LazyLoadImage src={image && (image.length !== 0) && (typeof(image[0]) == "string") ? image[0] : image[0]?.original_image_url ? image[0].original_image_url : Demoimg}  style={{width:"100%", height:"100%",border:'1px solid rgb(236 132 95 / 50%)'}} /> */}
              </>
            ) : (
              <ProductImagesSlider
                images={image}
                item={item}
                imageLoad={() => imageLoaded()}
                imageStyle={{ width: "100%", height: "auto", objectFit: "contain" }} // ✅ pass this

              />
            )}

            {/* </div> */}
          </div>
          <div className="product-content col-md-8 col-sm-12">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                className="product-title headP head2"
                style={{ display: "flex", alignItems: "center" }}
              >
                {name}

                {item && item.api && item.api.Discount_Percentage ? (
                  <div className="product-labels">
                    <strong className="label sale-label">
                      -{item.api.Discount_Percentage}
                    </strong>
                  </div>
                ) : null}
              </h2>
              <div
                className="skeleton-item skeleton-titleH2"
                style={
                  loadingImg
                    ? { display: "block", marginTop: 20 }
                    : { display: "none" }
                }
              ></div>

              {appconfig &&
                appconfig?.navbar_wishlist &&
                appconfig.navbar_wishlist === 1 ? (
                <div style={{ width: "40px" }}>
                  {loadingImg ? (
                    <div
                      className="skeleton-item skeleton-titleHEART"
                      style={{ marginTop: 20 }}
                    ></div>
                  ) : (
                    <Heart
                      isActive={wishlisted}
                      style={{ marginTop: 20 }}
                      onClick={() => {
                        if (localStorage.getItem("customerData")) {
                          add_wishlist(p_id);
                          setWishlisted(!wishlisted);
                        } else {
                          history.push(`${process.env.PUBLIC_URL}/login`);
                        }
                      }}
                    />
                  )}
                </div>
              ) : null}
            </div>

            <br />
            {loadingImg ? (
              <div className="skeleton-item skeleton-titleS"></div>
            ) : (
              <div className="product_average-ratings__score ">
                <ReactStars
                  count={5}
                  size={24}
                  isHalf={true}
                  value={Number(ratingI)}
                  edit={false}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                  activeColor="#ffd700"
                />

                <span className="product_average-ratings__stars px-2">
                  ({ratingI})({totalI})
                </span>
              </div>
            )}

            <div
              className="product-price my-3"
              style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
              }}
            >
              {loadingImg ? (
                <div className="skeleton-item skeleton-titleP my-1"></div>
              ) : (
                <>
                  {sp_price == 0 ? (
                    <p className="new-price fs-5">
                      Price:{" "}
                      <span className="px-1 text-danger">
                        {" "}
                        {price && price}
                      </span>
                    </p>
                  ) : null}
                  {sp_price == 0 && ff_price == 0 ? (
                    <p className="last-price fs-5">
                      {" "}
                      &nbsp;{" "}
                      <span className="px-1 text-danger">
                        {" "}
                        {rprice !== "" && rprice}
                      </span>
                    </p>
                  ) : null}
                  {/* <p className="last-price fs-5"> &nbsp; <span className="px-1 text-danger"> {rprice !== "" && rprice}</span></p>{(item.api.is_variant === 1) ? <span style={{ color: "#566F74", fontWeight:"500",marginTop:"-20px",fontSize:"18px" }}>As Low as</span> : null} */}
                  {sp_price !== 0 ? (
                    <>
                      {" "}
                      <p className="new-price fs-5">
                        Price:{" "}
                        <span className="px-1 text-danger"> {sp_price}</span>
                      </p>{" "}
                      <p className="last-price fs-5">
                        {" "}
                        &nbsp;
                        {rprice !== 0 ? (
                          <span
                            className="px-1 text-danger"
                            style={{ fontSize: "15px" }}
                          >
                            {" "}
                            {rprice}
                          </span>
                        ) : (
                          <span> </span>
                        )}{" "}
                      </p>
                    </>
                  ) : null}
                </>
              )}
            </div>
            {CutLoading ? null : (
              <div>
                <div
                  className="product-detail my-1"
                  style={{ display: "flex", justifyContent: "left" }}
                >
                  {loadingImg && item?.api?.Category?.length > 0 ? (
                    <div className="skeleton-item skeleton-titleH my-3"></div>
                  ) : (
                    <h5 className="h5ian fw-bold">
                      {item?.api?.Category?.length > 1
                        ? "Categories:"
                        : "Category:"}
                    </h5>
                  )}

                  {loadingImg && item?.api?.Category?.length > 0 ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="skeleton-item skeleton-titleD2 my-1"></div>
                      </div>
                    </>
                  ) : (
                    <p
                      style={{
                        fontSize: "15px",
                        letterSpacing: "0px",
                        fontFamily: "Poppins",
                        textAlign: "center",
                      }}
                    >
                      {item &&
                        item?.api &&
                        item?.api?.Category &&
                        item?.api?.Category.length !== 0 ? (
                        item?.api?.Category.map((cat, key) => (
                          <span key={key}>
                            {cat.name}
                            {key === item?.api?.Category.length - 1
                              ? " "
                              : ", "}
                          </span>
                        ))
                      ) : (
                        <p style={{ padding: 8 }} />
                      )}
                    </p>
                  )}
                </div>
                <div className="product-detail ">
                  {loadingImg ? (
                    <div className="skeleton-item skeleton-titleH my-3"></div>
                  ) : (
                    <h5 className="h5ian fw-bold">Description:</h5>
                  )}

                  {loadingImg ? (
                    <>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "center",
                        }}
                      >
                        <div className="skeleton-item skeleton-titleD1 my-1"></div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "center",
                        }}
                      >
                        <div className="skeleton-item skeleton-titleD2 my-1"></div>
                      </div>
                    </>
                  ) : (
                    <p
                      style={{
                        fontFamily: "Poppins,sans-serif",
                        color: "#000",
                        textAlign: "left",
                      }}
                      dangerouslySetInnerHTML={{ __html: shortDetails }}
                    />
                  )}
                </div>
              </div>
            )}

            {item &&
              item?.api &&
              item?.api?.grouped_products &&
              item?.api?.is_group &&
              item?.api?.is_group === 1 &&
              item?.api?.grouped_products?.length !== 0 ? (
              <>
                <h5 className="h5ian fw-bold">Grouped Products:</h5>

                <br />

                {gData.length !== 0 &&
                  gData.map((e) => {
                    return (
                      <div className="row" key={e.id}>
                        <div className="col-md-8  py-3">
                          <Link
                            to={`${process.env.PUBLIC_URL}/product/${e.url_key}`}
                          >
                            <p>{e?.name}</p>
                          </Link>
                        </div>
                        <div className="col-md-4  py-3">
                          <div className="qty-box">
                            <div
                              className="input-group w-auto"
                              style={{ justifyContent: "flex-start" }}
                            >
                              <span className="input-group-prepend">
                                <button
                                  type="button"
                                  className="btn quantity-left-minus"
                                  onClick={() => DeductGQty(e.id)}
                                >
                                  -
                                </button>
                              </span>
                              <input
                                type="text"
                                name="quantity"
                                value={e.qty}
                                readOnly={true}
                                className="form-control input-number"
                              />
                              <span className="input-group-prepend">
                                <button
                                  type="button"
                                  className="btn quantity-right-plus"
                                  onClick={() => AddGQty(e.id)}
                                >
                                  +
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            ) : (
              <div>
                <div className="row">
                  {item &&
                    item.api &&
                    item.api.active_variant &&
                    item.api.active_variant.original.data &&
                    item.api.active_variant.original.data.attributes &&
                    item.api.active_variant.original.data.attributes.length !==
                    0 &&
                    !loadingImg ? (
                    item.api.active_variant.original.data.attributes.map(
                      (dat, key) => (
                        <div key={key} className="my-1 col-md-4">
                          <h5 className="h5ian fw-bold my-2 ">{dat.label}:</h5>
                          <select
                            id="cars"
                            ref={(el) => {
                              if (el && el.value === dat.label) {
                                setValidateC(true);
                              }
                            }}
                            onChange={(e) => {
                              if (e.target.value === dat.label) {
                                setValidateC(true);
                              } else {
                                setValidateC(false);
                              }
                              setMyTestArr(
                                (
                                  item &&
                                  item.api &&
                                  item.api.variants &&
                                  item.api.variants.filter(
                                    (item) => item[dat.code] == e.target.value,
                                  )
                                ).length !== 0
                                  ? { ...myTestArr, [dat.code]: e.target.value }
                                  : _.omit(myTestArr, [dat.code]),
                              );
                              getvariant(e.target.value, dat.code);
                            }}
                            required={true}
                            style={{
                              width: "100%",
                              padding: 10,
                              border: "1px solid rgba(0,0,0,0.2)",
                              borderRadius: 5,
                              outline: "none",
                            }}
                          >
                            <option value={dat.label}>
                              Select {dat.label} Option
                            </option>

                            {dat &&
                              dat.options &&
                              dat.options.length !== 0 &&
                              getFilteredOptionListByFirstSelectedItem(
                                item.api.active_variant.original.data
                                  .attributes,
                                dat,
                                myTestArr,
                              ).map((a, key) => (
                                <option key={key} value={a.id}>
                                  {a.label}
                                </option>
                              ))}
                          </select>
                        </div>
                      ),
                    )
                  ) : (
                    <div></div>
                  )}
                </div>

                <div class="mt-3">
                  {loadingImg ? (
                    <div className="skeleton-item skeleton-titleH my-3"></div>
                  ) : (
                    <h5 className="h5ian fw-bold mb-3">Quantity:</h5>
                  )}

                  {loadingImg ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >

                      <div className="skeleton-item skeleton-titleI my-1"></div>
                    </div>
                  ) : (
                    <div className="row">
                      <div style={{ alignItems: "center" }}>
                        <div>
                          <div className="qty-box" style={{ float: "left" }}>
                            <div className="input-group">
                              <span className="input-group-prepend">
                                <button
                                  type="button"
                                  className="btn quantity-left-minus"
                                  onClick={() =>
                                    setqty(qty === 1 ? 1 : qty - 1)
                                  }
                                >
                                  -
                                </button>
                              </span>
                              <input
                                type="text"
                                name="quantity"
                                value={qty}
                                readOnly={true}
                                className="form-control input-number"
                              />
                              <span className="input-group-prepend">
                                <button
                                  type="button"
                                  className="btn quantity-right-plus"
                                  onClick={() => setqty(qty + 1)}
                                >
                                  +
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col col-md-4 col-lg-4 add-cartBtn">
                          <div>
                            {/* <Button disabled={validateC} className='myButtons'  onClick={() => { appconfig && appconfig?.navbar_guset && (appconfig.navbar_guset === 1) ? addItemTOCart(p_id) : history.push(`${process.env.PUBLIC_URL}/login`) }} style={{ color: "#fff" }} type="button" size='large'>
                                Add to Cart &nbsp;&nbsp; <FiShoppingCart size={22} className='fw-bold mx-2' />
                              </Button> */}

                            &nbsp;&nbsp;&nbsp;&nbsp;
                          </div>
                        </div>
                      </div>

                      <div
                        style={{ width: "100%", marginTop: "1rem", display: "flex", marginLeft: "10px" }}
                      >
                        <Link
                          disabled={validateC}
                          to="/cart-sidebar"
                          onClick={() => {
                            appconfig &&
                              appconfig?.navbar_guset &&
                              appconfig.navbar_guset === 1
                              ? addItemTOCart(p_id)
                              : history.push(`${process.env.PUBLIC_URL}/login`);
                          }}
                          className="btn btn-solid"
                          style={{ width: "200px" }}
                        >
                          BUY IT NOW
                        </Link>
                        <button
                          disabled={validateC}
                          onClick={() => {
                            appconfig &&
                              appconfig?.navbar_guset &&
                              appconfig.navbar_guset === 1
                              ? addItemTOCart(p_id)
                              : history.push(
                                `${process.env.PUBLIC_URL}/login`,
                              );
                          }}
                          type="submit"
                          className="myButtons"
                          style={{
                            marginTop: "0px",
                            marginLeft: "30px",
                            width: "200px",
                          }}
                        >
                          <span className="spansa"></span> Add to Cart
                          &nbsp;
                          {/* <FiShoppingCart
                            size={22}
                            className="fw-bold mx-2"
                          /> */}
                        </button>
                      </div>

                      {contactDetails?.data?.whatsapp_number ? (
                        CutLoading ? null : (
                          <div>
                            <a
                              target="_blank"
                              href={`https://api.whatsapp.com/send?phone=${contactDetails?.data?.whatsapp_number}`}
                              rel="nofollow noopener noreferrer"
                              className="wa__button wa__r_button wa__stt_online wa__btn_w_icon"
                              style={{ backgroundColor: "rgb(45, 183, 66)" }}
                            >
                              <div className="wa__btn_icon">
                                <img
                                  alt="img"
                                  src="https://whatsapp-u.seedgrow.net/images/whatsapp_logo.svg"
                                  loading="lazy"
                                />
                              </div>
                              <div className="wa__btn_txt">
                                <div className="wa__cs_info">
                                  <div
                                    className="wa__cs_name"
                                    style={{ color: "#d5f0d9", opacity: 1 }}
                                  >
                                    {parsedColorCodes?.shop_name} WHATSAPP
                                  </div>
                                  <div className="wa__cs_status">Online</div>
                                </div>
                                <div
                                  className="wa__btn_title"
                                  style={{ color: "#fff" }}
                                >
                                  Need Help? Chat with us
                                </div>
                              </div>
                            </a>
                          </div>
                        )
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            )}

            {!shortView && (
              <div className="social-links" style={{ marginTop: "3rem" }}>
                <p style={{ marginTop: 15, marginRight: 5, fontWeight: 600 }}>
                  Share At:{" "}
                </p>
                &nbsp;&nbsp;&nbsp;
                <FacebookShareButton
                  url={myurl}
                  quote={name}
                  hashtag={`#${parsedColorCodes &&
                    parsedColorCodes?.shop_name}`}
                >
                  <FacebookIcon size={35} round={true} />
                </FacebookShareButton>
                &nbsp;&nbsp;
                <>
                  {drop ? (
                    <a
                      style={{ border: "none" }}
                      href={`whatsapp://send?text=${myurl}`}
                      data-action="share/whatsapp/share"
                    >
                      <WhatsappIcon size={35} round={true} />
                    </a>
                  ) : (
                    <WhatsappShareButton
                      url={myurl}
                      quote={name}
                      hashtag={`#${parsedColorCodes &&
                        parsedColorCodes?.shop_name}`}
                    >
                      <WhatsappIcon size={35} round={true} />
                    </WhatsappShareButton>
                  )}
                </>
              </div>
            )}
          </div>
        </div>

        {!shortView && (
          <div className="headD my-5">
            <DetailsTopTabs item={item} />
          </div>
        )}

        {drop && !shortView && (
          <div className="my-4 px-5">
            <Service />
          </div>
        )}

        {!shortView && (
          <div className="my-5">
            <Collection3 pathName={pathName} maincompLoading={LoadingSSS} clickedReload={true} category_Id={locaaaa?.state?.category_ids || ""} ProductCategories={item?.api?.Category} />
            <PeopleViewed pathName={pathName} maincompLoading={LoadingSSS} clickedReload={true} category_Id={locaaaa?.state?.category_ids || ""} ProductCategories={item?.api?.Category} />
          </div>
        )}
      </div>

      {imageLoaded && (
        <img
          src={Demoimg}
          style={{ width: 0, height: 0, display: "none" }}
          alt="Not Imp"
          onLoad={() => imageLoaded()}
        />
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    currencies: state?.user?.currencies ? state?.user?.currencies : "",
    appconfigs: state?.user?.config ? state?.user?.config : "",
    contactDetails: state.contactDetails.contactDetails,
  };
}
export default connect(mapStateToProps)(ProductDetailsMe);
