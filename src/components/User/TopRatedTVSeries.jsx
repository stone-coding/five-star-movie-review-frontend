import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";

import GridContainer from "../GridContainer";
import { getTopRatedMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import MovieList from "./MovieList";

export default function TopRatedTVSeries() {
  const [movies, setMovies] = useState([]);
  const { updateNotification } = useNotification();

  const fetchMovies = async (signal) => {
    const { error, movies } = await getTopRatedMovies('TV Series', signal);
    if (error) return updateNotification("error", error);

    setMovies([...movies]);
  };


  useEffect(() => {
    const ac = new AbortController();
    fetchMovies();
    return () => {
        ac.abort()
    }
  }, []);

  return <MovieList movies={movies} title="Viewers choice (TV Series)" />

}
