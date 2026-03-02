import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import store from "../../../store";
import { Product2a } from "../../../services/script";
import {
  addToCart,
  addToWishlist,
  addToCartUnsafe,
  removeWishlist,
  addItemToCart,
} from "../../../actions";
import ProductItem from "./product-item";
import "./proCard.css";
import { getTrendingCollection } from "../../../services";
import EmptySearch from "../../../svg_code/emptySearch";
import Loader from "../../../svg_code/loader";
import history from "../../../history";

const Collection3 = ({ item, items, symbol, subtitle, pathName, clickedReload ,category_Id}) => {
  const [loading, setLoading] = useState(true);
  const [testArr, setTestArr] = useState([]);
  let arr = [];
  function handleClick(e) {
    store.dispatch(removeWishlist(e));
  }
  function addItemTOCart(e) {
    document.querySelector(".loader-wrapper").style = "display: block";
    var item = { product_id: e, quantity: 1 };
    store.dispatch(addItemToCart(item));
  }

  useEffect(() => {
    arr.length = 0;

    let productF = item.find((el) => el.api.url_key === pathName);
    if (
      productF &&
      productF.api &&
      productF.api.related_product &&
      productF.api.related_product.length !== 0
    ) {
      productF.api.related_product.map((e, i) => {
        let openingA = item.find((el) => el.api.id === e);
        arr.push(...arr, openingA);
      });
    } else {
      arr.push(items.length !== 0 ? items : []);
    }
    if (arr.length !== 0) {
      arr = arr.filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) =>
            t && t.api
              ? t.api.id === value.api.id && t.api.name === value.api.name
              : null,
          ),
      );
    }

    if (arr.length <= 5) {
      arr = arr.concat(items);
    }

    let dataN = arr.indexOf(productF);
    if (dataN !== -1) {
      arr.splice(dataN, 1);
    }
    const ids = arr.map((o) => o.id);
    const filtered = arr.filter(
      ({ id }, index) => !ids.includes(id, index + 1),
    );

    setTestArr(filtered);
  }, [window.location.pathname]);

  if (items && items.length === 0) {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }

  return (
    <div>
      {/*Paragraph*/}
      <section className="section-b-space j-box pets-box ratio_square my-5 px-3">
        <div className="row">
          <div className="col">
            <div className="title1 title5 section-b-space">
              <h2 className="title-inner1 mob-heading">Related Products</h2>

              {subtitle ? (
                <h4
                  style={{
                    fontSize: "14px",
                    color: "#777777",
                    letterSpacing: "0px",
                    paddingTop: "10px",
                  }}
                >
                  {subtitle}
                </h4>
              ) : (
                ""
              )}
            </div>

            {testArr && testArr.length !== 0 ? (
              <Slider {...Product2a} className="product-4 product-m mx-4 px-4">
                {testArr &&
                  testArr.map((product, index) => (
                    <div key={index}>
                      <ProductItem
                        product={product}
                        category_ids={category_Id}
                        symbol={symbol}
                        clickedReload={clickedReload}
                        onAddToWishlistClicked={() =>
                          localStorage.getItem("customerData")
                            ? handleClick(product.id)
                            : history.push(`${process.env.PUBLIC_URL}/login`)
                        }
                        onAddToCartClicked={() => addItemTOCart(product.id)}
                        key={index}
                      />
                    </div>
                  ))}
              </Slider>
            ) : loading ? (
              <div style={{ textAlign: "center", margin: "auto" }}>
                <Loader />
              </div>
            ) : (
              <div className="text-center my-5">
                <EmptySearch />
                <br />

                <span className="fs-5 my-3">Sorry No Products Found!</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  let actualPath =
    state?.images?.pRoute.length !== 0 && state?.images?.pRoute[0]?.routeName;

  return {
    item: state?.data?.products,
    items: getTrendingCollection(
      state?.data?.products,
      state?.data?.products.find((el) => el.api.url_key === actualPath)
        .length !== 0 &&
        state?.data?.products.find((el) => el.api.url_key === actualPath).api
          .Category.length !== 0
        ? state?.data?.products.find((el) => el.api.url_key === actualPath).api
          .Category[0].name
        : null,
    ),
    symbol: state?.data?.symbol,
  };
};
export default connect(mapStateToProps, {
  addToCart,
  addToCartUnsafe,
  addToWishlist,
})(Collection3);
