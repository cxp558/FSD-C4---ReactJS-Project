import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Header from "../../common/header/Header";
import "./Home.css";
import {
  Card,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@material-ui/core";

const styles = (theme) => ({
  cardHeading: {
    color: theme.palette.primary.light,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 240,
    maxWidth: 240,
  },
});

function Home(props) {
  const { history, baseUrl } = props;
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);

  const [movieName, setMovieName] = useState("");
  const [genre, setGenre] = useState([]);
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const { classes } = props;

  useEffect(() => {
    // get movies
    fetch(baseUrl + "movies/?page=1&limit=17")
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        const upComingMovies = response.movies.filter(
          (movie) => movie.status == "PUBLISHED"
        );
        const releasedMovies = response.movies.filter(
          (movie) => movie.status == "RELEASED"
        );
        console.log(upComingMovies);
        console.log(releasedMovies);
        setUpcomingMovies(upComingMovies);
        setReleasedMovies(releasedMovies);
      });
    // get genres
    fetch(baseUrl + "genres/")
      .then((response) => response.json())
      .then((response) => {
        // console.log(response.genres);
        setGenres(response.genres);
      });
    // get artists
    fetch(baseUrl + "artists/")
      .then((response) => response.json())
      .then((response) => {
        // console.log(response.artists);
        // setArtists(response.artists);
        setArtists([]);
      });
  }, []);

  return (
    <div>
      {/* header */}
      <Header />

      {/* upcoming movies title */}
      <div className="homeUpcomingHeader">Upcoming Movies</div>

      {/* upcoming movies list */}
      <GridList className="homeGridList" cols={6}>
        {upcomingMovies.map((movie) => (
          <GridListTile key={movie.id} className="homeGridList">
            <img
              onClick={() => history.push("/movie/" + movie.id)}
              src={movie.poster_url}
              alt={movie.title}
            />
            <GridListTileBar title={movie.title} />
          </GridListTile>
        ))}
      </GridList>

      <div className="homeReleasedMoviesContainer">
        {/* grid of released movies */}
        <div className="homeReleasedMovies">
          <GridList className="homeReleasedGridListContainer" cols={4}>
            {releasedMovies.map((movie) => (
              <GridListTile className="homeReleasedGrid" key={movie.id}>
                <img
                  onClick={() => history.push("/movie/" + movie.id)}
                  src={movie.poster_url}
                  className="homeImg"
                  alt={movie.title}
                />
                <GridListTileBar
                  title={movie.title}
                  subtitle={<span>Released Date: {movie.release_date}</span>}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
        {/* filters */}
        <div className="homeFilters">
          <Card>
            <Typography
              className={classes.formControl + " " + classes.cardHeading}
            >
              FIND MOVIES BY:
            </Typography>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name_input">Movie Name</InputLabel>
              <Input
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                id="name_input"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="genre_checkbox">Genres</InputLabel>
              <Select
                multiple
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                input={<Input id="genre_checkbox" />}
                renderValue={(selected) => selected.join(", ")}
                // MenuProps={MenuProps}
              >
                {genres.map(({ id, genre }) => (
                  <MenuItem key={id} value={genre}>
                    <Checkbox />
                    <ListItemText primary={genre} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="artists_input">Artists</InputLabel>
              <Select
                multiple
                // value={first_name + " " + last_name}
                onChange={(e) => {
                  // setFirst_Name()
                }}
                input={<Input id="artists_input" />}
                // renderValue={selected => selected.join(", ")}
                // MenuProps={MenuProps}
              >
                {artists.map((artist) => (
                  <MenuItem
                    key={artist.id}
                    value={artist.first_name + " " + artist.last_name}
                  >
                    <Checkbox />
                    <ListItemText
                      primary={artist.first_name + " " + artist.last_name}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel shrink={true} htmlFor="release_date_input">
                Release Date Start
              </InputLabel>
              <Input type="date" id="release_date_input" />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel shrink={true} htmlFor="release_date_end_input">
                Release Date End
              </InputLabel>
              <Input type="date" id="release_date_end_input" />
            </FormControl>
            <Button
              className={classes.formControl}
              color="primary"
              variant="contained"
            >
              APPLY
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
