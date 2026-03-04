// import React, { Component } from "react";
// import "../common/index.scss";
// import { connect } from "react-redux";
// import { withRouter } from 'react-router-dom';

// // CSS
// import "swiper/swiper.min.css";
// import "swiper/modules/pagination/pagination.min.css";
// import "./leftSidebar.scss";

// // Store & Actions
// import store from "../../store";
// import {
//   addToCart,
//   addToCartUnsafe,
//   addToWishlist,
//   changeRouteName,
//   getAllProducts,
//   getProductCategory,
// } from "../../actions";

// import ScrollToTop from "../pages/scroll_to_top";
// import ProductDetailsMe from "./productDetailsI";
// import EmptySearch from "../../svg_code/emptySearch";
// import Loader from "../../svg_code/loader";

// class LeftSideBar extends Component {
//   constructor() {
//     super();
//     this.state = {
//       open: false,
//       nav1: null,
//       nav2: null,
//       quantity: 1,
//       stock: "InStock",
//       nav3: null,
//       loading: true,
//     };
//   }

//   // 🔥 API controlled loading
//   setLoading = (value) => {
//     this.setState({ loading: value });
//   };

//   componentDidMount() {
//     this.setState({
//       nav1: this.slider1,
//       nav2: this.slider2,
//       loading: true,
//     });

//     // Yeh important change hai
//     // Agar reload ke through category_ids pass hue hain to unko use karo
//     const categoryId = this.props.location?.state?.category_ids || "";

//     // 👇 ab null ki jagah categoryId pass ho raha hai
//     store.dispatch(getAllProducts(categoryId, this.setLoading));
//     store.dispatch(getProductCategory());

//     // Route name set on mount
//     store.dispatch(
//       changeRouteName([{ routeName: this.props.pathName }])
//     );
//   }

//   componentDidUpdate(prevProps) {
//     // Route change detect
//     if (prevProps.pathName !== this.props.pathName) {
//       store.dispatch(
//         changeRouteName([{ routeName: this.props.pathName }])
//       );
//     }

//     // Optional: agar category_ids change hone par bhi products refresh chahiye
//     // (sirf tab jab zarurat ho tabhi uncomment karna)
//     /*
//     if (prevProps.location?.state?.category_ids !== this.props.location?.state?.category_ids) {
//       const newCategoryIds = this.props.location?.state?.category_ids || null;
//       store.dispatch(getAllProducts(newCategoryIds, this.setLoading));
//     }
//     */
//   }

//   minusQty = () => {
//     if (this.state.quantity > 1) {
//       this.setState({
//         stock: "InStock",
//         quantity: this.state.quantity - 1,
//       });
//     }
//   };

//   plusQty = () => {
//     if (this.props.item?.stock >= this.state.quantity) {
//       this.setState({
//         quantity: this.state.quantity + 1,
//       });
//     } else {
//       this.setState({ stock: "Out of Stock" });
//     }
//   };

//   changeQty = (e) => {
//     this.setState({ quantity: parseInt(e.target.value) });
//   };

//   filterClick() {
//     const el = document.getElementById("filter");
//     if (el) el.style.left = "-15px";
//   }

//   backClick() {
//     const el = document.getElementById("filter");
//     if (el) el.style.left = "-365px";
//   }

//   render() {
//     const { item, pathName, shortView, CutLoading, location } = this.props;
//     const { loading } = this.state;

//     return (
//       <div>
//         {item ? (
//           <>
//             <ScrollToTop />
//             <ProductDetailsMe
//               pathName={pathName}
//               shortView={shortView}
//               item={item}
//               // LoadingSSS={loading}
//               CutLoading={CutLoading}
//             />
//           </>
//         ) : loading && !shortView ? (
//           <div className="text-center" style={{ marginTop: "5vh" }}>
//             <ScrollToTop />
//             <br />
//             <br />
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "100vh",
//               }}
//             >
//               <Loader />
//             </div>
//           </div>
//         ) : (
//           !shortView && (
//             <div className="text-center" style={{ marginTop: "5vh" }}>
//               <EmptySearch />
//               <br />
//               <span className="fs-5 my-3">
//                 Sorry No Products Found!
//               </span>
//             </div>
//           )
//         )}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state, ownProps) => {
//   let productId = ownProps?.url
//     ? ownProps?.url
//     : ownProps?.match?.params?.id;

//   return {
//     pathName: productId,
//     item: state.data.products.find(
//       (el) => el.api.url_key === productId
//     ),
//     symbol: state.data.symbol,
//     review: state.data.reviewsdata.data,
//     shortView: ownProps?.url ? true : false,
//   };
// };

// export default connect(mapStateToProps, {
//   addToCart,
//   addToCartUnsafe,
//   addToWishlist,
// })(withRouter(LeftSideBar));


import React, { Component } from "react";
import "../common/index.scss";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

// CSS
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "./leftSidebar.scss";

// Store & Actions
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
import EmptySearch from "../../svg_code/emptySearch";
import Loader from "../../svg_code/loader";
import LoaderSpinner from "../../components/loadingspin"

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.topRef = React.createRef(); // ← Yeh ref banaya hai scroll ke liye

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

  // API controlled loading
  setLoading = (value) => {
    this.setState({ loading: value });
  };

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
      loading: true,
    });

    const categoryId = this.props.location?.state?.category_ids || null;
    const productId = this.props.location?.state?.product_id || null;
    // const productId = false || null;
    store.dispatch(getAllProducts(categoryId, productId,this.setLoading));
    store.dispatch(getProductCategory());
    store.dispatch(
      changeRouteName([{ routeName: this.props.pathName }])
    );

    // Page load hone pe smooth scroll top
    if (this.topRef.current) {
      this.topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  componentDidUpdate(prevProps) {
    // Jab product change ho (URL/id change) to smooth scroll top
    if (prevProps.pathName !== this.props.pathName) {
      store.dispatch(
        changeRouteName([{ routeName: this.props.pathName }])
      );

      if (this.topRef.current) {
        this.topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    // Optional: category_ids change hone par products refresh (agar chahiye to uncomment)
    /*
    if (prevProps.location?.state?.category_ids !== this.props.location?.state?.category_ids) {
      const newCategoryIds = this.props.location?.state?.category_ids || null;
      store.dispatch(getAllProducts(newCategoryIds, this.setLoading));
    }
    */
  }

  minusQty = () => {
    if (this.state.quantity > 1) {
      this.setState({
        stock: "InStock",
        quantity: this.state.quantity - 1,
      });
    }
  };

  plusQty = () => {
    if (this.props.item?.stock >= this.state.quantity) {
      this.setState({
        quantity: this.state.quantity + 1,
      });
    } else {
      this.setState({ stock: "Out of Stock" });
    }
  };

  changeQty = (e) => {
    this.setState({ quantity: parseInt(e.target.value) });
  };

  filterClick() {
    const el = document.getElementById("filter");
    if (el) el.style.left = "-15px";
  }

  backClick() {
    const el = document.getElementById("filter");
    if (el) el.style.left = "-365px";
  }

  render() {
    const { item, pathName, shortView, CutLoading, location } = this.props;
    const { loading } = this.state;

    return (
      <div>
        {/* Invisible top anchor point for smooth scrolling */}
        <div
          ref={this.topRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "1px",
            width: "1px",
            pointerEvents: "none", // click na ho ispe
          }}
        />

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
        ) : loading && !shortView ? (
          <div className="text-center" style={{ marginTop: "5vh" }}>
            <ScrollToTop />
            <br />
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <LoaderSpinner />
            </div>
          </div>
        ) : (
          !shortView && (
            <div className="text-center" style={{ marginTop: "5vh" }}>
              <EmptySearch />
              <br />
              <span className="fs-5 my-3">
                Sorry No Products Found!
              </span>
            </div>
          )
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let productId = ownProps?.url
    ? ownProps?.url
    : ownProps?.match?.params?.id;

  return {
    pathName: productId,
    item: state.data.products.find(
      (el) => el.api.url_key === productId
    ),
    symbol: state.data.symbol,
    review: state.data.reviewsdata.data,
    shortView: ownProps?.url ? true : false,
  };
};

export default connect(mapStateToProps, {
  addToCart,
  addToCartUnsafe,
  addToWishlist,
})(withRouter(LeftSideBar));