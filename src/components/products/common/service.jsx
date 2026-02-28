import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSideDetails } from "../../../actions";
import store from "../../../store";

class Service extends Component {
  constructor(props) {
    super(props);
    this.counter = React.createRef(0);
    this.state = {
      loadingServices: true,
    };
  }
  componentDidMount() {
    store.dispatch(fetchSideDetails());
  }

  render() {
    const { sideDetails } = this.props;

    const imageLoaded = () => {
      this.counter.current += 1;
      if (this.counter.current >= sideDetails.data.length) {
        this.setState({ loadingServices: false });
      }
    };

    return (
      <>
        <div className="row">
          {sideDetails &&
            sideDetails.data &&
            sideDetails.data.length !== 0 &&
            sideDetails.data.map((data, key) => {
              return (
                <span key={key} className="media  p-3 col-md-3 my-1" style={{}}>
                  <div
                    className="text-center"
                    style={{
                      display: this.state.loadingServices ? "block" : "none",
                    }}
                  >
                    <div className="skeleton-item skeleton-imagesad"></div>
                  </div>

                  <img
                    src={data.icon}
                    style={{
                      display: this.state.loadingServices ? "none" : "block",
                    }}
                    onLoad={imageLoaded}
                    className="mx-2"
                    alt="service"
                  />
                  <div className="media-body px-2">
                    {this.state.loadingServices ? (
                      <>
                        <div className="skeleton-item skeleton-titleia my-1"></div>
                        <div className="skeleton-item skeleton-titleias my-1"></div>
                      </>
                    ) : (
                      <>
                        <h4>{data.main_heading}</h4>
                        <p>{data.sub_heading}</p>
                      </>
                    )}
                  </div>
                </span>
              );
            })}
        </div>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    sideDetails: state.contactDetails.sideDetails,
  };
}

export default connect(mapStateToProps)(Service);
