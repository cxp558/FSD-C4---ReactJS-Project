import React from "react";
import GridList from "@material-ui/core/GridList";
import "./UpComingGrid";
import Grid from "../grid/Grid";

const tileData = [
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
  {
    poslter_url: "",
    title: "Title 3",
    author: "author",
  },
  {
    poslter_url: "",
    title: "Title 3",
    author: "author",
  },
];
function SingleLineGridList(props) {
  return (
    <GridList className="grid_list_container" cols={6}>
      {tileData.map((tile, i) => (
        <Grid key={i} poster_url={tile.poster_url} title={tile.title} />
      ))}
    </GridList>
  );
}

export default SingleLineGridList;
