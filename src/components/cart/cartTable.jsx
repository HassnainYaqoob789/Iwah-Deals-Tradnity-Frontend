import React from "react";
import { MdClose } from "react-icons/md";
import Heading from "../pages/heading";
import { Link } from "react-router-dom";
import store from "../../store";
import { removecartitem, updatecart } from "../../actions";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { connect } from "react-redux";
import Placeholder from "../../svg_code/placeholder";
import EmptyCart from "../../svg_code/emptyCart";
import "./cartTable.css";

const CartTable = (props) => {
  let { cartData, currencies } = props;

  const check_login = localStorage.getItem("customerData");

  function handleClick(e) {
    document.querySelector(".loader-wrapper").style = "display: block";
    var updateItem =
      check_login !== null
        ? `&&qty[${e[0]}]=${e[1]}`
        : `?qty[${e[0]}]=${e[1]}`;
    store.dispatch(updatecart(updateItem));
  }

  function removeitem(e) {
    document.querySelector(".loader-wrapper").style = "display: block";
    store.dispatch(removecartitem(e));
  }

  if (!cartData || !cartData.items || cartData.items.length === 0) {
    return (
      <section className="ct-empty">
        <EmptyCart />
        <h3>Your Cart is Empty</h3>
        <p>Explore more and shortlist some items.</p>
        <Link className="ct-btn-continue" to={`${process.env.PUBLIC_URL}/shopPage`}>
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="ct-page">
      <div className="ct-container">
        <Heading name="Shopping Cart" />

        <div className="ct-layout">
          {/* ── Left: cart table ── */}
          <div className="ct-left">
            <table className="ct-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartData.items.map((item, index) => {
                  const productUrl = `${process.env.PUBLIC_URL}/product/${item && item.parent_url !== null
                      ? item.parent_url
                      : item.product.url_key
                    }`;
                  const imgSrc =
                    item.product !== "" && item?.product?.images[0]?.url
                      ? item.product.images[0].url
                      : null;

                  return (
                    <tr key={index}>
                      {/* Image + Name */}
                      <td className="ct-item-cell">
                        <Link to={productUrl} className="ct-item-img-link">
                          {imgSrc ? (
                            <LazyLoadImage
                              src={imgSrc}
                              alt={item.name}
                              className="ct-item-img"
                            />
                          ) : (
                            <div className="ct-item-img">
                              <Placeholder />
                            </div>
                          )}
                        </Link>
                        <Link to={productUrl} className="ct-item-name">
                          {item.name}
                        </Link>
                      </td>

                      {/* Price */}
                      <td className="ct-price">{item.formated_price}</td>

                      {/* Qty */}
                      <td className="ct-qty-cell">
                        <div className="ct-qty">
                          <button
                            className="ct-qty-btn"
                            onClick={() =>
                              handleClick([item.id, item.quantity - 1])
                            }
                          >
                            −
                          </button>
                          <input
                            type="text"
                            className="ct-qty-input"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            className="ct-qty-btn"
                            onClick={() =>
                              handleClick([item.id, item.quantity + 1])
                            }
                            disabled={item.qty >= item.stock}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* Subtotal */}
                      <td className="ct-subtotal">{item.formated_total}</td>

                      {/* Remove */}
                      <td className="ct-remove-cell">
                        <button
                          className="ct-remove-btn"
                          onClick={() => removeitem(item.id)}
                          title="Remove item"
                        >
                          <MdClose size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* ── Bottom action buttons ── */}
            <div className="ct-actions">
              <div className="ct-actions-left">
                <Link
                  className="ct-btn-outline"
                  to={`${process.env.PUBLIC_URL}/shopPage`}
                >
                  Continue Shopping
                </Link>
              </div>
              {/* <button
                className="ct-btn-update"
                onClick={() => window.location.reload()}
              >
                Update Shopping Cart
              </button> */}
            </div>
          </div>

          {/* ── Right: summary panel ── */}
          <div className="ct-summary">
            <h2 className="ct-summary-title">Summary</h2>

            <div className="ct-summary-divider" />

            {/* Totals */}
            <div className="ct-totals">
              <div className="ct-total-row">
                <span>Subtotal</span>
                <span>{cartData.formated_sub_total}</span>
              </div>
              <div className="ct-total-row">
                <span>Shipping</span>
                <span>
                  {(cartData.selected_shipping_rate) ? cartData.selected_shipping_rate.formated_price : `${currencies.code} 0.00`}
                </span>
              </div>
              {cartData.formated_tax_total && (
                <div className="ct-total-row ct-total-small">
                  <span>Tax</span>
                  <span>{cartData.formated_tax_total}</span>
                </div>
              )}
              {/* {cartData.formated_discount && (
                <div className="ct-total-row ct-total-small">
                  <span>GST (10%)</span>
                  <span>{cartData.formated_discount}</span>
                </div>
              )} */}
            </div>

            <div className="ct-summary-divider" />

            <div className="ct-order-total">
              <span>Order Total</span>
              <span className="ct-grand-total">{cartData.formated_grand_total}</span>
            </div>

            {/* Checkout button */}
            <Link
              to={`${process.env.PUBLIC_URL}/cart-sidebar`}
              className="ct-btn-checkout"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    currencies: state?.user?.currencies ? state?.user?.currencies : "",
  };
}
export default connect(mapStateToProps)(CartTable);
