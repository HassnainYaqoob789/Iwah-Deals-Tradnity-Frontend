import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import "./proCard.css"
import "./product-item.scss"
import Heart from "react-heart"
import { getRelatedItems } from "../../../services";
import { removeWishlist } from '../../../actions';
import store from '../../../store';
import { Modal } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import LeftSidebar from '../../products/left-sidebar';
import history from '../../../history';
import Placeholder from '../../../svg_code/placeholder';
import '../../../assets/css/custom.css'

class ProductItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      show: false,
      wishList: this.props.product.wishlist,
    }
  }

  setActive = (e) => {
    this.setState({ wishList: e });
  }

  renderStars(rating) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} style={{ color: '#f5a623', fontSize: 13 }} />);
      } else if (i === fullStars && hasHalf) {
        stars.push(<FaStarHalfAlt key={i} style={{ color: '#f5a623', fontSize: 13 }} />);
      } else {
        stars.push(<FaRegStar key={i} style={{ color: '#f5a623', fontSize: 13 }} />);
      }
    }
    return stars;
  }

  render() {
    const { product, appconfigs, category_ids, clickedReload, product_ids } = this.props;
    const { wishList } = this.state;

    const colorCodes = localStorage.getItem("color_theme");
    let parsedColorCodes = JSON.parse(colorCodes);
    let appconfig = parsedColorCodes && parsedColorCodes !== null ? parsedColorCodes : appconfigs;
    const decryptedData = localStorage.getItem("customerData");

    if (!product) {
      return (
        <div style={{ height: 500, width: "100%", textAlign: "center" }}>
          No Products Available
        </div>
      );
    }

    const imageUrl = product?.api?.images?.[0]?.original_image_url || null;
    const rating = parseFloat(product?.api?.reviews?.average_rating) || 0;
    const reviewCount = product?.api?.reviews?.total || 0;
    const inStock = product?.api?.in_stock;
    const originalPrice = product?.api?.formated_regular_price;
    const salePrice = product?.api?.formated_price;
    const discount = product?.api?.Discount_Percentage;
    const productUrl = `${process.env.PUBLIC_URL}/product/${product.api.url_key}`;

    return (
      <>
        {/* ── Card ── */}
        <div className="pic2-card">

          {/* ── Image wrapper ── */}
          <div className="pic2-image-wrap">
            {/* <Link to={productUrl}> */}
            <Link
              to={{
                pathname: productUrl,
                state: { category_ids: category_ids, product_id: product_ids }
              }}
              onClick={(e) => {
                if (clickedReload === true) {
                  window.location.href = productUrl;
                }
              }}
            >
              {imageUrl
                ? <LazyLoadImage
                  src={imageUrl}
                  alt={product.name}
                  effect="opacity"
                  className="pic2-image"
                  placeholder={<Placeholder />}
                />
                : <Placeholder />
              }
            </Link>

            {/* Wishlist heart – top left */}
            {appconfig?.navbar_wishlist === 1 && (
              <div className="pic2-heart">
                <Heart
                  className="heartColor"
                  isActive={wishList}
                  onClick={() => {
                    if (decryptedData) {
                      this.setActive(!wishList);
                      store.dispatch(removeWishlist(product.id));
                    } else {
                      history.push(`${process.env.PUBLIC_URL}/login`);
                    }
                  }}
                />
              </div>
            )}

            {/* In Stock badge – top right */}
            <div className={`pic2-stock-badge ${inStock ? 'pic2-in-stock' : 'pic2-out-stock'}`}>
              {inStock ? (
                <>
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ marginRight: 4 }}>
                    <circle cx="6" cy="6" r="6" fill="#fff" fillOpacity="0.3" />
                    <path d="M3 6l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  In stock
                </>
              ) : 'Out of stock'}
            </div>

            {/* Discount label */}
            {discount && (
              <div className="pic2-discount-badge">
                -{discount}
              </div>
            )}
          </div>

          {/* ── Card body ── */}
          <div className="pic2-body">

            {/* Stars + review count */}
            <div className="pic2-rating-row">
              <span className="pic2-stars">{this.renderStars(rating)}</span>
              <span className="pic2-reviews">Reviews ({reviewCount})</span>
            </div>

            {/* Product name */}
            <Link to={productUrl} className="pic2-name">
              {product.name}
            </Link>

            {/* Category tag */}
            {product?.api?.Category?.length > 0 && (
              <div className="pic2-category">
                {product.api.Category.slice(0, 2).map((cat, i) => (
                  <span key={i}>{cat.name}{i < Math.min(product.api.Category.length, 2) - 1 ? ', ' : ''}</span>
                ))}
              </div>
            )}

            {/* Price row */}
            <div className="pic2-price-row">
              {originalPrice && originalPrice !== salePrice && (
                <span className="pic2-original-price">{originalPrice}</span>
              )}
              <span className="pic2-sale-price">{salePrice}</span>
            </div>

            {/* Add to cart button */}
            {/* <button
              className="pic2-cart-btn"
              onClick={() => this.setState({ show: true })}
            >
              Add To Cart
            </button> */}
          </div>
        </div >

        {/* Quick-view Modal */}
        < Modal
          title={`${product.name} Product Details`
          }
          centered
          visible={this.state.show}
          okText="View Product Details"
          onOk={() => history.push(productUrl)
          }
          onCancel={() => this.setState({ show: false })}
          width={1000}
          zIndex={999999999999}
        >
          {/* <LeftSidebar url={product?.api?.url_key} CutLoading={this.state.show} /> */}
        </Modal >
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  relatedItems: getRelatedItems(state.data.products, ownProps.product.category, state.filters.country),
  appconfigs: (state?.user?.config) ? state?.user?.config : '',
});

export default connect(mapStateToProps)(ProductItem);
