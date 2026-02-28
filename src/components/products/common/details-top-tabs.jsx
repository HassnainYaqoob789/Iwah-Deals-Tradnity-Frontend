import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.scss';
import "./details.scss"
import Slider from 'react-slick';

import ReactStars from "react-rating-stars-component";
import { postreviews } from "../../../actions"
import store from '../../../store';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import image from "../../../assets/images/profile.png"
import DOMPurify from 'dompurify';
import { LazyLoadImage } from 'react-lazy-load-image-component';

class DetailsTopTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product_id: this.props.item.id,
      rating: "",
      title: "",
      comment: "",
    };


  }

  render() {
    const { review } = this.props;


    const percentage = (this.props.item.api.reviews.percentage !== 0) ? Object.entries(JSON.parse(this.props.item.api.reviews.percentage)) : [];
    var settings = {
      // dots: true,
      infinite: false,
      className: "center",
      centerMode: true,
      centerPadding: "5px",
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 586,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    }


    const ratingChanged = (newRating) => {
      this.setState({ rating: newRating })
    };
    const SubmitReviews = (e) => {
      e.preventDefault();
      let Product_Ids = DOMPurify.sanitize(this.props.item.id, { USE_PROFILES: { html: false } });
      let Titles = DOMPurify.sanitize(this.state.title, { USE_PROFILES: { html: false } });
      let Comments = DOMPurify.sanitize(this.state.comment, { USE_PROFILES: { html: false } });
      let Ratings = DOMPurify.sanitize(this.state.rating, { USE_PROFILES: { html: false } });

      let data = {
        product_id: Product_Ids,
        title: Titles,
        comment: Comments,
        rating: Ratings
      }
      store.dispatch(postreviews(data));
      toast.success("Review sent", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        bodyClassName: 'toastStyle',
      });
    }



    return (
      <section className="tab-product px-3" >

        <Tabs className="tab-content nav-material" >
          <TabList className="nav nav-tabs nav-material" >
            <div style={{ margin: "auto" }}>

              <Tab className="nav-item mx-2 my-2">
                <span className="nav-link" ><i className="icofont icofont-man-in-glasses"></i>Details</span>
                <div className="material-border"></div>
              </Tab>
              <Tab className="nav-item mx-2 my-2">
                <span className="nav-link" ><i className="icofont icofont-man-in-glasses"></i>Reviews</span>
                <div className="material-border"></div>
              </Tab>
              {
                this.props.item && this.props.item.features ?
                  <Tab className="nav-item mx-2 my-2">
                    <span className="nav-link" ><i className="icofont icofont-man-in-glasses"></i>Features</span>
                    <div className="material-border"></div>
                  </Tab>
                  :
                  ''
              }
              {
                localStorage.getItem("customerData") ?
                  <Tab className="nav-item">
                    <span className="nav-link" >
                      <i className="icofont icofont-contacts"></i>Write Review</span>
                    <div className="material-border"></div>
                  </Tab> : ""
              }
            </div>
          </TabList>
          {/* <TabPanel>
                                <p className="mt-4 p-0 text-black">
                                 <p style={{color:"black",fontFamily:"Poppins, sans-serif"}} dangerouslySetInnerHTML={{__html: this.props.item && this.props.item.description}} />
                                </p>
                            </TabPanel> */}

          <TabPanel>
            <div className="mt-4 p-0 custom-description">
              <div dangerouslySetInnerHTML={{ __html: this.props.item && this.props.item.description }} />
            </div>
          </TabPanel>
          <TabPanel>
            <p className="mt-4 px-4 row">
              <div className='col-md-4'>
                <div className="reviews">
                  <h4 className="reviews__heading" style={{ fontFamily: "Poppins, sans-serif" }}>Customer reviews</h4>
                  <div className="reviews__average-ratings">
                    <div className="average-ratings__stars">
                      <ReactStars
                        count={5}
                        size={24}
                        isHalf={true}
                        value={this.props.item && this.props.item.api.reviews.average_rating}
                        edit={false}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      />


                      <span className="stars__average-rating-score px-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                        {this.props.item && this.props.item.api.reviews.average_rating} / {(this.props.item && this.props.item.api.reviews.average_rating == 0) ? "0.0" : "5.0"}
                      </span>
                    </div>
                    <div className="average-ratings__total-customers">
                    </div>
                  </div>
                  <div className="reviews__breakdown">
                    <div className="reviews-breakdown__wrapper">
                      <div className="reviews__single-star-average">
                        <div className="single-star-average__amount">5 star</div>
                        <div className="single-star-average__progress-bar">
                          <progress
                            className="progress-bar__data"
                            max="100"
                            value={(percentage[4]) ? percentage[4][1] : 0}
                          ></progress>
                        </div>
                        <div className="single-star-average__percentage">{(percentage[4]) ? percentage[4][1] : 0}%</div>
                      </div>
                      <div className="reviews__single-star-average">
                        <div className="single-star-average__amount">4 star</div>
                        <div className="single-star-average__progress-bar">
                          <progress
                            className="progress-bar__data"
                            max="100"
                            value={(percentage[3]) ? percentage[3][1] : 0}
                          ></progress>
                        </div>
                        <div className="single-star-average__percentage">{(percentage[3]) ? percentage[3][1] : 0}%</div>
                      </div>
                      <div className="reviews__single-star-average">
                        <div className="single-star-average__amount">3 star</div>
                        <div className="single-star-average__progress-bar">
                          <progress
                            className="progress-bar__data"
                            max="100"
                            value={(percentage[2]) ? percentage[2][1] : 0}
                          ></progress>
                        </div>
                        <div className="single-star-average__percentage">{(percentage[2]) ? percentage[2][1] : 0}%</div>
                      </div>
                      <div className="reviews__single-star-average">
                        <div className="single-star-average__amount">2 star</div>
                        <div className="single-star-average__progress-bar">
                          <progress
                            className="progress-bar__data"
                            max="100"
                            value={(percentage[1]) ? percentage[1][1] : 0}
                          ></progress>
                        </div>
                        <div className="single-star-average__percentage">{(percentage[1]) ? percentage[1][1] : 0}%</div>
                      </div>
                      <div className="reviews__single-star-average">
                        <div className="single-star-average__amount">1 star</div>
                        <div className="single-star-average__progress-bar">
                          <progress
                            className="progress-bar__data"
                            max="100"
                            value={(percentage[0]) ? percentage[0][1] : 0}
                          ></progress>
                        </div>
                        <div className="single-star-average__percentage">{(percentage[0]) ? percentage[0][1] : 0}%</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className='col-md-8' style={{ marginTop: 10, padding: 10, border: "1px solid rgba(0,0,0,5%)", borderRadius: 10 }}>
                <div style={{ padding: "5px 15px 15px 15px", display: "flex", justifyContent: "space-evenly", borderBottom: "1px solid rgba(0,0,0,0.08)", marginBottom: 10 }}>

                  <span className='fw-bold'>Showing Customer Reviews:</span>
                  <span>{review && review.length} results</span>

                </div>




                <Slider {...settings} className="slide-1 offer-slider">
                  {
                    (review && review.length !== 0) ?
                      review.map((e, i) => {
                        return (
                          <main key={i} className="main" >
                            <article className="patrick article patrick--blackblue" style={{ padding: "22px" }}>
                              <div style={{ display: "inline-flex" }}>

                                <LazyLoadImage src={(e.customer.profile) ? e.customer.profile : image} alt="" height="50px" width="50px" aria-hidden="true" className="profile profile--violet" />
                                <div style={{ marginLeft: 15 }}>
                                  <div className="namei text-dark my-1">{e.name}</div>
                                  <p className="verified" style={{ whiteSpace: "pre-wrap", fontSize: "1em", wordBreak: "break-all" }}>{e.customer.email}</p>
                                </div>
                              </div>
                              <br />
                              <ReactStars
                                count={5}

                                size={24}
                                isHalf={true}
                                value={e.rating}
                                edit={false}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"
                              />
                              <p className="fs-5" style={{ fontWeight: 500, marginTop: 15 }}>{e.title}</p>
                              <p className='my-3  '>{e.comment}</p>
                            </article>
                            <div className="media-body ml-3">

                            </div>
                          </main>
                        )
                      })
                      :
                      <main className="main" style={{ textAlign: "center" }} >
                        <article className="patrick article patrick--blackblue">
                          <p className="namei text-dark"></p>
                          <p className="verified"></p>
                          <p className="details">No Reviews</p>
                        </article>
                      </main>
                  }
                </Slider>





              </div>

            </p>
          </TabPanel>
          {
            this.props.item.features ?
              <TabPanel>
                <p className="mt-4 p-0">
                  {this.props.item.features}
                </p>
              </TabPanel>
              :
              ''
          }
          <TabPanel>
            <form className="theme-form mt-4">
              <div className="form-row">
                <div className="col-md-12 ">
                  <div className="media m-0">
                    <label className='my-2'>Rating:</label>
                    <div className='mx-3'>
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        value={this.state.rating}
                        activeColor="#ffd700"
                      />,
                    </div>

                  </div>
                </div>

                <div className="col-md-12">
                  <label htmlFor="review">Review Title</label>
                  <input type="text" className="form-control" value={this.state.title} id="review" onChange={(e) => this.setState({ title: e.target.value })} placeholder="Enter your Review Subjects" required />
                </div>
                <div className="col-md-12">
                  <label htmlFor="review">Review Comments</label>
                  <textarea className="form-control" value={this.state.comment} onChange={(e) => this.setState({ comment: e.target.value })} placeholder="Wrire Your Testimonial Here" id="exampleFormControlTextarea1" rows="6"></textarea>
                </div>
                <div className="col-md-12">
                  <button disabled={(this.state.rating !== '' && this.state.title !== '' && this.state.comment !== '') ? false : true} className="btn btn-solid" type="submit" onClick={(e) => SubmitReviews(e)}>Submit YOur Review</button>
                </div>
              </div>
            </form>
          </TabPanel>
        </Tabs>

      </section>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    review: state.data.reviewsdata.data,
  }
}
export default connect(mapStateToProps)(DetailsTopTabs);
