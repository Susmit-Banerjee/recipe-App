import React, { useState } from "react";
import classes from "./search_bar.module.css";
import { FaSearch } from "react-icons/fa";
import {useNavigate} from 'react-router-dom';

const Search_Bar = () => {
  const [searchedFood, setSearchedFood]=useState('');
  const navigate = useNavigate();
  const submitHandler=(e)=>{
    e.preventDefault();
    navigate('./search/'+searchedFood);
    setSearchedFood('');
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.search}>
        <FaSearch />
        <input type="text" onChange={(e)=>setSearchedFood(e.target.value)} value={searchedFood} placeholder='Name your favourite food'/>
      </div>
    </form>
  );
};

export default Search_Bar;
