import React, { useState, useEffect } from "react";
import axios from "../axios";
import movieTrailer from "movie-trailer";

//CSS Import
import "./Row.css";

//Youtube
import Youtube from "react-youtube";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = (props) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    //Wrote fetchUrl inside of useEffect square brackets because it depends on the URL that we are fetching.
    const fetchData = async () => {
      const request = await axios.get(props.fetchUrl);
      setMovies(request.data.results);
      return request;
    };
    fetchData();
  }, [props.fetchUrl]);

  console.log(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          if (url == null) {
            return;
          }

          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="row-posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={`row-poster ${props.largeRow && "row-posterLarge"}`}
            src={`${base_url}${
              props.largeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
