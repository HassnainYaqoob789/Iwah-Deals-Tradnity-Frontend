import React, { Component } from "react";
import "../common/index.scss";
import { connect } from "react-redux";

// CSS
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "./leftSidebar.scss";

// Image Import
import store from "../../store";
import {
  addToCart,
  addToCartUnsafe,
  addToWishlist,
  changeRouteName,
  getAllProducts,
  getProductCategory,
} from "../../actions";
import ScrollToTop from "../pages/scroll_to_top";
import ProductDetailsMe from "./productDetailsI";
import { LazyLoadImage } from "react-lazy-load-image-component";
import EmptySearch from "../../svg_code/emptySearch";
import Loader from "../../svg_code/loader";

class LeftSideBar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      nav1: null,
      nav2: null,
      quantity: 1,
      stock: "InStock",
      nav3: null,
      loading: true,
    };
  }
  minusQty = () => {
    if (this.state.quantity > 1) {
      this.setState({ stock: "InStock" });
      this.setState({ quantity: this.state.quantity - 1 });
    }
  };
  plusQty = () => {
    if (this.props.item.stock >= this.state.quantity) {
      this.setState({ quantity: this.state.quantity + 1 });
    } else {
      this.setState({ stock: "Out of Stock " });
    }
  };
  changeQty = (e) => {
    this.setState({ quantity: parseInt(e.target.value) });
  };
  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
    console.log("RuningSamePage")
    store.dispatch(getAllProducts());
    store.dispatch(getProductCategory());
  }
  filterClick() {
    document.getElementById("filter").style.left = "-15px";
  }
  backClick() {
    document.getElementById("filter").style.left = "-365px";
  }
  render() {
    const {
      symbol,
      item,
      review,
      pathName,
      shortView,
      CutLoading,
    } = this.props;
    store.dispatch(changeRouteName([{ routeName: pathName }]));

    if (item == undefined) {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 4000);
    }

    return (
      <div>
        {item ? (
          <>
            <ScrollToTop />

            <ProductDetailsMe
              pathName={pathName}
              shortView={shortView}
              item={item}
              CutLoading={CutLoading}
            />
          </>
        ) : this.state.loading && !shortView ? (
          <div className="text-center" style={{ marginTop: "5vh" }}>
            <ScrollToTop />
            <br />
            <br />

            <Loader />
          </div>
        ) : (
          !shortView && (
            <div className="text-center" style={{ marginTop: "5vh" }}>
              <EmptySearch />
              <br />

              <span className="fs-5 my-3">Sorry No Products Found!</span>
            </div>
          )
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  let productId = ownProps?.url ? ownProps?.url : ownProps?.match?.params?.id;
  return {
    pathName: productId,
    item: state.data.products.find((el) => el.api.url_key === productId),
    symbol: state.data.symbol,
    review: state.data.reviewsdata.data,
    shortView: ownProps?.url ? true : false,
  };
};
export default connect(mapStateToProps, {
  addToCart,
  addToCartUnsafe,
  addToWishlist,
})(LeftSideBar);
