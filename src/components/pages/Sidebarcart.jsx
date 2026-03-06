// Library Imports
import React, { Component } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { LazyLoadImage } from "react-lazy-load-image-component";
import loadable from "@loadable/component";

import HomeIcon from "@mui/icons-material/Home";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Check from "@mui/icons-material/Check";

import { BsFillCartCheckFill } from "react-icons/bs";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";

//CSS
import "./checkout.css";

// Component Imports
import GuestAddress from "./guest-address";
import AddressEdit from "./addressEdit";
import EmptyCart from "../../svg_code/emptyCart";
const ShippingOptions = loadable(() => import("./shipping"));
const BillingOptions = loadable(() => import("./billing"));
const ScrollToTop = loadable(() => import("./scroll_to_top"));
const DetailsSidebar = loadable(() => import("./DetailsCartSidebar"));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "#784af4",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(214 161 58) 0%, rgb(255 193 7) 50%, rgb(214 161 58) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(214 161 58) 0%,rgb(255 56 83) 50%,rgb(214 161 58) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(214 161 58) 0%, rgb(255 193 7) 50%, rgb(214 161 58) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.10)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient( 136deg, rgb(214 161 58) 0%, rgb(255 193 7) 50%, rgb(214 161 58) 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <HomeIcon />,
    2: <LocalShippingRoundedIcon />,
    3: <BsFillCartCheckFill color="#fff" size={20} />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

class CartSidebars extends Component {
  constructor() {
    super();
    this.state = {
      page: "address",
      activepage: 0,
      selectaddress: "",
    };
  }

  changePAge = (e) => {
    if (e === "Select Address" && this.state.activepage >= 1) {
      this.setState({ page: "address", activepage: 0 });
    }
    if (e === "Shipping & Payment" && this.state.activepage >= 2) {
      this.setState({ page: "shipping", activepage: 1 });
    }
  };

  handleClickCustom = () => {
    this.setState({ page: "shipping", activepage: 1 });
  };

  render() {
    const steps = ["Select Address", "Shipping & Payment", "Confirm Order"];
    const { cartData, currencies } = this.props;
    // console.log("checking", cartData);
    return (
      <>
        <ScrollToTop />
        {cartData.items ? (
          <div className="cart-flow my-5">
            <Box
              sx={{
                width: "100%",
                pt: {
                  xs: "12%",  // mobile
                  sm: "12%",  // small devices
                  md: "4%",   // tablets and up
                  lg: "4%",   // large screens
                },
              }}
              root={{ color: "green" }}
            >
              <Stepper
                activeStep={this.state.activepage}
                alternativeLabel
                connector={<ColorlibConnector />}
              >
                {steps.map((label, key) => (
                  <Step key={key}>
                    <StepLabel
                      StepIconComponent={ColorlibStepIcon}
                      onClick={() => this.changePAge(label)}
                      style={{ fontFamily: "Poppins" }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
        ) : (
          ""
        )}
        {this.state.page === "checkout" ? (
          <BillingOptions />
        ) : (
          <div>
            {cartData.items ? (
              <div className="row">
                <div className="col-md-9">
                  {this.state.page === "address" ? (
                    <>
                      {localStorage.getItem("customerData") == null ? (
                        <GuestAddress
                          handleClickCustom={this.handleClickCustom}
                        />
                      ) : (
                        <AddressEdit handleClickCustom={this.handleClickCustom} />
                      )}
                    </>
                  ) : null}
                  {/* {this.state.page === "address" &&
               cartData.shipping_address !== null ? (
                 <div className="row text-end mx-5 my-1">
                   <div>
                     <a
                       className="btn btn-solid shipping_check cart-btn"
                       style={{
                         borderRadius: 7,
                         fontSize: 15,
                         width: "100px",
                       }}
                       onClick={(e) =>
                         this.setState({ page: "shipping", activepage: 1 })
                       }
                     >
                       Next First
                     </a>
                   </div>
                 </div>
               ) : null} */}
                  {this.state.page === "shipping" ? (
                    // <></>
                    <ShippingOptions price={cartData.formated_grand_total} />
                  ) : null}
                  {this.state.page === "shipping" &&
                    cartData.payment !== null ? (
                    <div className="row text-end mx-5 my-1">
                      <div>
                        <a
                          className="btn btn-solid shipping_check cart-btn mb-3"
                          style={{
                            borderRadius: 7,
                            fontSize: 15,
                            width: "100px",
                          }}
                          onClick={(e) =>
                            this.setState({ page: "checkout", activepage: 2 })
                          }
                        >
                          Next
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>

                <DetailsSidebar
                  data={cartData.items}
                  subTotal={cartData.formated_sub_total}
                  taxTotal={cartData.formated_tax_total}
                  shippingRate={
                    cartData.selected_shipping_rate
                      ? cartData.selected_shipping_rate.formated_price
                      : `${currencies.code} 0.00`
                  }
                  FDiscount={cartData.formated_discount}
                  FGTotal={cartData.formated_grand_total}
                  coupon={cartData.coupon_code}
                />
              </div>
            ) : (
              <section className="cart-section section-b-space">
                <div className="container">
                  <div className="row">
                    <div className="head50" />

                    <div className="col-sm-12 empty-cart-cls text-center">
                      <EmptyCart />
                      <h3 className="onlyColor">
                        <strong>Your Cart is Empty</strong>
                      </h3>
                      <h4>Explore more shortlist some items.</h4>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  cartData: state.cartList.getcartdata.data
    ? state.cartList.getcartdata.data
    : "",
  currencies: state?.user?.currencies ? state?.user?.currencies : "",
});
export default connect(mapStateToProps, {})(CartSidebars);
