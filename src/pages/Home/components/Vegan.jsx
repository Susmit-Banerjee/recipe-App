import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import classes from "./homeComponents.module.css";

import { FreeMode, Autoplay } from "swiper";

const Vegan = () => {
  const [veganDishes, setVeganDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVeganDishesHandler();
  }, []);

  async function fetchVeganDishesHandler() {
    const localStorageDish = localStorage.getItem("veganDish");
    if (localStorageDish) {
      setVeganDishes(JSON.parse(localStorageDish));
      setIsLoading(false);
    } else {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&number=8&diet=vegan`
      );
      const data = await response.json();
    //  console.log(data);
      const transformedDishes = data.results.map((dishInfo) => {
        return {
          id: dishInfo.id,
          title: dishInfo.title,
          image: dishInfo.image,
        };
      });
      console.log(transformedDishes);
      setVeganDishes(transformedDishes);
      localStorage.setItem("veganDish", JSON.stringify(transformedDishes));
      setIsLoading(false);
    }
  }

  return (
    <div className={classes.home_container}>
      <h3>Our Vegan Picks</h3>
      <Swiper
        modules={[FreeMode, Autoplay]}
        freeMode={true}
        spaceBetween={10}
        slidesPerView={2}
        autoHeight={true}
        centeredSlides={true}
        breakpoints={{
          500: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          850: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        autoplay={{
          delay: 3000
        }}
      >
        {isLoading && (
          <div className={classes.loadingcontainer}>
            <div className={`${classes.skeletonImg} ${classes.skeleton}`}></div>
            <div className={`${classes.skeletonImg} ${classes.skeleton}`}></div>
            {window.innerWidth>=650 && <div className={`${classes.skeletonImg} ${classes.skeleton}`}></div>}
          </div>
        )}
        {!isLoading && veganDishes.map((dish) => (
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
    </div>
  );
};

export default Vegan;
