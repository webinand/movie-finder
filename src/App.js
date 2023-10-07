import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import search from "./search.svg";
import MovieCard from "./Movies";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=2374acdd";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState([]);

  useEffect(() => {
    searchMovies("barbie");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    // console.log(data);
    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>Naked Pain</h1>

      <div className="search">
        <input
          type="text"
          onKeyUp={() => {
            searchMovies(searchTerm);
          }}
          onChange={(e) => setsearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="search"
        />
        <img
          src={search}
          alt=""
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>no movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
