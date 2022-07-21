import React from "react";
import UpComingGrid from "../../common/upComingGrid/UpComingGrid";
import Header from "../../common/header/Header";
import "./Home.css";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";

const releasedData = [
  {
    poslter_url: "",
    title: "Title 1",
    author: "author",
  },
  {
    poslter_url: "",
    title: "Title 2",
    author: "author",
  },
  {
    poslter_url: "",
    title: "Title 3",
    author: "author",
  },
  {
    poslter_url: "",
    title: "Title 1",
    author: "author",
  },
  {
    poslter_url: "",
    title: "Title 2",
    author: "author",
  },
];
const Home = () => {
  return (
    <div>
      <Header />
      <div className="upcoming_header">Upcoming Movies</div>
      <UpComingGrid />
      <div className="released_movies_container">
        <div className="released_movies_container_left">
          <GridList className="released_grid_list_container" cols={4}>
            {releasedData.map((d) => (
              <GridListTile className="released_grid" key={d.title}>
                <img src="" />
                <GridListTileBar title="First Title" />
              </GridListTile>
            ))}
          </GridList>
        </div>
        <div className="released_movies_container_right">right</div>
      </div>
    </div>
  );
};

export default Home;
