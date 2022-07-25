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
        console.log(response);
        setArtists(response.artists);
      });
  }, []);

  const handleFilterMovies = () => {
    const _startDate = new Date(dateStart);
    const _endDate = new Date(dateEnd);
    // filter movies with name and genre
    const filteredMovies = [];

    for (let i = 0; i < movies.length; i++) {
      const date = new Date(movies[i].release_date);
      if (
        movies[i].title == movieName ||
        movies[i].genres.includes(...genre) ||
        (date > _startDate && date < _endDate)
      ) {
        for (let j = 0; j < artist.length; j++) {
          if (movies[i].artists.includes(...artist[j])) {
            filteredMovies.push(movies[i]);
          }
        }
      }
    }

    setReleasedMovies(filteredMovies);
    console.log(filteredMovies);
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
              <InputLabel shrink={true} htmlFor="release_date_input">
                Release Date Start
              </InputLabel>
              <Input
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                type="date"
                id="release_date_input"
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel shrink={true} htmlFor="release_date_end_input">
                Release Date End
              </InputLabel>
              <Input
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                type="date"
                id="release_date_end_input"
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
