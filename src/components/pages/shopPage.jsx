import React, { useState, useEffect } from "react";
// Library Imports
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FiSearch } from "react-icons/fi";
import { MdClose, MdFilterAlt } from "react-icons/md";
import { BsFilter } from "react-icons/bs";
import { BiRevision } from "react-icons/bi";
import { FormControlLabel, Switch } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactPaginate from "react-paginate";
import loadable from "@loadable/component";
import Heading from "./heading";
import { useLocation } from "react-router-dom";
import SliderLoader from "../../svg_code/sliderLoader";

//CSS
import "../layouts/tradnity/pronew.css";
import "./shopPage.css";
import "../layouts/tradnity/proCard.css";

// Image Imports

// Redux Imports

import store from "../../store";
import { addItemToCart, removeWishlist, getAllProducts } from "../../actions";

// Component Imports
import Placeholder from "../../svg_code/placeholder";
import ScrollToTop from "./scroll_to_top";
import ShopDrawer from "../layouts/tradnity/drawer";
import EmptySearch from "../../svg_code/emptySearch";
// import Loader from "../../svg_code/loader";
import LoaderSpinner from "../../components/loadingspin"

import history from "../../history";
import HeadSEO from "../layouts/tradnity/headSEO";
import { FaRegStar, FaStar } from "react-icons/fa";
const ProductItem = loadable(() => import("../layouts/tradnity/product-item"));

const ShopPage = (props) => {
  let searchN =
    props.location.state && props.location.state.categories
      ? props.location.state.categories
      : "";

  let sliderN =
    props.location.state && props.location.state.slider
      ? props.location.state.slider
      : "";

  const { filtersproduct, Category, getallcategories } = props;

  const [age, setAge] = useState(10);

  const [pageSize, setPageSize] = useState(window.innerWidth);
  const [LoadingSSS, setLoadingSSSS] = useState(true);

  const [filterData, setFilterData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1);

  const [pFilter, setPFilter] = useState(false);

  const [filShow, setFilShow] = useState(false);
  const [flashSale, setFlashSale] = useState(false);

  const [newData, setNewData] = useState(
    filtersproduct && filtersproduct.length !== 0 ? filtersproduct : [],
  );

  const [pricData, setPricData] = useState([]);

  let categoryName = searchN;

  let sliderData = sliderN;

  const [pageNumber, setPageNumber] = useState(0);
  const [paramCateIdObj, setCateIdObj] = useState([]);
  const usersPerPage = 12;
  const pagesVisited = pageNumber * usersPerPage;
  const locationGetData = useLocation();



  const queryParams = new URLSearchParams(locationGetData.search);
  const categoryIdParams = queryParams.get("category")
    ? Number(queryParams.get("category"))   // "7" → 7 (number)
    : null;

  const categoryNameS = locationGetData?.state?.categories?.name || paramCateIdObj?.name || "";

  const categoryImage = locationGetData?.state?.categories?.image_url || paramCateIdObj?.image_url || ""

  useEffect(() => {
    if (!getallcategories?.data?.length || !categoryIdParams) return
    const categoryObj = getallcategories.data.find(
      (cat) => cat.id == categoryIdParams
    )
    setCateIdObj(categoryObj)
  }, [categoryIdParams, getallcategories])

  useEffect(() => {
    console.log("checkallcategories", paramCateIdObj)

  }, [paramCateIdObj])

  const pageCount = Math.ceil(
    newData.filter((value) => {
      if (searchInput === "") {
        return value;
      } else if (value.name.toLowerCase().includes(searchInput.toLowerCase())) {
        return value;
      }
    }).length / usersPerPage,
  );


  useEffect(() => {
    // Category ID lein
    const categoryId = locationGetData?.state?.categories?.id || paramCateIdObj?.id || null;
    if (!categoryId) return

    setLoadingSSSS(true)
    // Category ID ke saath products fetch karein
    store.dispatch(getAllProducts(categoryId, null, setLoadingSSSS));

  }, [locationGetData?.state?.categories, paramCateIdObj])

  useEffect(() => {
    setPageNumber(0);
    setNewData(filtersproduct);
  }, [filtersproduct]);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    // document.querySelector("body").scrollTo(0, 0);
    window.scrollTo({
      top: 0,
      behavior: "smooth"           // ← yeh line add karo
    });
  };

  // // Category change detect hone pe ya filter apply hone pe
  // const resetToPageOne = () => {
  //   const params = new URLSearchParams(locationGetData.search);
  //   params.delete("page");   // page hata do → default page 1

  //   history.replace({
  //     pathname: locationGetData.pathname,
  //     search: params.toString() ? `?${params.toString()}` : "",
  //   });

  //   setPageNumber(0);
  // };

  function handleClick(e) {
    store.dispatch(removeWishlist(e));
  }

  const FilterPrices = (mins, maxs) => {
    setPFilter(true);
    setFlashSale(false);
    let arrI = [];
    filtersproduct.filter((val) => {
      let pricN = Number(val.api.price).toFixed(2);
      if (Number(mins) === "" && Number(maxs) === "") {
        arrI.push(val);
        setNewData(arrI);
      } else if (Number(mins) > Number(maxs)) {
        arrI.push(val);
        setNewData(arrI);
      } else if (Number(mins) <= pricN && pricN <= Number(maxs)) {
        arrI.push(val);
        setPricData(arrI);
        setNewData(arrI);
      }
    });
  };

  function addItemTOCart(e) {
    document.querySelector(".loader-wrapper").style = "display: block";
    var item = { product_id: e, quantity: 1 };
    store.dispatch(addItemToCart(item));
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  let arr = [];
  function myFunction(item, index) {
    let pricN = Number(item.api.price).toFixed(2);
    // let pricN = parseInt(pric)
    arr.push(pricN);
    setFilterData(arr);
  }

  useEffect(() => {
    filtersproduct.length !== 0 && filtersproduct.forEach(myFunction);
    setMin(Math.min(...arr));
    setMax(Math.max(...arr));
  }, []);

  // useEffect(() => {
  //   if (categoryName !== "") {
  //     setPFilter(true);

  //     let dataOfFilterC =
  //       pricData.length !== 0
  //         ? pricData
  //         : filtersproduct.filter(function(value) {
  //             function checkAdult(age) {
  //               return age.name === categoryName
  //                 ? age.name === categoryName
  //                 : false;
  //             }
  //             return value &&
  //               value.api &&
  //               value.api.Category &&
  //               value.api.Category.length !== 0
  //               ? value.api.Category.some(checkAdult)
  //               : false;
  //           });

  //     setNewData(dataOfFilterC);
  //   }
  // }, [categoryName]);

  useEffect(() => {
    if (sliderData !== "") {
      setPFilter(true);

      let dataOfFilterSa = filtersproduct?.filter(
        sliderData?.slider_is === "is_category"
          ? function (value) {
            let objs = Category.find((o) => {
              return Number(o.id) == Number(sliderData.slider_product);
            });
            let SliderCat = objs ? objs.name : "";

            function checkAdults(age) {
              return age.name === SliderCat.toString();
            }

            return value &&
              value.api &&
              value.api.Category &&
              value.api.Category.length !== 0
              ? value.api.Category.some(checkAdults)
              : false;
          }
          : sliderData.slider_is === "is_flashsale"
            ? function (value) {
              setFlashSale(true);
            }
            : sliderData.slider_is === "is_product"
              ? function (value) {
                let numbera = parseInt(sliderData.slider_product);

                return value && value.api && value.api.id === numbera;
              }
              : "",
      );

      setNewData(dataOfFilterSa);
    }
  }, [sliderData]);

  const FilterLowToHigh = () => {
    setNewData(
      newData.length !== 0
        ? newData.sort(function (a, b) {
          let pricA = Number(a.api.price).toFixed(2);
          let pricNA = parseInt(pricA);

          let pricB = Number(b.api.price).toFixed(2);
          let pricNB = parseInt(pricB);
          return pricNA - pricNB;
        })
        : filtersproduct.length !== 0
          ? filtersproduct.sort(function (a, b) {
            let pricA = Number(a.api.price).toFixed(2);
            let pricNA = parseInt(pricA);

            let pricB = Number(b.api.price).toFixed(2);
            let pricNB = parseInt(pricB);
            return pricNA - pricNB;
          })
          : filtersproduct,
    );
  };

  const FilterHighToLow = () => {
    let nd =
      newData.length !== 0
        ? newData.sort(function (a, b) {
          let pricA = Number(a.api.price).toFixed(2);
          let pricNA = parseInt(pricA);

          let pricB = Number(b.api.price).toFixed(2);
          let pricNB = parseInt(pricB);
          return pricNA - pricNB;
        })
        : filtersproduct;
    let fd =
      filtersproduct.length !== 0
        ? filtersproduct.sort(function (a, b) {
          let pricA = Number(a.api.price).toFixed(2);
          let pricNA = parseInt(pricA);

          let pricB = Number(b.api.price).toFixed(2);
          let pricNB = parseInt(pricB);
          return pricNA - pricNB;
        })
        : filtersproduct;

    setNewData(
      newData.length !== 0
        ? nd.reverse()
        : filtersproduct.length !== 0
          ? fd.reverse()
          : filtersproduct,
    );
  };

  const FilterAZ = () => {
    let dAZ =
      newData.length !== 0
        ? newData.sort(function (a, b) {
          if (a.api.name > b.api.name) {
            return 1;
          } else {
            return -1;
          }
        })
        : filtersproduct.sort(function (a, b) {
          if (a.api.name > b.api.name) {
            return 1;
          } else {
            return -1;
          }
        });

    setNewData(dAZ);
  };

  const FilterZA = () => {
    let dZA =
      newData.length !== 0
        ? newData.sort(function (a, b) {
          if (a.api.name > b.api.name) {
            return 1;
          } else {
            return -1;
          }
        })
        : filtersproduct.sort(function (a, b) {
          if (a.api.name > b.api.name) {
            return 1;
          } else {
            return -1;
          }
        });

    setNewData(dZA.reverse());
  };

  const FilterCategories = (cName) => {
    setPFilter(true);

    let dataOfFilterC =
      pricData.length !== 0
        ? pricData.filter(function (value) {
          function checkAdult(age) {
            return age.name === cName;
          }

          return (
            value &&
            value.api &&
            value.api.Category &&
            value.api.Category.some(checkAdult)
          );
        })
        : filtersproduct.filter(function (value) {
          function checkAdult(age) {
            return age.name === cName;
          }

          return (
            value &&
            value.api &&
            value.api.Category &&
            value.api.Category.some(checkAdult)
          );
        });

    setNewData(dataOfFilterC);
  };

  useEffect(() => {
    if (flashSale) {
      setPFilter(true);
      let arrI = [];

      if (pricData.length !== 0) {
        pricData.filter((val) => {
          if (val.api && val.api.flash_sale && val.api.flash_sale === 1) {
            arrI.push(val);
            setNewData(arrI);
          }
        });
      } else {
        filtersproduct.filter((val) => {
          if (val.api && val.api.flash_sale && val.api.flash_sale === 1) {
            arrI.push(val);

            setNewData(arrI);
          }
        });
      }
    }
  }, [flashSale]);

  useEffect(() => {
    if (newData.length <= 9) {
      setPageNumber(0);
    }
  });

  const FlashSaleFunc = (valueM) => {
    setFlashSale(valueM === "Yes" ? true : false);
    if (!flashSale == false) {
      setNewData(pricData.length !== 0 ? pricData : filtersproduct);
    }
  };
  const CategoriesAllFunc = () => {
    setPFilter(true);
    setFlashSale(false);
    setNewData(pricData.length !== 0 ? pricData : filtersproduct);
  };

  document.querySelector(".loader-wrapper").style = "display: none";
  // Check if loading
  const isLoading = LoadingSSS

  // Loading UI
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div className="text-center">
          {/* <Loader /> */}
          <LoaderSpinner />
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollToTop />

      {/* <HeadSEO title="Shop Page" /> */}
      <Helmet>
        <title>{categoryNameS ? `${categoryNameS} | Iwah Deals` : "Our Products | Iwah Deals"}</title>
        <meta name="description" content={paramCateIdObj?.meta_description || paramCateIdObj?.description || `Browse our collection of ${categoryNameS || 'products'} at Iwah Deals.`} />
        <meta property="og:title" content={categoryNameS ? `${categoryNameS} | Iwah Deals` : "Our Products | Iwah Deals"} />
        <meta property="og:description" content={paramCateIdObj?.meta_description || paramCateIdObj?.description || `Browse our collection of ${categoryNameS || 'products'} at Iwah Deals.`} />
        <meta property="og:image" content={categoryImage || "https://iwahdeals.com/assets/images/logo.png"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>


      {/* Category Banner - Agar image ho to show karo */}
      {categoryImage && (
        <div style={{
          width: "100%",
          // maxHeight: "300px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",

        }}>
          {/* <img
            src={categoryImage}
            alt={categoryNameS || "Category Banner"}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              maxHeight: "300px"
            }}
          /> */}
          <LazyLoadImage
            placeholder={<SliderLoader />}
            className="imgHeightT"
            src={categoryImage}
            alt="Image"
            width="80%"
            style={{
              borderRadius: 20,
              marginTop: "40px"
            }}
          />
          {/* Optional: Gradient overlay for better text readability */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.1))",
            pointerEvents: "none"
          }}></div>
        </div>
      )}

      <br />
      {/* <div style={{ marginTop: "38px" }} /> */}
      <div style={{ marginTop: categoryImage ? "20px" : "38px" }} />


      {/* <Heading name=" Shop Page" /> */}
      <Heading name={categoryNameS ? ` ${categoryNameS}` : "Our Products"} />


      <div className="respM row my-2">
        <div className="col-lg-9 my-3 col-md-9">
          <div className="wrapper mx-3">
            <div className="search-input">
              <a href="" target="_blank" hidden></a>
              <input
                className="inputiao"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search Products..."
              />
              <div
                style={
                  searchInput.length === 0 || searchInput[0] === " "
                    ? { display: "none" }
                    : {
                      display: "block",
                      zIndex: 9999999999999999999999,
                      position: "relative",
                    }
                }
                className="autocom-boxi"
              >
                <ul>
                  {newData && newData.length !== 0
                    ? newData
                      .filter((value) => {
                        if (searchInput === "") {
                          return value;
                        } else if (
                          value.name
                            .toLowerCase()
                            .includes(searchInput.toLowerCase())
                        ) {
                          return value;
                        }
                      })

                      .map((e, i) => {
                        return (
                          <>
                            {searchInput !== selectedValue ? (
                              <li
                                onClick={() => {
                                  // setSelectedValue(e.name);
                                  // setSearchInput(e.name)
                                  history.push(
                                    `${process.env.PUBLIC_URL}/product/${e?.api?.url_key}`,
                                  );
                                }}
                                key={i}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                  }}
                                >
                                  <div
                                    style={{
                                      border: "1px solid rgb(235 216 216)",
                                      padding: "6px",
                                      width: "75px",
                                      borderRadius: "6px",
                                    }}
                                  >
                                    {e &&
                                      e?.api &&
                                      e?.api?.images &&
                                      e?.api?.images.length !== 0 ? (
                                      <img
                                        src={
                                          e?.api?.images[0]
                                            ?.original_image_url
                                        }
                                        style={{ width: 60 }}
                                      />
                                    ) : (
                                      <Placeholder />
                                    )}
                                  </div>

                                  <div className="mx-3">
                                    <h5>{e?.api?.name}</h5>
                                    <div className="price-sale">
                                      {e?.api?.formated_regular_price !==
                                        null ? (
                                        <span className="old-price">
                                          <span
                                            className="money done"
                                            ws-price="1590"
                                            ws-currency="PKR"
                                          >
                                            {e?.api?.formated_regular_price}
                                          </span>
                                        </span>
                                      ) : null}

                                      <span className="special-price">
                                        <span
                                          className="money done"
                                          ws-price="1431"
                                          ws-currency="PKR"
                                        >
                                          {e?.api?.formated_price
                                            ? e?.api?.formated_price
                                            : e?.api?.formated_price
                                              ? e?.api?.formated_price
                                              : ""}
                                        </span>
                                      </span>

                                      <span className="mx-3">
                                        {e?.api?.reviews?.average_rating &&
                                          e?.api?.reviews?.average_rating !==
                                          "0" ? (
                                          <FaStar
                                            style={{ color: "yellow" }}
                                          />
                                        ) : (
                                          <FaRegStar
                                            style={{ color: "yellow" }}
                                          />
                                        )}{" "}
                                        <span
                                          className=""
                                          style={{
                                            fontSize: 12,
                                            color: "rgba(0,0,0,0.7)",
                                          }}
                                        >
                                          (
                                          {e?.api?.reviews?.average_rating &&
                                            e?.api?.reviews?.average_rating !==
                                            "0"
                                            ? e.api.reviews.average_rating
                                            : "0.0"}
                                          )(
                                          {e?.api?.reviews?.total
                                            ? e.api.reviews.total
                                            : "0"}
                                          )
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ) : null}
                          </>
                        );
                      })
                    : null
                    // <li>No Such Product Found!</li>
                  }
                </ul>
              </div>
              <div className="iconion">
                {searchInput !== "" || selectedValue !== "" ? (
                  <MdClose
                    onClick={() => {
                      setSelectedValue("");
                      setSearchInput("");
                    }}
                    style={{ marginTop: 5, marginRight: 5 }}
                    size={22}
                  />
                ) : null}
                <FiSearch
                  onClick={() => {
                    setSelectedValue(searchInput);
                  }}
                  style={{ marginTop: 5 }}
                  size={22}
                />
              </div>
            </div>

            {selectedValue ? (
              <p style={{ paddingTop: 30, textAlign: "center" }}>
                Showing results for{" "}
                <span style={{ fontWeight: 600, color: "rgb(173 112 112)" }}>
                  {selectedValue}
                </span>
              </p>
            ) : null}
          </div>
        </div>
        <div className="col-lg-3 my-3 col-md-3 px-2">
          <FormControl
            className="inputian"
            style={{ border: "none", width: "86%", marginLeft: "7%" }}
          >
            <Select
              style={{ border: "none", fontFamily: "Poppins" }}
              className="inputian"
              value={age}
              onChange={handleChange}
            >
              <MenuItem
                style={{ fontFamily: "Poppins", border: "none" }}
                onClick={() =>
                  setNewData(pricData.length !== 0 ? pricData : filtersproduct)
                }
                value={10}
              >
                Select Sorting
              </MenuItem>
              <MenuItem
                style={{ fontFamily: "Poppins", border: "none" }}
                value={20}
                onClick={() => FilterLowToHigh()}
              >
                Price : Low To High
              </MenuItem>
              <MenuItem
                style={{ fontFamily: "Poppins", border: "none" }}
                value={30}
                onClick={() => FilterHighToLow()}
              >
                Price : High To Low
              </MenuItem>
              <MenuItem
                style={{ fontFamily: "Poppins", border: "none" }}
                value={40}
                onClick={() => FilterAZ()}
              >
                Sort By Name : A - Z
              </MenuItem>
              <MenuItem
                style={{ fontFamily: "Poppins", border: "none" }}
                value={50}
                onClick={() => FilterZA()}
              >
                Sort By Name : Z - A
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="respM">

        <div className="collection-collapse-block open">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="mx-3"
          >
            {/* <div>
              {pFilter ? (
                <p
                  onClick={() => {
                    setPFilter(false);

                    window.history.replaceState(null, "");
                    setFlashSale(false);
                    setPricData(filtersproduct);
                    setMin(Math.min(...filterData));
                    setMax(Math.max(...filterData));
                    setNewData(filtersproduct);
                  }}
                  className="m-2"
                >
                  <span
                    style={{
                      fontWeight: 500,
                      color: "rgb(173 112 112)",
                      cursor: "pointer",
                    }}
                  >
                    <BiRevision size={20} /> Reset Filters{" "}
                  </span>
                </p>
              ) : null}
            </div> */}
            {/* <ShopDrawer
              Category={Category}
              FilterCategories={FilterCategories}
              CategoriesAllFunc={CategoriesAllFunc}
              FlashSaleFunc={FlashSaleFunc}
              flashSale={flashSale}
              min={min}
              max={max}
              setMin={setMin}
              setMax={setMax}
              FilterPrices={FilterPrices}
              filtersproduct={filtersproduct}
            /> */}
          </div>

          {filShow ? (
            <>
              <div className="row padding5x margin5x">
                {/* <div
                  className="collection-collapse-block col-md-6"
                  style={{ marginTop: "15px" }}
                >
                  <h3
                    className="fw-bold text-dark"
                    style={{ letterSpacing: "1.5px", fontSize: "15px" }}
                  >
                    CATEGORIES:
                  </h3>
                  <div className="collection-brand-filter">
                    <br />
                    <div
                      className="custom-control custom-checkbox collection-filter-checkbox my-1"
                      onClick={() => {
                        setPFilter(true);
                        setNewData(
                          pricData.length !== 0 ? pricData : filtersproduct,
                        );
                      }}
                      style={{
                        fontWeight: 400,
                        paddingBottom: "5px",
                        cursor: "pointer",
                      }}
                    >
                      All
                    </div>

                    {Category &&
                      Category.length !== 0 &&
                      Category.map((category, key) => (
                        <div
                          key={key}
                          className="custom-control custom-checkbox collection-filter-checkbox my-1"
                          onClick={() => FilterCategories(category.name)}
                          style={{
                            fontWeight: 400,
                            paddingBottom: "5px",
                            cursor: "pointer",
                          }}
                        >
                          {category.name}
                        </div>
                      ))}
                  </div>

                  <br />
                </div> */}

                {/* <div
                  className="collection-collapse-block open col-md-6"
                  style={{ marginTop: "15px" }}
                >
                  <h3
                    className="fw-bold text-dark"
                    style={{
                      letterSpacing: "1.5px",
                      fontSize: "15px",
                      marginTop: 10,
                    }}
                  >
                    PRICE:
                  </h3>

                  <div className="custom-control custom-checkbox collection-filter-checkbox">
                    <div className="row">
                      <div className="col-md-2"></div>
                      <div className="col-md-4 my-2">
                        <input
                          value={min}
                          type="number"
                          min="1"
                          className="removeInput inputian"
                          placeholder="To"
                          onChange={(e) => setMin(e.target.value)}
                        />
                      </div>
                      <div className="col-md-4 my-2">
                        <input
                          value={max}
                          type="number"
                          min="1"
                          className="removeInput inputian"
                          placeholder="From"
                          onChange={(e) => setMax(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="my-2 text-center">
                      <button
                        type="button"
                        className="btn btn-secondary onlyBackColor"
                        style={{
                          boxShadow: "0px 1px 5px 2px rgba(0,0,0,0.1)",
                          height: "46px",
                          color: "white",
                          borderRadius: "6px",
                        }}
                        onClick={() => FilterPrices()}
                      >
                        Filter
                        <MdFilterAlt className="mx-2" color="#fff" size={20} />
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="custom-control custom-checkbox collection-filter-checkbox row padding5x margin5x">
                <div
                  className="py-3 fw-bold col-md-6"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3
                    className="fw-bold text-dark"
                    onClick={() => {
                      setFlashSale(!flashSale);
                      if (!flashSale == false) {
                        setNewData(
                          pricData.length !== 0 ? pricData : filtersproduct,
                        );
                      }
                    }}
                    style={{
                      letterSpacing: "1.5px",
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                  >
                    FLASH SALE
                  </h3>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={flashSale}
                        onClick={() => {
                          setFlashSale(!flashSale);

                          if (!flashSale == false) {
                            setNewData(
                              pricData.length !== 0 ? pricData : filtersproduct,
                            );
                          }
                        }}
                        color="primary"
                      />
                    }
                  />
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <hr className="mx-5" />
        </div>
      </div>

      {newData && newData.length !== 0 ? (
        <div className="row respM">
          {newData
            .filter((val) => {
              if (selectedValue === "") {
                return val;
              } else if (
                val.api.name.toLowerCase().includes(selectedValue.toLowerCase())
              ) {
                return val;
              }
            })
            .slice(pagesVisited, pagesVisited + usersPerPage)
            .map((data, key) => {
              // console.log("ProductIddd",)
              return (
                <div
                  className={
                    pageSize >= 1870
                      ? "col-md-2 my-2"
                      : pageSize <= 1869 && pageSize >= 1250
                        ? "col-md-3 my-2"
                        : pageSize <= 1249 && pageSize >= 975
                          ? "col-md-4 my-2"
                          : "col-sm-6 col-xs-6 my-2"
                  }
                  key={key}
                >
                  <ProductItem
                    product={data}
                    product_ids={data?.id || ""}
                    category_ids={locationGetData?.state?.categories?.id || paramCateIdObj?.id || ""}
                    onAddToWishlistClicked={() =>
                      localStorage.getItem("customerData")
                        ? handleClick(data.api.id)
                        : history.push(`${process.env.PUBLIC_URL}/login`)
                    }
                    onAddToCartClicked={() => addItemTOCart(data.api.id)}
                    key={key}
                  />
                </div>
              )
            })}
        </div>
      ) : (
        <div className="text-center my-5">
          {/* <Loader /> */}
          <LoaderSpinner />
        </div>
      )}


      <div style={{
        marginTop: 50,
        marginBottom: 50,
        width: '100%',
        overflowX: 'auto',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <ReactPaginate
          breakLabel="..."
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={pageCount}
          forcePage={pageNumber}
          onPageChange={changePage}
          renderOnZeroPageCount={null}
          containerClassName={"pagination justify-content-center text-white flex-wrap"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"border bg-secondary"}
        />
      </div>

    </div>
  );
};

const mapStateToProps = (state) => ({
  filtersproduct: state.data.products ? state.data.products : [],
  Category: state && state.data && state.data.menu ? state.data.menu : [],
  getallcategories: state.data.getCategory,
});

export default withRouter(connect(mapStateToProps)(ShopPage));
