import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import classes from "./pages.module.css";
import { motion } from "framer-motion";
import img404 from "../../src/assets/404 error.webp";

const Searched_Items = () => {
  const params = useParams();
  const [searchedItems, setSearchedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchSearchItems = async (name) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&query=${name}`
    );

    const data = await response.json();
    setSearchedItems(data.results);
    //  console.log(data.results);
    setIsLoading(false);

  };
 
  useEffect(() => {
    fetchSearchItems(params.query);
  }, [params.query]);

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
      {!isLoading && searchedItems.length === 0 && (
        <img className={classes.error} src={img404} alt="404 error image"></img>
      )}
      {!isLoading && searchedItems.length !== 0 && (
        <motion.div
          className={classes.items_container}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={classes.items_header}>
            <h3>Top picks of {params.query} :</h3>
          </div>
          <div className={classes.items_grid}>
            {searchedItems.map((s_item) => (
              <div key={s_item.id} className={classes.item_card}>
                <Link to={"/recipe_details/" + s_item.id}>
                  <img src={s_item.image} alt={s_item.id} />
                  <h4>{s_item.title}</h4>
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Searched_Items;
