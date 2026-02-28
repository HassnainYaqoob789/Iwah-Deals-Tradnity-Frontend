import "./productSlider.scss";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Navigation, Thumbs } from "swiper";
import { useState } from "react";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import React from "react";
import Placeholder from "../../../assets/images/placeholder.gif";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Magnifier from "react-magnifier";

const ProductImagesSlider = (props) => {
  const [activeThumb, setActiveThumb] = useState(null);
  const videoUrl = props.item.api.videos.map((v) => {
    return { video_url: v.url, type: "video" };
  });
  const [allUrl, setAllUrl] = useState([...videoUrl, ...props.images]);

  return (
    <>
      <span style={{ display: "block", width: "100%" }}>
        <Swiper
          loop={true}
          spaceBetween={10}
          navigation={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          style={{
            border: "1px solid rgb(236 132 95 / 50%)",
            borderRadius: "6px",
            width: "100%",
          }}
          modules={[Navigation, Thumbs]}
          grabCursor={true}
          thumbs={{ swiper: activeThumb }}
          className="product-images-slider my-2 myImgWidth"
        >
          {props.images &&
            props.images.length !== 0 &&
            allUrl.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  {item?.type === "video" ? (
                    <div>
                      <video
                        controls
                        autoPlay
                        style={{ height: "609px", width: "391px" }}
                        loading="lazy"
                      >
                        <source src={item.video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <Magnifier
                      className="setHeight"
                      height="25em"
                      src={
                        item && typeof item == "string"
                          ? item
                          : item.original_image_url
                          ? item.original_image_url
                          : Placeholder
                      }
                      width="100%"
                    />
                  )}
                </SwiperSlide>
              );
            })}
        </Swiper>
        <Swiper
          onSwiper={setActiveThumb}
          loop={true}
          spaceBetween={10}
          style={{
            width: "auto",
            maxWidth: "100%",
            margin: "8px auto 0",
            borderRadius: "6px",
          }}
          slidesPerView={
            props.images.length === 1 ? 1 : props.images.length === 2 ? 2 : 3
          }
          modules={[Navigation, Thumbs]}
          className="product-images-slider-thumbs"
        >
          {props &&
            props.images &&
            props.images.length !== 0 &&
            allUrl.map((item, index) => (
              <div key={index}>
                <SwiperSlide key={index}>
                  {item?.type === "video" ? (
                    <div>
                      <video
                        loading="lazy"
                        style={{ height: "117px", width: "91px" }}
                      >
                        <source src={item.video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <LazyLoadImage
                      onLoad={() => props.imageLoad()}
                      src={
                        item && typeof item == "string"
                          ? item
                          : item.original_image_url
                          ? item.original_image_url
                          : Placeholder
                      }
                      style={{ display: "block", width: "100%" }}
                      alt="product images"
                    />
                  )}
                </SwiperSlide>
              </div>
            ))}
        </Swiper>
      </span>
    </>
  );
};
ProductImagesSlider.propTypes = {
  images: PropTypes.array.isRequired,
};
export default ProductImagesSlider;
