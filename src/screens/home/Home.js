import React, { useState } from "react";
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

const tileData = [
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

const releasedData = [
  {
    poster_url:
      "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
    title: "The Amazing Movie Part 1",
    releasedDate: "Jan 11th 2022",
  },
  {
    poster_url:
      "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
    title: "The Amazing Movie Part 1",
    releasedDate: "Jan 11th 2022",
  },
  {
    poster_url:
      "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
    title: "The Amazing Movie Part 1",
    releasedDate: "Jan 11th 2022",
  },
  {
    poster_url:
      "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
    title: "The Amazing Movie Part 1",
    releasedDate: "Jan 11th 2022",
  },
  {
    poster_url:
      "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg",
    title: "The Amazing Movie Part 1",
    releasedDate: "Jan 11th 2022",
  },
];

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
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const { classes } = props;

  return (
    <div className="homeRoot">
      {/* header */}
      <Header />

      {/* upcoming movies title */}
      <div className="homeUpcomingHeader">Upcoming Movies</div>

      {/* upcoming movies list */}
      <GridList className="homeGridList" cols={6}>
        {tileData.map((tile) => (
          <GridListTile key={tile.poster_url} className="homeGridList">
            <img className="homeImg" src={tile.poster_url} alt={tile.title} />
            <GridListTileBar title={tile.title} />
          </GridListTile>
        ))}
      </GridList>

      <div className="homeReleasedMoviesContainer">
        {/* grid of released movies */}
        <div className="homeReleasedMovies">
          <GridList className="homeReleasedGridListContainer" cols={4}>
            {releasedData.map((d) => (
              <GridListTile className="homeReleasedGrid" key={d.title}>
                <img src={d.poster_url} className="homeImg" alt={d.title} />
                <GridListTileBar
                  title={d.title}
                  subtitle={<span>Released Date: {d.releasedDate}</span>}
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
