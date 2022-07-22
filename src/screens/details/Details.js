import {
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
} from "@material-ui/core";
import { StarBorderOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import Header from "../../common/header/Header";
import "./Details.css";

const artists = [
  {
    poster_url:
      "https://assets.mubicdn.net/images/notebook/post_images/19893/images-w1400.jpg?1449196747",
    title: "The Amazing Movie Part 1",
    author: "author",
  },
  {
    poster_url:
      "https://assets.mubicdn.net/images/notebook/post_images/19893/images-w1400.jpg?1449196747",
    title: "The Amazing Movie Part 1",
    author: "author",
  },
  {
    poster_url:
      "https://assets.mubicdn.net/images/notebook/post_images/19893/images-w1400.jpg?1449196747",
    title: "The Amazing Movie Part 1",
    author: "author",
  },
  {
    poster_url:
      "https://assets.mubicdn.net/images/notebook/post_images/19893/images-w1400.jpg?1449196747",
    title: "The Amazing Movie Part 1",
    author: "author",
  },
];

const Details = (props) => {
  const { history } = props;
  const movie = {
    poster_url:
      "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
    title: "The Amazing Movie Part 1",
    genres: "Action, Adventure, Sci-Fi",
    release_date: "Jan 11th 2022",
    critics_rating: 8.8,
    duration: "1:48",
    story_line: "A thief who steals coporate secrets throughO",
    wiki_url: "Wiki Link",
  };
  return (
    <div>
      <Header showBookShow />
      <Typography className="backBtn" onClick={() => history.push("/")}>
        {"<"} Back to Home
      </Typography>

      <div className="detailsContainer">
        <div className="detailsLeft">
          <img className="detailsImg" src={movie.poster_url} alt="img" />
        </div>
        <div className="detailsMiddle">
          <Typography variant="headline" component="h2">
            {movie.title}
          </Typography>
          <Typography>
            <b>Genres:</b>
            {movie.genres}{" "}
          </Typography>
          <Typography>
            <b>Duration:</b>
            {movie.duration}{" "}
          </Typography>
          <Typography>
            <b>Released Date:</b> {movie.release_date}
          </Typography>
          <Typography>
            <b>Rating:</b> {movie.critics_rating}
          </Typography>
          <Typography className="detailsPlot">
            <b>Plot:</b> <a href="#">({movie.wiki_url})</a> {movie.story_line}
          </Typography>
          <Typography className="detailsTrailer">
            <b>Trailer:</b>
          </Typography>
        </div>
        <div className="detailsRight">
          <Typography className="detailsTrailer">
            <b>Rate this Movie:</b>
          </Typography>
          <div>
            <StarBorderOutlined />
            <StarBorderOutlined />
            <StarBorderOutlined />
            <StarBorderOutlined />
            <StarBorderOutlined />
          </div>
          <Typography className="detailsTrailer">
            <b>Artists:</b>
          </Typography>
          {/* upcoming movies list */}
          <GridList className="homeGridList" cols={2}>
            {artists.map((tile) => (
              <GridListTile key={tile.poster_url} className="homeGridList">
                <img src={tile.poster_url} alt={tile.title} />
                <GridListTileBar title={tile.title} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    </div>
  );
};

export default Details;
