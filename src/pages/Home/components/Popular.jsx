import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
//import "swiper/css/navigation";
import "swiper/css/free-mode";
import classes from "./homeComponents.module.css";

import { FreeMode, Autoplay } from "swiper";

const Popular = () => {
  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPopularDishesHandler();
  }, []);

  async function fetchPopularDishesHandler() {
    const localStorageDish = localStorage.getItem("popularDish");
    if (localStorageDish) {
      setDishes(JSON.parse(localStorageDish));
      setIsLoading(false);
    } else {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
          import.meta.env.VITE_API_KEY
        }&number=8&cuisine=italian`
      );
      const data = await response.json();
      //     console.log(data);
      const transformedDishes = data.results.map((dishInfo) => {
        return {
          id: dishInfo.id,
          title: dishInfo.title,
          image: dishInfo.image,
        };
      });
      console.log(transformedDishes);
      setDishes(transformedDishes);
      localStorage.setItem("popularDish", JSON.stringify(transformedDishes));
      setIsLoading(false);
    }
  }
  return (
    <div className={classes.home_container}>
      <h3>Popular Dishes</h3>
      <Swiper
        modules={[FreeMode, Autoplay]}
        freeMode={true}
        spaceBetween={10}
        slidesPerView={2}
        autoHeight={true}
        centeredSlides={true}
        breakpoints={{
          650: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          850: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        autoplay={{
          delay: 5000,
        }}
      >
        {isLoading && (
          <div className={classes.loadingcontainer}>
            <div className={`${classes.skeletonImg} ${classes.skeleton}`}></div>
            <div className={`${classes.skeletonImg} ${classes.skeleton}`}></div>
            {window.innerWidth>=650 && <div className={`${classes.skeletonImg} ${classes.skeleton}`}></div>}
          </div>
        )}
        {!isLoading && dishes.map((dish) => (
          <SwiperSlide key={dish.id}>
            <Link to={"/recipe_details/" + dish.id}>
              <div className={classes.card}>
                <p>{dish.title}</p>
                <img src={dish.image} alt={dish.id} />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div style={{ height: "3rem" }}></div>
    </div>
  );
};

export default Popular;
