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

interface Genre {
    id: number;
    name: string;
}

interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface Actor {
    id: number;
    gender: number;
    original_name: string;
    profile_path: string;
    popularity: number;
    character: string;
}

export interface MovieDetails {
    id: number;
    adult: boolean;
    title: string;
    tagline?: string;
    original_language: string;
    overview: string;
    poster_path: string;
    backdrop_path?: string;
    runtime: number;    // In minutes
    credits: {
        cast: Actor[];
    };
    release_date: string;
    vote_average: number;
    vote_count?: number;
    genres: Genre[];
    budget?: number;
    revenue?: number;
    homepage?: string;
    status?: string;
    production_companies?: ProductionCompany[];
}