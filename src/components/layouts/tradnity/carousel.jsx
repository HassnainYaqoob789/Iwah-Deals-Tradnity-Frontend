import React, { useRef, useState } from "react";
import "./carousel.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { SliderH } from "../../../services/script";
import SliderLoader from "../../../svg_code/sliderLoader";

const TradnityCarousel = (props) => {
  const [loadingCarousel, setLoadingCarousel] = useState(true);

  const { image } = props;

  const counter = useRef(0);

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= 1) {
      setLoadingCarousel(false);
    }
  };

  return (
    <>
      <section className="mt-2 p-0 small-slider">
        {loadingCarousel && <SliderLoader />}

        <Slider {...SliderH} className="slide-1 home-slider">
          {image &&
          image.sliderImages &&
          image.sliderImages.data &&
          image.sliderImages.data.length !== 0 ? (
            image.sliderImages.data.map((img, key) => {
              return (
                <div key={key}>
                  {/* <Link
                    style={
                      loadingCarousel
                        ? { display: "none" }
                        : { display: "block" }
                    }
                    to={{ pathname: "/shopPage", state: { slider: img } }}
                  > */}
                    <img
                      width="100vw"
                      className="carouselImg"
                      src={img.image_url}
                      onLoad={() => imageLoaded()}
                      alt="Slider 1"
                    />
                  {/* </Link> */}
                </div>
              );
            })
          ) : (
            <div className="skeleton-item skeleton-copy-full-slider"></div>
          )}
        </Slider>
      </section>
    </>
  );
};

export default TradnityCarousel;
