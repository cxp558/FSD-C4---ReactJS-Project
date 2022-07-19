import React from "react";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "./Grid.css";

const Grid = ({ poster_url, title }) => {
  return (
    <GridListTile className="grid" key={poster_url}>
      <img src={poster_url} alt={title} />
      <GridListTileBar
        title={title}
        actionIcon={
          <IconButton>
            <StarBorderIcon />
          </IconButton>
        }
      />
    </GridListTile>
  );
};

export default Grid;
