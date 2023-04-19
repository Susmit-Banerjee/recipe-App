import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import classes from "./pages.module.css";
import { motion } from "framer-motion";

const Cuisine = () => {
  let params = useParams();
  const [cuisineItems, setCuisineItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchCuisineItems = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&cuisine=${params.type}`
    );
    const data = await response.json();
    setCuisineItems(data.results);
    setIsLoading(false);
    // console.log(data.results);
  };
  useEffect(() => {
    fetchCuisineItems();
  }, [params.type]);

  const dummyNumberOfDishes = 10;

  const loadingContent = (
    <div className={classes.items_container}>
      <div className={classes.items_header}>
        <div className={`${classes.skeleton} ${classes.skeletonText}`}></div>
      </div>
      <div className={classes.items_grid}>
        {[...Array(dummyNumberOfDishes)].map((elem, index) => (
          <div className={classes.item_card} key={index}>
            <img className={`${classes.skeleton} ${classes.skeletonImg}`} />
            <div
              style={{ margin: "auto" }}
              className={`${classes.skeleton} ${classes.skeletonText}`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {isLoading && loadingContent}
      {!isLoading && (
        <motion.div
          className={classes.items_container}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={`${classes.items_header} ${
              isLoading ? classes.skeletonText : ""
            }`}
          >
            <h3>Top picks of {params.type} cuisine </h3>
          </div>
          <div className={classes.items_grid}>
            {cuisineItems.map((c_item) => (
              <div key={c_item.id} className={classes.item_card}>
                <Link to={"/recipe_details/" + c_item.id}>
                  <img src={c_item.image} alt={c_item.id} />
                  <h4>{c_item.title}</h4>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Cuisine;
