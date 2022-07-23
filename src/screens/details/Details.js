import React, { useState, useEffect } from "react";
import { StarBorderOutlined } from "@material-ui/icons";
import Header from "../../common/header/Header";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
} from "@material-ui/core";
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
  const { history, baseUrl, match } = props;
  const [movie, setMovie] = useState({});

  useEffect(() => {
    // get movies
    fetch(baseUrl + "movies/" + match.params.id)
      .then((response) => response.json())
      .then((movie) => {
        console.log(movie);
        setMovie(movie);
      });
  }, []);

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
            {movie.genres}
          </Typography>
          <Typography>
            <b>Duration:</b>
            {movie.duration}{" "}
          </Typography>
          <Typography>
            <b>Released Date:</b> {movie.release_date}
          </Typography>
          <Typography>
            <b>Rating:</b> {movie.rating}
          </Typography>
          <Typography className="detailsPlot">
            <b>Plot:</b> <a href="#">({movie.wiki_url})</a> {movie.storyline}
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
            {artists.map((artist) => (
              <GridListTile key={artist.id} className="homeGridList">
                <img src={artist.poster_url} alt={artist.first_name} />
                <GridListTileBar
                  title={artist.first_name + " " + artist.last_name}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    </div>
  );
};

export default Details;
