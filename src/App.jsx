import React from "react";
import Pages from "./pages/Pages";
import Header from "./components/Header";
import Search_Bar from "./components/Search_Bar";
import Categories from "./components/Categories";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Header />
      <Search_Bar />
      <Categories />
      <Pages />
    </Router>
  );
};

export default App;
