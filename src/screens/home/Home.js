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
  TextField,
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
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [releasedMovies, setReleasedMovies] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);

  const [movieName, setMovieName] = useState("");
  const [genre, setGenre] = useState([]);
  const [artist, setArtist] = useState([]);
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const defaultDate = undefined;
  const { classes } = props;

  useEffect(() => {
    // get movies
    fetch(baseUrl + "movies/?page=1&limit=17")
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);
        const upComingMovies = response.movies.filter(
          (movie) => movie.status === "PUBLISHED"
        );
        const releasedMovies = response.movies.filter(
          (movie) => movie.status === "RELEASED"
        );
        setMovies(response.movies);
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
        // console.log(response);
        setArtists(response.artists);
      });
  }, []);

  const handleFilterMovies = () => {
    const rel_movies = movies.filter((movie) => movie.status === "RELEASED");

    const filteredMovies = [];

    for (let i = 0; i < rel_movies.length; i++) {
      const date = rel_movies[i].release_date;
      console.log(checkDate(dateStart, dateEnd, date));
      if (
        checkTitle(rel_movies[i], movieName, filteredMovies) &&
        checkGenres(rel_movies[i], genre, filteredMovies) &&
        checkActors(rel_movies[i], artist, filteredMovies) &&
        checkDate(dateStart, dateEnd, date)
      ) {
        filteredMovies.push(rel_movies[i]);
      }
    }

    setReleasedMovies(filteredMovies);

    setMovieName("");
    setGenre([]);
    setArtist([]);
    setDateStart(defaultDate);
    setDateEnd(defaultDate);
  };

  const checkTitle = (movie, movieName, filteredMovies) => {
    if (!movieName) return true;
    if (
      movie.title.trim().toLowerCase().includes(movieName.toLowerCase()) &&
      !filteredMovies.includes(movie)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkGenres = (movie, genre, filteredMovies) => {
    if (genre.length <= 0) return true;
    for (let j = 0; j < genre.length; j++) {
      if (movie.genres.includes(genre[j]) && !filteredMovies.includes(movie)) {
        return true;
      }
    }
    return false;
  };
  const checkActors = (movie, artist, filteredMovies) => {
    if (artist.length <= 0) return true;
    const actors = [];
    for (let u = 0; u < movie.artists.length; u++) {
      actors.push(
        movie.artists[u].first_name + " " + movie.artists[u].last_name
      );
    }
    for (let j = 0; j < artist.length; j++) {
      if (actors.includes(artist[j]) && !filteredMovies.includes(movie)) {
        return true;
      }
    }
    return false;
  };
  const checkDate = (dateFrom, dateTo, dateCheck) => {
    console.log(dateFrom);
    if (dateFrom === defaultDate && dateTo === defaultDate) return true;
    if (dateFrom && dateTo && dateCheck) {
      var d1 = dateFrom.split("-");
      var d2 = dateTo.split("-");
      var c = dateCheck.split("-");

      var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]); // -1 because months are from 0 to 11
      var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
      var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);

      return check > from && check < to;
    }
    return false;
  };

  return (
    <div>
      {/* header */}
      <Header />

      {/* upcoming movies title */}
      <div className="homeUpcomingHeader">Upcoming Movies</div>

      {/* upcoming movies list */}
      <GridList className="homeGridList" cols={6}>
        {upcomingMovies.map((movie, i) => (
          <GridListTile key={i} className="homeGridList">
            <img src={movie.poster_url} alt={movie.title} />
            <GridListTileBar title={movie.title} />
          </GridListTile>
        ))}
      </GridList>

      <div className="homeReleasedMoviesContainer">
        {/* grid of released movies */}
        <div className="homeReleasedMovies">
          <GridList className="homeReleasedGridListContainer" cols={4}>
            {releasedMovies.map((movie, i) => (
              <GridListTile key={i} className="homeReleasedGrid">
                <img
                  onClick={() => history.push("/movie/" + movie.id)}
                  src={movie.poster_url}
                  className="homeImg"
                  alt={movie.title}
                />
                <GridListTileBar
                  title={movie.title}
                  subtitle={
                    <span>
                      Released Date:{" "}
                      {new Date(movie.release_date).toDateString()}
                    </span>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
          {releasedMovies.length === 0 && <h1>No Released Movie</h1>}
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
                value={artist}
                onChange={(e) => {
                  setArtist(e.target.value);
                }}
                input={<Input id="artists_input" />}
                renderValue={(selected) => selected.join(", ")}
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
              <TextField
                id="date_start"
                label="Release Date Start"
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                id="date_end"
                label="Release Date End"
                type="date"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <Button
              className={classes.formControl}
              color="primary"
              variant="contained"
              onClick={handleFilterMovies}
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
