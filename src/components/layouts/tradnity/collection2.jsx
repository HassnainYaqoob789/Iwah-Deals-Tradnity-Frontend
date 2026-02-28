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

    const { items, symbol, addToCompare, title, subtitle, categoryID, SeeAllProductsBtnCdn } = this.props;
    const { products, loading } = this.state;

    if (items && items.length === 0) {
      setTimeout(() => { this.setState({ loading: false }); }, 5000);
    }
    let objshopPage = { id: categoryID }
    const featured = products;
    return (
      <div>
        {SeeAllProductsBtnCdn ? (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Link
              to={{
                pathname: "/shopPage",
                state: { categories: objshopPage },
              }}
              style={{
                textDecoration: "none",
                fontSize: "12px",
                padding: "8px 16px",
                border: "1.5px solid #f98814",
                borderRadius: "6px",
                color: "#f98814",
                fontWeight: "600",
                transition: "all 0.3s ease",
                borderRadius: "20px"

              }}
            >
              See All Products
            </Link>
          </div>
        ) : null}
        <section
          className="section-b-space j-box pets-box ratio_square"
          style={{
            /* ✅ width: 100% — let the PARENT wrapper in TradnityMain control the width.
               Removed hardcoded "85%" that was misaligning with banners above. */
            width: "100%",
            margin: "0",
            overflow: "visible",
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >


          <div className="row">
            <div className="col">
              {/* Title row */}
              <div className="mt-2 mb-2" style={{ paddingLeft: "4px" }}>
                <span
                  className="title-inner1 mob-heading"
                  style={{
                    fontSize: "22px",
                    fontFamily: "Poppins",
                    fontWeight: "600",
                  }}
                >
                  {title}
                </span>
                {subtitle ? (
                  <span
                    style={{
                      fontSize: "16px",
                      fontFamily: "Poppins",
                      fontWeight: "400",
                    }}
                  >
                    {" "}( {subtitle})
                  </span>
                ) : null}
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
                    marginTop: "7%",
                    marginBottom: "7%",
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
  };
}

export default connect(mapStateToProps, {
  addToCart,
  addToWishlist,
  addToCompare,
})(Collection2);