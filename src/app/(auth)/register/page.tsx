import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="min-h-screen relative bg-primary flex items-center justify-center px-4 py-12 overflow-hidden">
      <div className="pattern opacity-30 pointer-events-none" />
      <div className="absolute size-96 rounded-full bg-linear-to-r from-[#D6C7FF]/10 to-[#AB8BFF]/15 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-dark-100/80 border border-light-100/15 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-2xl shadow-light-100/5 relative z-10 flex flex-col items-center">
        <Link href="/" className="mb-6 hover:opacity-80 transition-opacity">
          <img
            src="/logo-no-bg.svg"
            alt="The Movie App Logo"
            className="w-14 h-auto mx-auto drop-shadow-md"
          />
        </Link>

        <div className="text-center space-y-2 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white max-w-none mx-0">
            Create an <span className="text-gradient">Account</span>
          </h1>
          <p className="text-sm text-light-200">
            Sign up to start saving and liking your favorite movies
          </p>
        </div>

        {/* Form Container */}
        <div className="w-full">
          {/* Your registration form will go here! */}
        </div>

        <div className="mt-8 text-center text-sm text-gray-100">
          <span>Already have an account?</span>
          <Link
            href="/login"
            className="text-light-100 hover:text-white font-semibold underline underline-offset-4 ml-1.5 transition-colors"
          >
            Log in
          </Link>
        </div>

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
