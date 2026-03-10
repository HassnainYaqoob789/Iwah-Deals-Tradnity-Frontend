import "./productSlider.scss";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Navigation, Thumbs } from "swiper";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import React, { forwardRef } from "react";
import Placeholder from "../../../assets/images/placeholder.gif";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Magnifier from "react-magnifier";
import { useEffect, useState } from "react";


const ProductImagesSlider = forwardRef((props, ref) => {
  const [activeThumb, setActiveThumb] = useState(null);
  const videoUrl = props.item.api.videos.map((v) => {
    return { video_url: v.url, type: "video" };
  });
  const [allUrl, setAllUrl] = useState([...videoUrl, ...props.images]);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    const narrow = window.innerWidth <= 767 || (window.matchMedia && window.matchMedia("(max-width: 767px)").matches);
    return narrow;
  });
  // state for mobile image popup
  const [modalImage, setModalImage] = useState(null);


  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => {
      const narrow = window.innerWidth <= 767;
      setIsMobile(narrow);
    };
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);


  return (
    <>
      <span style={{ display: "block", width: "100%" }}>
        <Swiper
          ref={ref}
          loop={true}
          spaceBetween={10}
          navigation={true}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          style={{
            border: "1px solid rgb(236 132 95 / 50%)",
            borderRadius: "6px",
            width: "100%",
            ...(isMobile ? { height: "clamp(420px, 75vh, 720px)" } : {}),

          }}
          autoHeight={isMobile}

          modules={[Navigation, Thumbs]}
          grabCursor={true}
          thumbs={{ swiper: activeThumb }}
          className={`product-images-slider myImgWidth ${isMobile ? "product-images-slider--mobile" : "my-2"
            }`}

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
                    // when on mobile we allow click to open a standalone image
                    <div
                      className="mobile-magnifier-container"
                      onClick={(e) => {
                        if (isMobile) {
                          const srcValue =
                            item && typeof item == "string"
                              ? item
                              : item.original_image_url
                              ? item.original_image_url
                              : Placeholder;
                          setModalImage(srcValue);
                        }
                      }}
                      onTouchEnd={(e) => {
                        if (isMobile) {
                          const srcValue =
                            item && typeof item == "string"
                              ? item
                              : item.original_image_url
                              ? item.original_image_url
                              : Placeholder;
                          setModalImage(srcValue);
                        }
                      }}
                    >
                      <Magnifier
                        key={
                          item && typeof item === "string"
                            ? item
                            : item && item.original_image_url
                            ? item.original_image_url
                            : item && item.video_url
                            ? item.video_url
                            : undefined
                        }
                        className="setHeight"
                        /* on mobile fill parent, on desktop keep reasonable fixed height so the magnifier logic works */
                        height={isMobile ? "100%" : "30em"}
                        src={
                          item && typeof item == "string"
                            ? item
                            : item.original_image_url
                              ? item.original_image_url
                              : Placeholder
                        }
                        width="100%"
                        onClick={() => {
                          if (isMobile) {
                            const srcValue =
                              item && typeof item == "string"
                                ? item
                                : item.original_image_url
                                ? item.original_image_url
                                : Placeholder;
                            setModalImage(srcValue);
                          }
                        }}
                        onTouchEnd={(e) => {
                          // also respond to touch events
                          if (isMobile) {
                            const srcValue =
                              item && typeof item == "string"
                                ? item
                                : item.original_image_url
                                ? item.original_image_url
                                : Placeholder;
                            setModalImage(srcValue);
                          }
                        }}
                      />
                    </div>
                  )}
                </SwiperSlide>
              );
            })}
        </Swiper>
        {/* modal overlay should sit outside the Swiper components to avoid being clipped */}
        {modalImage && (
          <div
            className="image-modal"
            onClick={() => setModalImage(null)}
          >
            <img src={modalImage} alt="enlarged" />
          </div>
        )}
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
        {/* end of main slider */}

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
});

ProductImagesSlider.displayName = "ProductImagesSlider";
ProductImagesSlider.propTypes = {
  images: PropTypes.array.isRequired,
};
export default ProductImagesSlider;