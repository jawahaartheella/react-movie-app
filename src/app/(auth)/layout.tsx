import Link from "next/link";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="min-h-screen relative bg-primary flex items-center justify-center px-4 py-12 overflow-hidden">
            {/* Background pattern */}
            <div className="pattern opacity-30 pointer-events-none" />

            {/* Ambient glow */}
            <div className="absolute size-96 rounded-full bg-linear-to-r from-[#D6C7FF]/10 to-[#AB8BFF]/15 blur-3xl pointer-events-none" />

            <div className="w-full max-w-md bg-dark-100/80 border border-light-100/15 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl shadow-light-100/5 relative z-10 flex flex-col items-center">
                <Link href="/" className="mb-6 hover:opacity-80 transition-opacity">
                    <img
                        src="/logo-no-bg.svg"
                        alt="The Movie App Logo"
                        className="w-14 h-auto mx-auto drop-shadow-md"
                    />
                </Link>

                <div className="w-full">{children}</div>

                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs text-gray-100 hover:text-white transition-colors"
                    >
                        <span>&larr;</span> Back to browsing movies
                    </Link>
                </div>
            </div>
        </main>
    );
}
