import { useState, useEffect } from "react";

const Slider = ({ images, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto Slide
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [images, interval]);

  // Next Slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // Previous Slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div
      className="position-relative overflow-hidden shadow-sm"
      style={{
        width: "100%",
        height: "430px",
        borderRadius: "0 0 20px 20px",
      }}
    >
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-100 h-100"
        style={{
          objectFit: "cover",
          transition: "all 0.8s ease-in-out",
        }}
      />

      {/* Overlay Gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)",
        }}
      />

      {/* Left Arrow */}
      <button
        className="btn btn-light rounded-circle shadow position-absolute"
        style={{
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
          width: "50px",
          height: "50px",
          zIndex: 10,
        }}
        onClick={prevSlide}
      >
        <i className="bi bi-chevron-left fs-4"></i>
      </button>

      {/* Right Arrow */}
      <button
        className="btn btn-light rounded-circle shadow position-absolute"
        style={{
          top: "50%",
          right: "20px",
          transform: "translateY(-50%)",
          width: "50px",
          height: "50px",
          zIndex: 10,
        }}
        onClick={nextSlide}
      >
        <i className="bi bi-chevron-right fs-4"></i>
      </button>

      {/* Dots */}
      <div
        className="position-absolute d-flex justify-content-center gap-2"
        style={{
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: currentIndex === index ? "28px" : "12px",
              height: "12px",
              borderRadius: "20px",
              background: currentIndex === index ? "#ff9800" : "#ffffff",
              cursor: "pointer",
              transition: "0.4s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
