import React, { Component } from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import store from "../../../store";
import { Product4 } from "../../../services/script";
import {
  addToCart,
  addToWishlist,
  addToCompare,
  removeWishlist,
  addItemToCart,
} from "../../../actions";
import ProductItem from "./product-item";
import "./proCard.css";
import "./collection.css";
import Loader from "../../../svg_code/loader";
import history from "../../../history";

/* Custom prev / next arrows */
const PrevArrow = ({ onClick }) => (
  <button style={{ marginLeft: "18px" }} className="col-arrow col-arrow-prev" onClick={onClick}>
    &#8249;
  </button>
);
const NextArrow = ({ onClick }) => (
  <button style={{ marginRight: "18px" }} className="col-arrow col-arrow-next" onClick={onClick}>
    &#8250;
  </button>
);

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
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

    const { items, symbol, title, subtitle } = this.props;

    function checkNew(feature) {
      return feature?.api?.new === 1;
    }
    let newProduct = items.length !== 0 && items.filter(checkNew);
    const sliderSettings = {
      ...Product4,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
    };

    return (
      <div
        className="col-section-wrapper mt-4 mb-4"
        style={{ width: "100%", margin: "0" }}
      >
        {/* ── Header row ── */}
        <div className="col-section-header">
          <div className="col-section-title-group">
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
            {subtitle && <p className="col-section-subtitle">{subtitle}</p>}
          </div>
          <button
            className="col-see-all-btn"
            onClick={() => history.push(`${process.env.PUBLIC_URL}/shopPage`)}
          >
            See All Products
          </button>
        </div>

        {/* ── Slider ── */}
        <div className="col-slider-wrap">
          {newProduct && newProduct.length !== 0 ? (
            <Slider {...sliderSettings} className="col-slider">
              {newProduct.map((product, index) => (
                <div key={index} className="col-slide-item">
                  <ProductItem
                    product={product}
                    symbol={symbol}
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
            <div className="col-loader">
              <Loader />
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state?.data?.newdeals,
    symbol: state.data.symbol,
  };
}

export default connect(mapStateToProps, {
  addToCart,
  addToWishlist,
  addToCompare,
})(Collection);
