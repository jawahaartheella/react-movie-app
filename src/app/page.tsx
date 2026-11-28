'use client';

import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

import Search from "../components/Search";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import ProfileDropdown from "../components/ProfileDropdown";
import { getTrendingMovies, updateSearchCount } from "../lib/actions";
import { Movie } from "../types";
import Link from "next/link";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endPoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endPoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Error fetching the movies');
      }

      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMoviesList([]);
        return;
      }

      setMoviesList(data.results || []);

      if (query && query.trim().length >= 3 && data.results && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      if (movies) {
        setTrendingMovies(movies);
      }
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  };

  useDebounce(() => {
    const trimmed = searchTerm.trim();
    if (trimmed.length === 0) {
      setDebounceSearchTerm('')
    } else if (trimmed.length >= 3) {
      setDebounceSearchTerm(searchTerm)
    }
  }, 800, [searchTerm]);

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        {/* Navigation Bar: Logo on the Left, Profile on the Right */}
        <nav className="flex items-center justify-between w-full mb-4 z-20 relative">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img src="/logo-no-bg.svg" alt="Logo" className="w-12 h-auto" />
          </Link>

          <ProfileDropdown />
        </nav>

        <header>
          <img src="/hero.png" alt="Hero banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You&apos;ll Enjoy Without the Hassle
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.movie_id || index}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_path} alt={movie.title || 'Trending movie'} />
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {moviesList.map((movie, index) => (
                <Link href={`/movie/${movie.id}`} key={movie.id || index}>
                  <MovieCard movie={movie} />
                </Link>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
