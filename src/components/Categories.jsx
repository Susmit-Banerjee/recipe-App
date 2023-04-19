import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./categories.module.css";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";

const Categories = () => {
  return (
    <div className={classes.category}>
      <NavLink to="/cuisine/italian" className={classes.navLink}>
        <FaPizzaSlice />
        <h4>Italian</h4>
      </NavLink>
      <NavLink to="/cuisine/french" className={classes.navLink}>
        <FaHamburger />
        <h4>French</h4>
      </NavLink>
      <NavLink to="./cuisine/thai" className={classes.navLink}>
        <GiNoodles />
        <h4>Thai</h4>
      </NavLink>
      <NavLink to="./cuisine/korean" className={classes.navLink}>
        <GiChopsticks />
        <h4>Korean</h4>
      </NavLink>
    </div>
  );
};

export default Categories;
