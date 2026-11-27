import Link from "next/link";
import { getMovieDetails } from "../../../lib/tmdb";
import { MovieDetails } from "../../../types";
import LikeButton from "../../../components/LikeButton";
import WatchlistButton from "../../../components/WatchlistButton";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function MovieDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const movie = (await getMovieDetails(id)) as MovieDetails;


    // Format currency helpers
    const formatCurrency = (amount?: number) => {
        if (!amount || amount === 0) return "N/A";
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Format runtime helper (e.g. 148 -> 2h 28m)
    const formatRuntime = (minutes?: number) => {
        if (!minutes) return "N/A";
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    // Filter the cast based on popularity
    const castMembers = movie.credits?.cast
        ? movie.credits.cast
            .filter((c) => c.popularity > 15)
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 5)
        : [];

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        : "/no-movie.png";

    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
        : null;

    return (
        <main className="min-h-screen relative bg-primary pb-20">
            {/* Background Hero Backdrop Image */}
            {backdropUrl && (
                <div className="absolute top-0 left-0 w-full h-[550px] overflow-hidden pointer-events-none z-0">
                    <img
                        src={backdropUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover object-top opacity-20 filter blur-xs"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-primary/80 to-primary" />
                </div>
            )}

            {/* Background decorative pattern */}
            <div className="pattern opacity-40 pointer-events-none" />

            <div className="details-wrapper">
                {/* Navigation Bar */}
                <nav className="mb-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-light-200 hover:text-white transition-colors text-sm font-semibold bg-dark-100/60 border border-light-100/10 px-4 py-2 rounded-xl backdrop-blur-md"
                    >
                        <span>&larr;</span> Back to Movies
                    </Link>
                </nav>

                {/* Main Movie Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
                    {/* Left Column: Movie Poster & Action Buttons */}
                    <div className="flex flex-col items-center md:items-start space-y-5">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-light-100/10 border border-white/10 w-full max-w-[340px]">
                            <img
                                src={posterUrl}
                                alt={movie.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* Action Buttons: Like & Add to Watchlist (Modular Server Components) */}
                        <div className="w-full max-w-[340px] space-y-3">
                            <LikeButton movieId={movie.id} />
                            <WatchlistButton movieId={movie.id} />
                        </div>
                    </div>

                    {/* Right Column: Details, Storyline, Cast & Stats */}
                    <div className="md:col-span-2 flex flex-col space-y-6">
                        {/* Title & Tagline */}
                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-3xl sm:text-5xl font-bold text-white text-left max-w-none mx-0 leading-tight">
                                    {movie.title}
                                </h1>
                                {movie.release_date && (
                                    <span className="text-xl sm:text-2xl text-gray-100 font-normal">
                                        ({movie.release_date.split("-")[0]})
                                    </span>
                                )}
                            </div>

                            {movie.tagline && (
                                <p className="mt-2 text-light-200 italic text-base sm:text-lg">
                                    &ldquo;{movie.tagline}&rdquo;
                                </p>
                            )}
                        </div>

                        {/* Quick Metadata Badges */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-100">
                            {/* Rating */}
                            <div className="flex items-center gap-1.5 bg-dark-100/80 border border-light-100/15 px-3 py-1.5 rounded-lg">
                                <img src="/star.svg" alt="Rating" className="size-4" />
                                <span className="font-bold text-white text-base">
                                    {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                                </span>
                                <span className="text-xs text-gray-100">/ 10</span>
                                {movie.vote_count ? (
                                    <span className="text-xs text-light-200 ml-1">
                                        ({movie.vote_count.toLocaleString()})
                                    </span>
                                ) : null}
                            </div>

                            {/* Runtime */}
                            <div className="bg-dark-100/80 border border-light-100/15 px-3 py-1.5 rounded-lg font-medium text-white">
                                {formatRuntime(movie.runtime)}
                            </div>

                            {/* Language */}
                            <div className="bg-dark-100/80 border border-light-100/15 px-3 py-1.5 rounded-lg font-medium uppercase text-white">
                                {movie.original_language}
                            </div>

                            {/* Status */}
                            {movie.status && (
                                <div className="bg-dark-100/80 border border-light-100/15 px-3 py-1.5 rounded-lg text-light-100 font-medium">
                                    {movie.status}
                                </div>
                            )}
                        </div>

                        {/* Genres */}
                        {movie.genres && movie.genres.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-1">
                                {movie.genres.map((genre) => (
                                    <span key={genre.id} className="genre-badge">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Overview / Storyline */}
                        <div className="space-y-2 pt-2">
                            <h2 className="text-xl font-bold text-white text-left">Overview</h2>
                            <p className="text-gray-100 leading-relaxed text-base font-normal">
                                {movie.overview || "No overview available for this movie."}
                            </p>
                        </div>

                        {/* Top Cast Section */}
                        {castMembers.length > 0 && (
                            <div className="space-y-3 pt-3">
                                <h2 className="text-xl font-bold text-white text-left">Top Cast</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                    {castMembers.map((actor) => (
                                        <div
                                            key={actor.id}
                                            className="bg-dark-100/70 border border-light-100/10 rounded-xl p-3 flex flex-col items-center text-center shadow-inner shadow-light-100/5 hover:border-light-100/25 transition-colors"
                                        >
                                            <img
                                                src={
                                                    actor.profile_path
                                                        ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                                                        : "/no-movie.png"
                                                }
                                                alt={actor.original_name}
                                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-light-100/20 mb-2.5 shadow-md"
                                            />
                                            <h3 className="text-sm font-bold text-white line-clamp-1 w-full">
                                                {actor.original_name}
                                            </h3>
                                            <p className="text-xs text-light-200 line-clamp-1 mt-0.5 w-full">
                                                {actor.character}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Stats Grid: Budget, Revenue, Release Date */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                            <div className="stat-card">
                                <span className="text-xs text-light-200 uppercase tracking-wider font-semibold">
                                    Budget
                                </span>
                                <span className="text-base sm:text-lg font-bold text-white mt-1">
                                    {formatCurrency(movie.budget)}
                                </span>
                            </div>

                            <div className="stat-card">
                                <span className="text-xs text-light-200 uppercase tracking-wider font-semibold">
                                    Revenue
                                </span>
                                <span className="text-base sm:text-lg font-bold text-white mt-1">
                                    {formatCurrency(movie.revenue)}
                                </span>
                            </div>

                            <div className="stat-card col-span-2 sm:col-span-1">
                                <span className="text-xs text-light-200 uppercase tracking-wider font-semibold">
                                    Release Date
                                </span>
                                <span className="text-base sm:text-lg font-bold text-white mt-1">
                                    {movie.release_date || "N/A"}
                                </span>
                            </div>
                        </div>

                        {/* Production Companies */}
                        {movie.production_companies && movie.production_companies.length > 0 && (
                            <div className="space-y-3 pt-4">
                                <h3 className="text-sm font-semibold uppercase text-light-200 tracking-wider">
                                    Production Companies
                                </h3>
                                <div className="flex flex-wrap items-center gap-3">
                                    {movie.production_companies.map((company) => (
                                        <div
                                            key={company.id}
                                            className="bg-dark-100/50 border border-white/5 px-3 py-2 rounded-xl flex items-center gap-2"
                                        >
                                            {company.logo_path && (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w200/${company.logo_path}`}
                                                    alt={company.name}
                                                    className="h-5 w-auto object-contain filter invert opacity-80"
                                                />
                                            )}
                                            <span className="text-xs text-gray-100 font-medium">
                                                {company.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
