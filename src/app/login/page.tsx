import Link from "next/link";
import { login } from "../../lib/auth-actions";

export default function LoginPage() {
  return (
    <>
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-white max-w-none mx-0">
          Welcome <span className="text-gradient">Back</span>
        </h1>
        <p className="text-sm text-light-200">
          Sign in to access your saved watchlist and liked movies
        </p>
      </div>

      <form action={login} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-light-200 ml-1">
            Email
          </label>
          <input className="w-full bg-dark-100/60 
                  border border-light-100/15 focus:border-[#AB8BFF] focus:ring-1 focus:ring-[#AB8BFF] rounded-xl
                  px-4 py-3 text-sm text-white placeholder-light-200/40 
                  outline-hidden transition-all shadow-inner shadow-light-100/5"
            type="email" name="email" placeholder="Enter your email"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-light-200 ml-1">
            Password
          </label>
          <input
            className="w-full bg-dark-100/60 
              border border-light-100/15 focus:border-[#AB8BFF] focus:ring-1 focus:ring-[#AB8BFF] rounded-xl 
              px-4 py-3 text-sm text-white placeholder-light-200/40 
              outline-hidden transition-all shadow-inner shadow-light-100/5"
            type="password" name="password" placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-3.5 px-4 
            rounded-xl font-bold text-sm text-primary 
            bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] hover:shadow-lg hover:shadow-[#AB8BFF]/25 
            hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer">
          Login
        </button>
      </form>

      <div className="mt-8 text-center text-sm text-gray-100">
        <span>Don&apos;t have an account?</span>
        <Link
          href="/register"
          className="text-light-100 hover:text-white font-semibold underline underline-offset-4 ml-1.5 transition-colors">
          Sign up
        </Link>
      </div>
    </>
  );
}
