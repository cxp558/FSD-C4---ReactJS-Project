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

const genres = [
  "Drama",
  "Romance",
  "Horror",
  "Action",
  "Crime",
  "Thriller",
  "Political",
  "Social",
  "Fantacy",
  "Suspence",
  "Adventure",
  "Comedy",
];

const artists = ["Desmond Oben", "Niko Rene", "Rico gaspien", "Tizzy Panchak"];

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
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const { classes } = props;

  useEffect(() => {
    fetch(baseUrl + "movies/")
      .then((response) => response.json())
      .then((response) => {
        console.log(response.movies);
        setUpcomingMovies(response.movies);
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
            <img src={movie.poster_url} alt={movie.title} />
            <GridListTileBar title={movie.title} />
          </GridListTile>
        ))}
      </GridList>

      <div className="homeReleasedMoviesContainer">
        {/* grid of released movies */}
        <div className="homeReleasedMovies">
          <GridList className="homeReleasedGridListContainer" cols={4}>
            {upcomingMovies.map((movie) => (
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
              <Input id="name_input" />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="genre_checkbox">Genres</InputLabel>
              <Select
                multiple
                value={selectedNames}
                // onChange={this.handleChange}
                input={<Input id="genre_checkbox" />}
                // renderValue={selected => selected.join(", ")}
                // MenuProps={MenuProps}
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
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
                value={selectedArtists}
                // onChange={this.handleChange}
                input={<Input id="artists_input" />}
                // renderValue={selected => selected.join(", ")}
                // MenuProps={MenuProps}
              >
                {artists.map((artist) => (
                  <MenuItem key={artist} value={artist}>
                    <Checkbox />
                    <ListItemText primary={artist} />
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
