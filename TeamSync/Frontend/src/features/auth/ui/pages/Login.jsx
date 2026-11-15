import {
  Network,
  Cloud,
  ArrowRightToLine,
  Phone,
} from "lucide-react";

const Login = () => {
  return (
    <div className="relative flex min-h-screen items-start justify-center overflow-hidden bg-[#141217] px-4 pt-12 text-white sm:pt-0 sm:items-center">

      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900/5 blur-[120px]" />

      <div className="relative z-10 w-full max-w-87.5">

        {/* LOGIN CARD */}
        <div className="rounded-xl border border-[#2d2932] bg-[#1d1b20] px-6 py-6 shadow-xl sm:px-6.25">

          {/* Logo */}
          <div className="mb-3 flex justify-center">
            <div className="flex h-9.5 w-9.5 items-center justify-center rounded-md bg-[#7555b7]">
              <Network size={23} className="text-[#e4d5ff]" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-xl font-bold tracking-tight">
              Synthetix AI
            </h1>

            <p className="mt-1 text-xs text-gray-300">
              Sign in to your workspace
            </p>
          </div>

          {/* Social Login */}
          <div className="mt-6 grid grid-cols-2 gap-3">

            <button
              type="button"
              className="flex h-8.5 items-center justify-center gap-2 rounded-md border border-[#36313a] bg-[#29262d] text-[9px] font-bold tracking-wider transition hover:bg-[#343039]"
            >
              <Cloud size={17} className="text-gray-300" />
              GOOGLE
            </button>

            <button
              type="button"
              className="flex h-8.5 items-center justify-center gap-2 rounded-md border border-[#36313a] bg-[#29262d] text-[9px] font-bold tracking-wider transition hover:bg-[#343039]"
            >
              <Phone size={16} className="text-gray-300" />
              PHONE
            </button>

          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#302c34]" />

            <span className="whitespace-nowrap text-[10px] text-gray-300">
              or continue with email
            </span>

            <div className="h-px flex-1 bg-[#302c34]" />
          </div>

          {/* Login Form */}
          {/* Integrate React Hook Form here */}
          <form className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-[9px] font-bold tracking-wider text-gray-200">
                EMAIL ADDRESS
              </label>

              <input
                type="email"
                placeholder="name@company.com"
                className="h-8.5 w-full rounded-md border border-[#353039] bg-[#100e13] px-3 text-xs text-white outline-none transition placeholder:text-gray-600 focus:border-[#8866c9]"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-[9px] font-bold tracking-wider text-gray-200">
                  PASSWORD
                </label>

                <a
                  href="/forgot-password"
                  className="text-[10px] text-[#b99aff] hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <input
                type="password"
                placeholder="••••••••"
                className="h-8.5 w-full rounded-md border border-[#353039] bg-[#100e13] px-3 text-xs text-white outline-none transition placeholder:text-gray-600 focus:border-[#8866c9]"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="h-3 w-3 cursor-pointer rounded accent-[#8562c6]"
              />

              <label
                htmlFor="remember"
                className="cursor-pointer text-[10px] text-gray-300"
              >
                Stay signed in
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="flex h-10.5 w-full items-center justify-center gap-2 rounded-md bg-[#7052ae] text-xs font-medium text-white transition hover:bg-[#8061bd] active:scale-[0.99]"
            >
              Sign In
              <ArrowRightToLine size={15} />
            </button>

          </form>

          {/* Bottom Divider */}
          <div className="mt-6 border-t border-[#302c34]" />

          {/* Sign Up */}
          <p className="mt-5 text-center text-[10px] text-gray-300">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="font-bold text-[#b99aff] hover:underline"
            >
              Sign Up
            </a>
          </p>

        </div>

        {/* FOOTER */}
        <footer className="mt-5 text-center">

          <p className="text-[10px] text-gray-600">
            © 2024 Synthetix AI. Enterprise Intelligence Platforms.
          </p>

          <div className="mt-2 flex justify-center gap-4 text-[10px] text-gray-700">
            <a href="#" className="hover:text-gray-400">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-gray-400">
              Terms of Service
            </a>
          </div>

        </footer>

      </div>
    </div>
  );
};

export default Login;
