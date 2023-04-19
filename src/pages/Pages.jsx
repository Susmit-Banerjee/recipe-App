import React from "react";
import Home from "./Home/Home";
import Searched_Items from "./Searched_Items";
import Cuisine from "./Cuisine";
import NotFound from "./NotFound";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import RecipeDetails from "./Recipes/RecipeDetails";
import { AnimatePresence } from "framer-motion";

const Pages = () => {
  const location = useLocation();
  //  let params=useParams();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<Searched_Items />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path={"/recipe_details/:id"} element={<RecipeDetails />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Pages;
