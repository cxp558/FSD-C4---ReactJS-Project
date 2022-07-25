import React, { useState, useEffect } from "react";
import { StarBorderOutlined } from "@material-ui/icons";
import YouTube from "react-youtube";
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
  const [rating, setRating] = useState(0);
  const [stars, setStars] = useState([1, 1, 1, 0, 0]);

  useEffect(() => {
    // get movies
    fetch(baseUrl + "movies/" + match.params.id)
      .then((response) => response.json())
      .then((movie) => {
        console.log(movie);
        setMovie(movie);
      });
  }, []);

  const handleRating = (i) => {
    const coloredStars = i;
    const newStars = [...stars];
    newStars.forEach((star, idx) => {
      if (idx <= coloredStars) return (newStars[idx] = 1);
      return (newStars[idx] = 0);
    });

    setStars(newStars);
    setRating(coloredStars + 1);
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
            <b>Genres: </b>
            {movie.genres && movie.genres.join(", ")}
          </Typography>
          <Typography>
            <b>Duration: </b>
            {movie.duration}
          </Typography>
          <Typography>
            <b>Released Date: </b> {new Date(movie.release_date).toDateString()}
          </Typography>
          <Typography>
            <b>Rating:</b> {movie.rating}
          </Typography>
          <Typography className="detailsPlot">
            <b>Plot: </b> <a href={movie.wiki_url}>({movie.wiki_url})</a>{" "}
            {movie.storyline}
          </Typography>
          <Typography className="detailsTrailer">
            <b>Trailer: </b>
          </Typography>
          <YouTube
            videoId={movie.trailer_url && movie.trailer_url.split("=")[1]}
            opts={{ width: "100%" }}
          />
        </div>
        <div className="detailsRight">
          <Typography className="detailsTrailer">
            <b>Rate this Movie:</b>
          </Typography>
          <div>
            {stars.map((color, i) => (
              <StarBorderOutlined
                style={{ color: color ? "yellow" : "black" }}
                key={i}
                onClick={() => handleRating(i)}
              />
            ))}
          </div>
          <Typography className="detailsTrailer">
            <b>Artists: </b>
          </Typography>
          {/* upcoming movies list */}
          <GridList className="detailsGridList" cols={2}>
            {movie.artists &&
              movie.artists.map((artist) => (
                <GridListTile key={artist.id}>
                  <img src={artist.profile_url} alt={artist.title} />
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
