export interface Movie {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
    release_date: string;
    original_language: string;
}

export interface User {

}

export interface TrendingMovie {
    title: string;
    movie_id: number;
    poster_path: string;
    count: number
}