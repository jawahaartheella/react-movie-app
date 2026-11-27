interface WatchlistButtonProps {
    movieId?: number | string;
}

export default function WatchlistButton({ movieId }: WatchlistButtonProps) {
    return (
        <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-semibold text-sm transition-all bg-linear-to-r from-[#D6C7FF]/20 to-[#AB8BFF]/20 border border-light-100/30 text-white hover:from-[#D6C7FF]/30 hover:to-[#AB8BFF]/30 shadow-lg cursor-pointer"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 text-light-100 fill-light-100"
                // fill="light-100"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
            </svg>
            <span>Add to Watchlist</span>
        </button>
    );
}
