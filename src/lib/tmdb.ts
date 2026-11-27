const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = process.env.TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    },
};

export async function getMovieDetails(id: number | string): Promise<unknown> {
    const url = `${API_BASE_URL}/movie/${id}?language=en-US&append_to_response=credits`;

    const res = await fetch(url, API_OPTIONS);

    if (!res.ok) {
        throw new Error("Failed to fetch movie details");
    }

    return res.json();
}