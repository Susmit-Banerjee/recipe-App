import React from "react";
import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import classes from './Header.module.css';

const Header = () => {
  return (
    <nav className={classes.navBar}>
      <GiKnifeFork />
      <Link to={"/"}>Deliciousss</Link>
    </nav>
  );
};

export default Header;
