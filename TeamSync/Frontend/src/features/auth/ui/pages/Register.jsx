import {
  User,
  Mail,
  LockKeyhole,
  Sparkles,
  Network,
} from "lucide-react";

const Register = () => {
  return (
    <div className="min-h-screen bg-[#111015] p-1.5 text-white">
      <div className="min-h-[calc(100vh-12px)] overflow-hidden border border-[#7655c8]">

        <div className="grid min-h-[calc(100vh-68px)] grid-cols-1 lg:grid-cols-[40%_60%]">

          {/* LEFT PANEL */}
          <section className="relative flex min-h-162.5 flex-col justify-between overflow-hidden border-b border-[#272331] bg-[#101a32] px-10 py-8 lg:border-b-0 lg:border-r">

            {/* Background effects */}
            <div className="absolute inset-0 bg-linear-to-b from-[#101a32]/30 via-[#101a32]/20 to-[#111015]" />

            <div className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]" />

            {/* Network background SVG */}
            <svg
              className="absolute inset-0 h-full w-full opacity-40"
              viewBox="0 0 500 850"
              preserveAspectRatio="xMidYMid slice"
            >
              <g stroke="#5c8eb8" strokeWidth="1.2" fill="none">
                <path d="M0 40 L80 260 L200 100 L300 300 L470 120" />
                <path d="M20 150 L180 320 L250 180 L400 380 L500 220" />
                <path d="M0 400 L100 280 L220 480 L350 300 L500 500" />
                <path d="M30 550 L150 400 L280 600 L420 450 L500 650" />
                <path d="M0 700 L160 540 L300 750 L450 580" />
                <path d="M80 260 L180 320 L100 550 L220 480" />
                <path d="M200 100 L250 180 L350 300 L300 600" />
                <path d="M300 300 L400 380 L420 450" />
                <path d="M100 280 L150 400 L280 600" />
              </g>

              <g fill="#9bbce7">
                {[
                  [80, 260], [200, 100], [300, 300],
                  [470, 120], [180, 320], [250, 180],
                  [400, 380], [100, 280], [220, 480],
                  [350, 300], [150, 400], [280, 600],
                  [420, 450], [160, 540], [300, 750],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r="3" />
                ))}
              </g>
            </svg>

            {/* Brand */}
            <div className="relative z-10">
              <h2 className="text-lg font-bold tracking-tight">
                Synthetix AI
              </h2>
            </div>

            {/* Promotional content */}
            <div className="relative z-10 mt-auto">

              <div className="mb-5 flex items-center gap-2 text-[10px] font-bold tracking-[2px] text-[#c4a8ff]">
                <Sparkles size={18} />
                NEXT-GEN INTELLIGENCE
              </div>

              <h1 className="max-w-sm text-3xl font-bold leading-tight tracking-tight">
                Accelerate your team's intelligence.
              </h1>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-300">
                Connect your enterprise data to our specialized AI
                models and unlock unparalleled strategic insights
                in seconds.
              </p>

              {/* Stats */}
              <div className="mt-10 flex gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-400">
                    99.9%
                  </h3>
                  <p className="text-[10px] text-gray-400">
                    Uptime SLA
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-400">
                    ISO
                  </h3>
                  <p className="text-[10px] text-gray-400">
                    27001 Certified
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT PANEL */}
          <section className="flex items-center justify-center bg-[#141217] px-6 py-16 sm:px-12 lg:px-16">

            <div className="w-full max-w-95.5">

              {/* Heading */}
              <div className="mb-7">
                <h1 className="text-2xl font-bold tracking-tight sm:text-[26px]">
                  Create your account
                </h1>

                <p className="mt-1 text-xs text-gray-300">
                  Experience the future of collaborative data intelligence.
                </p>
              </div>

              {/* Signup form - Add React Hook Form here */}
              <form className="space-y-5">

                {/* Full Name */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold">
                    Full Name
                  </label>

                  <div className="flex h-11.5 items-center gap-3 rounded-md border border-[#38333e] bg-[#1d1a20] px-3 transition focus-within:border-[#a78bfa]">
                    <User size={15} className="text-gray-500" />

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full bg-transparent text-xs text-white outline-none placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold">
                    Email Address
                  </label>

                  <div className="flex h-11.5 items-center gap-3 rounded-md border border-[#38333e] bg-[#1d1a20] px-3 transition focus-within:border-[#a78bfa]">
                    <Mail size={15} className="text-gray-500" />

                    <input
                      type="email"
                      placeholder="name@company.com"
                      className="w-full bg-transparent text-xs text-white outline-none placeholder:text-gray-600"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold">
                    Password
                  </label>

                  <div className="flex h-11.5 items-center gap-3 rounded-md border border-[#38333e] bg-[#1d1a20] px-3 transition focus-within:border-[#a78bfa]">
                    <LockKeyhole size={15} className="text-gray-500" />

                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-transparent text-xs text-white outline-none placeholder:text-gray-600"
                    />
                  </div>

                  {/* Password strength UI */}
                  <div className="mt-1.5 flex gap-1">
                    <div className="h-0.75 flex-1 rounded-full bg-[#c4a5ff]" />
                    <div className="h-0.75 flex-1 rounded-full bg-[#c4a5ff]" />
                    <div className="h-0.75 flex-1 rounded-full bg-[#29252e]" />
                    <div className="h-0.75 flex-1 rounded-full bg-[#29252e]" />
                  </div>

                  <p className="mt-1 text-[10px] font-semibold text-[#b69aff]">
                    Strong password
                  </p>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#a78bfa]"
                  />

                  <p className="text-[10px] leading-relaxed text-gray-300">
                    I agree to the{" "}
                    <a href="#" className="text-[#b69aff] hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-[#b69aff] hover:underline">
                      Privacy Policy
                    </a>.
                  </p>
                </div>

                {/* Create Account */}
                <button
                  type="submit"
                  className="h-11.25 w-full rounded-md bg-linear-to-r from-[#7955b7] to-[#c5a8ff] text-xs font-bold text-[#171020] transition hover:brightness-110 active:scale-[0.99]"
                >
                  Create Account
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 py-3">
                  <div className="h-px flex-1 bg-[#29252e]" />

                  <span className="text-[9px] tracking-wider text-gray-600">
                    OR CONTINUE WITH
                  </span>

                  <div className="h-px flex-1 bg-[#29252e]" />
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">

                  <button
                    type="button"
                    className="flex h-11.5 items-center justify-center gap-2 rounded-md border border-[#39333e] text-xs font-semibold transition hover:bg-[#211d26]"
                  >
                    <span className="text-sm font-bold text-[#e5a64c]">
                      G
                    </span>
                    Google
                  </button>

                  <button
                    type="button"
                    className="flex h-11.5 items-center justify-center gap-2 rounded-md border border-[#39333e] text-xs font-semibold transition hover:bg-[#211d26]"
                  >
                    <Network size={16} className="text-[#c4a8ff]" />
                    SSO
                  </button>

                </div>

                {/* Login */}
                <p className="pt-7 text-center text-xs text-gray-300">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-bold text-[#b69aff] hover:underline"
                  >
                    Log In
                  </a>
                </p>

              </form>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <footer className="flex min-h-13.5 flex-wrap items-center justify-between gap-4 border-t border-[#29252e] bg-[#141217] px-5 py-4">

          <h2 className="text-base font-bold">
            Synthetix AI
          </h2>

          <div className="flex flex-wrap items-center gap-5 text-[10px] text-gray-300">
            <a href="#" className="hover:text-[#c4a8ff]">Privacy Policy</a>
            <a href="#" className="hover:text-[#c4a8ff]">Terms of Service</a>
            <a href="#" className="hover:text-[#c4a8ff]">Security</a>
            <a href="#" className="hover:text-[#c4a8ff]">System Status</a>
          </div>

          <p className="text-[10px] text-gray-300">
            © 2024 Synthetix AI. Enterprise Intelligence Platforms.
          </p>

        </footer>
      </div>
    </div>
  );

}

export default Register
