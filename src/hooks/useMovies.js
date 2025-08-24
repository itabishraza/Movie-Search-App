import { useState } from "react";

const API_URL = "https://www.omdbapi.com/?apikey=6ab7526";

function useMovies() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cache, setCache] = useState({});

    const searchMovie = async (title) => {
        if (cache[title]) {
            setMovies(cache[title]);
            return;
        }

        setLoading(true);
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        if (data.Search) {
            setMovies(data.Search);
            setCache((prev) => ({ ...prev, [title]: data.Search }));
        } else {
            setMovies([]);
        }

        setLoading(false);
    };

    return { movies, loading, searchMovie };
}

export default useMovies;
