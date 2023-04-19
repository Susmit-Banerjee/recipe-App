import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classes from "./Recipe.module.css";
import { motion } from "framer-motion";

const RecipeDetails = () => {
  const params = useParams();
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("instructions");
  const fetchRecipeDetails = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const data = await response.json();
    //  console.log(data);
    setDetails(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, [params.id]);

  const loaderTxtLines = 25;
  const loadingContentStyle = (
    <div className={classes.recipe_container}>
      <div className={classes.recipe_info}>
        <div className={`${classes.skeleton} ${classes.skeletonTxt}`}></div>
        <img style={{width:'75%'}} className={`${classes.skeleton} ${classes.skeletonImg}`} />
      </div>
      <div className={classes.recipe_details}>
        <div className={classes.info_buttons}>
          <button style={{border:'none'}} className={`${classes.skeleton} ${classes.skeletonBtn}`}></button>
          <button style={{border:'none'}} className={`${classes.skeleton} ${classes.skeletonBtn}`}></button>
        </div>
        {[...Array(loaderTxtLines)].map((elem, index) => (
          <div className={`${classes.skeleton} ${classes.skeletonTxt}`} key={index}></div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {isLoading && loadingContentStyle}
      {!isLoading && (
        <motion.div
          className={classes.recipe_container}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={classes.recipe_info}>
            <h3>{details.title}</h3>
            <img src={details.image} alt={details.id} />
          </div>
          <div className={classes.recipe_details}>
            <div className={classes.info_buttons}>
              <button
                className={activeTab === "instructions" ? classes.active : ""}
                onClick={() => setActiveTab("instructions")}
              >
                Instructions
              </button>
              <button
                className={activeTab === "ingredients" ? classes.active : ""}
                onClick={() => setActiveTab("ingredients")}
              >
                Ingredients
              </button>
            </div>

            {activeTab === "instructions" && (
              <div className={classes.instructions}>
                <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
                <p
                  dangerouslySetInnerHTML={{ __html: details.instructions }}
                ></p>
              </div>
            )}

            {activeTab === "ingredients" && (
              <ul className={classes.ingredients}>
                {details.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id}>{ingredient.original}</li>
                ))}
              </ul>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default RecipeDetails;
