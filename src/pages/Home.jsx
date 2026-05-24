import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import AOS from "aos";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "aos/dist/aos.css";

import Atta from "../picture/Atta_and_dals.avif";
import Beauty from "../picture/Beauty_and_personal_care.avif";
import Cleaning from "../picture/Cleaning_essentials.avif";
import Home_essentials from "../picture/Home_essentials.avif";
import kids_fashion from "../picture/kids_fashion.avif";
import Kitchen_must_haves from "../picture/Kitchen_must_haves.avif";
import Laptops_and_Tablets from "../picture/Laptops_and_Tablets.avif";
import men_fashion from "../picture/men_fashion.avif";
import Oil_and_ghee from "../picture/Oil_and_ghee.avif";
import Smart_Televisions from "../picture/Smart_Televisions.avif";

const Home = () => {
  useEffect(() => {
    document.title = "Ecommerce | Home Page";

    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const veritycard = [
    {
      image: Atta,
      title: "Atta & Dals",
    },
    {
      image: Beauty,
      title: "Beauty Care",
    },
    {
      image: Cleaning,
      title: "Cleaning",
    },
    {
      image: Home_essentials,
      title: "Home Essentials",
    },
    {
      image: kids_fashion,
      title: "Kids Fashion",
    },
    {
      image: Kitchen_must_haves,
      title: "Kitchen",
    },
    {
      image: Laptops_and_Tablets,
      title: "Laptops",
    },
    {
      image: men_fashion,
      title: "Men Fashion",
    },
    {
      image: Oil_and_ghee,
      title: "Oil & Ghee",
    },
    {
      image: Smart_Televisions,
      title: "Smart TV",
    },
  ];

  const slideImages = [
    "./banner-Image/b0.jpg",
    "./banner-Image/b2.jpg",
    "./banner-Image/b1.jpg",
    "./banner-Image/b5.jpg",
  ];

  const slideImages2 = [
    "./banner-Image/b3.jpg",
    "./banner-Image/b4.jpg",
    "./banner-Image/b5.jpg",
  ];

  return (
    <div className="container-fluid p-0 bg-light">
      {/* Main Slider */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation
      >
        {slideImages.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt="banner"
              className="img-fluid w-100"
              style={{
                height: "420px",
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Banner */}
      <div className="container-fluid py-3" data-aos="fade-up">
        <img
          src="./banner-Image/rajcommerce2.png"
          alt="banner"
          className="img-fluid rounded-4 shadow-sm w-100"
        />
      </div>

      {/* Offer Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3500,
        }}
        loop
        pagination={{
          clickable: true,
        }}
      >
        {slideImages2.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt="offer"
              className="img-fluid w-100 rounded-3"
              style={{
                height: "220px",
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Category Cards */}
      <div className="container py-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Shop By Category</h2>
          <p className="text-muted">Best products for daily life</p>
        </div>

        <div className="row g-4">
          {veritycard.map((item, index) => (
            <div
              className="col-lg-2 col-md-3 col-sm-4 col-6"
              key={index}
              data-aos="zoom-in"
            >
              <div className="card border-0 shadow rounded-4 overflow-hidden h-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-img-top"
                />

                <div className="card-body text-center">
                  <h6 className="fw-bold">{item.title}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
