import React from "react";
import UpComingGrid from "../../common/upComingGrid/UpComingGrid";
import Header from "../../common/header/Header";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="upcoming_header">Upcoming Movies</div>
      <UpComingGrid />
    </div>
  );
};

export default Home;
