import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import shop from "../../../api/shop";
import store from "../../../store";
import { Product4 } from "../../../services/script";
import {
  addToCart,
  addToWishlist,
  addToCompare,
  removeWishlist,
  addItemToCart,
  FetchCategprod,
} from "../../../actions";
import ProductItem from "./product-item";
import "./proCard.css";
import "./collection.css";  /* bring in shared collection styles including .col-see-all-link */
import Loader from "../../../svg_code/loader";
import history from "../../../history";

class Collection2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      products: [],
    };
  }

  componentDidMount() {
    const { categoryID } = this.props;
    const paramsObj = {
      token: "true",
      currency: localStorage.getItem("changeCurrencies"),
      category_id: categoryID,
      order: "asc",
    };
    shop.CallEnginegetCategoryByProducts(paramsObj, (data) => {
      if (data && data.length > 0) {
        this.setState({ products: data, loading: false });
      } else {
        setTimeout(() => this.setState({ loading: false }), 5000);
      }
    });
  }

  render() {
    function handleClick(e) {
      store.dispatch(removeWishlist(e));
    }
    function addItemTOCart(e) {
      document.querySelector(".loader-wrapper").style = "display: block";
      var item = { product_id: e, quantity: 1 };
      store.dispatch(addItemToCart(item));
    }

    const { items, symbol, addToCompare, title, subtitle, categoryID, SeeAllProductsBtnCdn, getallcategories } = this.props;
    const { products, loading } = this.state;

    if (items && items.length === 0) {
      setTimeout(() => { this.setState({ loading: false }); }, 5000);
    }
    let objshopPage = getallcategories?.data?.filter((e) => e?.id == categoryID)[0] || {};
    const featured = products;
    return (
      <div>
        {/* Header row with title & button on same line */}
        <div
          className="col2-header-row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "1rem",               /* 16px */
            paddingBottom: "0px",             /* 16px */
            paddingLeft: "1rem",               /* 16px */
            paddingRight: "1rem",              /* 16px */
            // marginBottom: "1rem",              /* 16px */
            gap: "1.5rem",                     /* 24px */
          }}
        >
          {/* Title & Subtitle group */}
          <div style={{ flex: 1 }}>
            <span
              className="title-inner1 mob-heading"
              style={{
                fontSize: "1.375rem", /* 22px */
                fontFamily: "Poppins",
                fontWeight: "600",
              }}
            >
              {title}
            </span>
            {subtitle ? (
              <span
                style={{
                  fontSize: "1rem", /* 16px */
                  fontFamily: "Poppins",
                  fontWeight: "400",
                }}
              >
                {" "}( {subtitle})
              </span>
            ) : null}
          </div>

          {/* See All Products button */}
          {SeeAllProductsBtnCdn ? (
            <Link
              to={{
                pathname: "/shopPage",
                state: { categories: objshopPage },
              }}
              className="col-see-all-link"
            >
              See All Products
            </Link>
          ) : null}
        </div>

        <section
          className="j-box pets-box ratio_square"
          style={{
            /* ✅ width: 100% — let the PARENT wrapper in TradnityMain control the width.
               Removed hardcoded "85%" that was misaligning with banners above. */
            width: "100%",
            margin: "0",
            overflow: "visible",
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: "0.625rem", /* 10px */
            paddingBottom: "1.25rem", /* 20px */
          }}
        >
          <div className="row">
            <div className="col">
              <div style={{ display: "none" }}>
                {/* Title & subtitle now in header above, keeping this for backward compatibility if needed */}
              </div>
              {featured && featured.length !== 0 ? (
                <Slider
                  {...Product4}
                  className="product-4 product-m"
                  style={{ margin: "0 4px" }}
                >
                  {featured.map((product, index) => (
                    <div key={index}>
                      <ProductItem
                        product={product}
                        product_ids={product?.id || ""}
                        category_ids={categoryID}
                        symbol={symbol}
                        onAddToCompareClicked={() => addToCompare(product)}
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
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "1.25rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state?.data?.deals,
    getcatebyproducts: state.categoryByProducts.getcatebyproducts,
    symbol: state.data.symbol,
    getallcategories: state.data.getCategory,

  };
}

export default connect(mapStateToProps, {
  addToCart,
  addToWishlist,
  addToCompare,
})(Collection2);