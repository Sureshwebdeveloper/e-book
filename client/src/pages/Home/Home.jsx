import React from "react";
import Banner from "../../components/Banner";
import Book from "../../components/Book";
import FavoriteBook from "../../components/FavBookCard/FavoriteBook";

const Home = () => {
  return (
    <div >
      <Banner />
      <Book />
      <FavoriteBook />
    </div>
  );
};

export default Home;
