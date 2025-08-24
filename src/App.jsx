import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard.jsx";
import SearchBar from "./components/SearchBar.jsx";
import useMovies from "./hooks/useMovies.js"
import useDebounce from "./hooks/useDebounce.js";

function App() {
  const { movies, loading, searchMovie } = useMovies();
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);


  useEffect(() => {
    if (debouncedSearchTerm) {
      searchMovie(debouncedSearchTerm);
    } else {
      searchMovie("Batman");
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="app">
      <h1>MovieSpace</h1>

      {/* Search Component */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={() => searchMovie(searchTerm)}
      />

      {/* Conditional Rendering */}
      {loading ? (
        <div className="loading">
          <h2>Loading...</h2>
        </div>
      ) : movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies Found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
