import { useState, useRef, useEffect } from "react";
import "./../styles/imageSlider.css";

import Article1 from "./../assets/article1.jpg";
import Article2 from "./../assets/article2.jpg";
import Article3 from "./../assets/article3.jpg";
import Article4 from "./../assets/article4.jpg";
import Article5 from "./../assets/article5.jpg";

import { MinusVerticalIcon } from "./icons";

import { IconChevronRight, IconChevronLeft, IconEye, IconHeart, IconMessage } from "@tabler/icons-react";

const ArticleSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const sliderWrapRef = useRef(null);
  const autoSliderRef = useRef(null);

  const slides = [
    { title: "Slide #1", subtitle: "Sub-title #1", image: Article1, color: "#1abc9c", icon: "fa-image" },
    { title: "Slide #2", subtitle: "Sub-title #2", image: Article2, color: "#3498db", icon: "fa-gears" },
    { title: "Slide #3", subtitle: "Sub-title #3", image: Article3, color: "#9b59b6", icon: "fa-sliders" },
    { title: "Slide #4", subtitle: "Sub-title #4", image: Article4, color: "#34495e", icon: "fa-code" },
    { title: "Slide #5", subtitle: "Sub-title #5", image: Article5, color: "#e74c3c", icon: "fa-microphone-slash" },
  ];
  const totalSlides = slides.length;

  useEffect(() => {
    const updateWidth = () => {
      if (sliderWrapRef.current) {
        setSliderWidth(sliderWrapRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const slideRight = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const slideLeft = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    autoSliderRef.current = setInterval(slideRight, 3000);
    return () => clearInterval(autoSliderRef.current);
  }, [totalSlides]);

  const handleMouseEnter = () => {
    clearInterval(autoSliderRef.current);
  };

  const handleMouseLeave = () => {
    autoSliderRef.current = setInterval(slideRight, 3000);
  };

  return (
    <div id='wrapper'>
      <div
        id='slider-wrap'
        ref={sliderWrapRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative", overflow: "hidden", borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px" }}
      >
        <ul
          id='slider'
          style={{
            width: sliderWidth * totalSlides,
            transform: `translateX(-${sliderWidth * currentSlide}px)`,
            transition: "transform 0.5s ease-out",
            display: "flex",
            padding: 0,
            margin: 0,
          }}
        >
          {slides.map((slide, index) => (
            <li
              key={index}
              style={{
                width: sliderWidth,
                listStyle: "none",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div className='position-relative h-100 w-100'>
                <img
                  className='img-fluid w-100'
                  src={slide.image}
                  alt='article'
                  style={{
                    objectFit: "cover",
                    height: "100%",
                  }}
                />

                <div
                  className='position-absolute w-100 h-100 p-4 d-flex flex-column justify-content-end'
                  style={{
                    bottom: "0",
                    left: "0",
                    background: "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.65) 40%, rgba(0, 0, 0, 0.2) 70%, rgba(0, 0, 0, 0) 100%)",
                    // backgroundBlendMode: 'multiply,multiply'
                  }}
                >
                  <div className=''>
                    <div
                      className='d-inline-flex align-items-center mb-3'
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "14px",
                        fontWeight: "300",
                        letterSpacing: "0.03em",
                        lineHeight: "1",
                      }}
                    >
                      <div className='d-inline-flex align-items-center justify-content-center gap-1' style={{}}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width={14}
                          height={14}
                          viewBox='0 0 24 24'
                          fill='#f4a825'
                          className='icon icon-tabler icons-tabler-filled icon-tabler-star'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <path d='M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z' />
                        </svg>
                        Top Story
                      </div>

                      <MinusVerticalIcon width={14} height={14} color='rgba(255,255,255,0.85)' />

                      <div className=''>4 min read</div>
                    </div>
                    <div
                      className='mb-3'
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "2rem",
                        fontWeight: "500",
                        lineHeight: "1",
                      }}
                    >
                      Dummy Article
                    </div>

                    <div
                      className=''
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize: "18px",
                        fontWeight: "300",
                        lineHeight: "1.1",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel convallis mi. Praesent vestibulum neque sit amet erat euismod, egestas aliquet tellus gravida. Aliquam eu consectetur tellus. Curabitur tristique tortor et quam blandit, quis interdum massa condimentum.
                    </div>

                    <div
                      className='d-flex align-items-center justify-content-start mt-3'
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "14px",
                        fontWeight: "300",
                        letterSpacing: "0.03em",
                        lineHeight: "1",
                      }}
                    >
                      <div
                        className='d-inline-flex align-items-center flex-nowrap'
                        style={{
                          gap: "7px",
                        }}
                      >
                        <IconEye width={16} height={16} color='rgba(255,255,255,0.85)' />
                        1,342 Views
                      </div>

                      <MinusVerticalIcon width={12} height={12} color='rgba(255,255,255,0.85)' margin='2' />

                      <div
                        className='d-inline-flex align-items-center flex-nowrap'
                        style={{
                          gap: "7px",
                        }}
                      >
                        <IconHeart width={16} height={16} color='rgb(254, 111, 107)' />
                        340 Likes
                      </div>

                      <MinusVerticalIcon width={12} height={12} color='rgba(255,255,255,0.85)' margin='2' />

                      <div
                        className='d-inline-flex align-items-center flex-nowrap'
                        style={{
                          gap: "7px",
                        }}
                      >
                        <IconMessage width={16} height={16} color='rgb(91, 130, 186)' />
                        40 Comments
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Navigation Buttons */}
        <div className='btns' id='next' onClick={slideRight} style={{ cursor: "pointer", position: "absolute", top: "50%", right: "0px" }}>
          <IconChevronRight className='fa fa-arrow-right' width={24} height={24} color='red' />
        </div>
        <div className='btns' id='previous' onClick={slideLeft} style={{ cursor: "pointer", position: "absolute", top: "50%", left: "0px" }}>
          <IconChevronLeft className='fa fa-arrow-left' />
        </div>

        {/* Pagination Dots */}
        <div id='pagination-wrap' style={{ position: "absolute", bottom: "14px", right: "14px" }}>
          <ul style={{ display: "flex", listStyle: "none", padding: 0, margin: 0 }}>
            {slides.map((_, index) => (
              <li
                key={index}
                onClick={() => setCurrentSlide(index)}
                style={{
                  width: "13px",
                  height: "13px",
                  borderRadius: "50%",
                  background: currentSlide === index ? "#ffffff" : "#747474",
                  margin: "0 6px",
                  cursor: "pointer",
                }}
              ></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArticleSlider;
