"use server";

import { Movie, TrendingMovie } from "../types";
import { sql } from "./db";

export async function updateSearchCount(searchTerm: string, movie: Movie) {
    try {
        const formattedTerm = searchTerm.toLowerCase().trim();

        await sql`
            INSERT INTO trending_searches(search_term, title, count, movie_id, poster_path) 
            VALUES (
                ${formattedTerm},
                ${movie.title},
                1,
                ${movie.id},
                ${`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            )
            ON CONFLICT(search_term)
            DO UPDATE SET count = trending_searches.count + 1
        `;
    } catch (error) {
        console.error("Error updating the search count in PostgreSQL: ", error);
    }
}

export async function getTrendingMovies(): Promise<TrendingMovie[]> {
    try {
        const movies = await sql`
            SELECT title, movie_id, poster_path, SUM(count)::int AS count
            FROM trending_searches
            GROUP BY title, movie_id, poster_path
            ORDER BY count DESC
            LIMIT 5
        `;
        return movies as unknown as TrendingMovie[];
    } catch (error) {
        console.error("Error fetching trending movies: ", error);
        return [];
    }
}