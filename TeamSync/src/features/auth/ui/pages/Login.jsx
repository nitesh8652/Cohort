import React from "react";
import { useForm } from "react-hook-form";
import {
  Network,
  Cloud,
  LogIn,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {

    let { register, handleSubmit, errors, onLoginSubmit, navigate } = useAuth()
  
  //   const onSubmit = async (data) => {
  //   console.log("Login Data:", data);
  // };

  return (
    <div className="min-h-screen bg-[#100e14] flex flex-col items-center justify-center px-4 py-8 text-white">

      {/* LOGIN CARD */}
      <div
        className="
          w-full
          max-w-[420px]
          rounded-[12px]
          border
          border-white/[0.07]
          bg-[#1b181f]
          px-7
          sm:px-8
          py-8
          shadow-2xl
          shadow-black/20
        "
      >
        {/* TOP LOGO */}
        <div className="flex flex-col items-center">

          <div
            className="
              mb-4
              flex
              h-[46px]
              w-[46px]
              items-center
              justify-center
              rounded-[8px]
              bg-[#7053b6]
            "
          >
            <Network
              size={25}
              strokeWidth={1.8}
              className="text-white"
            />
          </div>

          <h1
            className="
              text-[22px]
              font-bold
              tracking-[-0.03em]
            "
          >
            Synthetix AI
          </h1>

          <p className="mt-1 text-[11px] text-white/60">
            Sign in to your workspace
          </p>
        </div>

        {/* SOCIAL LOGIN */}
        <div className="mt-8 grid grid-cols-2 gap-4">

          {/* GOOGLE */}
          <button
            type="button"
            className="
              flex
              h-[43px]
              items-center
              justify-center
              gap-2
              rounded-[7px]
              border
              border-white/[0.08]
              bg-[#29252e]
              text-[10px]
              font-semibold
              uppercase
              transition
              hover:bg-[#302b36]
              hover:border-white/[0.15]
            "
          >
            {/* Google Logo */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />

              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z"
              />

              <path
                fill="#FBBC05"
                d="M5.84 14.09A6.56 6.56 0 015.5 12c0-.72.12-1.42.34-2.09V7.07H2.18A11 11 0 001 12c0 1.77.42 3.44 1.18 4.93l3.66-2.84z"
              />

              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 002.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
              />
            </svg>

            Google
          </button>

          {/* GITHUB */}
          <button
            type="button"
            className="
              flex
              h-[43px]
              items-center
              justify-center
              gap-2
              rounded-[7px]
              border
              border-white/[0.08]
              bg-[#29252e]
              text-[10px]
              font-semibold
              uppercase
              transition
              hover:bg-[#302b36]
              hover:border-white/[0.15]
            "
          >
            {/* <Github
              size={15}
              strokeWidth={1.8}
            /> */}

            Github
          </button>
        </div>

        {/* DIVIDER */}
        <div className="my-7 flex items-center gap-3">

          <div className="h-px flex-1 bg-white/[0.06]" />

          <span className="text-[9px] text-white/50 whitespace-nowrap">
            or continue with email
          </span>

          <div className="h-px flex-1 bg-white/[0.06]" />

        </div>

        {/* LOGIN FORM */}
        <form
          onSubmit={handleSubmit(onLoginSubmit)}
          className="space-y-5"
        >

          {/* EMAIL */}
          <div>

            <label
              htmlFor="email"
              className="
                mb-2
                block
                text-[9px]
                font-semibold
                uppercase
                tracking-wide
                text-white/80
              "
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              {...register("email", {
                required: "Email address is required",

                pattern: {
                  value:
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,

                  message:
                    "Please enter a valid email address",
                },
              })}
              className={`
                h-[42px]
                w-full
                rounded-[6px]
                border
                bg-[#0d0b10]
                px-4
                text-[12px]
                text-white
                outline-none
                transition
                placeholder:text-white/20

                ${
                  errors.email
                    ? "border-red-500/70"
                    : "border-white/[0.08] focus:border-[#7657be]"
                }
              `}
            />

            {errors.email && (
              <p className="mt-1.5 text-[9px] text-red-400">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* PASSWORD */}
          <div>

            <div className="mb-2 flex items-center justify-between">

              <label
                htmlFor="password"
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-white/80
                "
              >
                Password
              </label>

              <button
                type="button"
                className="
                  text-[9px]
                  font-medium
                  text-[#c19bff]
                  transition
                  hover:text-[#d3bbff]
                "
              >
                Forgot password?
              </button>

            </div>

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",

                minLength: {
                  value: 6,
                  message:
                    "Password must contain at least 6 characters",
                },
              })}
              className={`
                h-[42px]
                w-full
                rounded-[6px]
                border
                bg-[#0d0b10]
                px-4
                text-[12px]
                text-white
                outline-none
                transition
                placeholder:text-white/25

                ${
                  errors.password
                    ? "border-red-500/70"
                    : "border-white/[0.08] focus:border-[#7657be]"
                }
              `}
            />

            {errors.password && (
              <p className="mt-1.5 text-[9px] text-red-400">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* REMEMBER */}
          <label
            className="
              flex
              cursor-pointer
              items-center
              gap-2.5
            "
          >
            <input
              type="checkbox"
              {...register("remember")}
              className="
                h-[15px]
                w-[15px]
                rounded
                border-white/10
                accent-[#7657be]
              "
            />

            <span className="text-[9px] text-white/70">
              Stay signed in
            </span>
          </label>

          {/* SIGN IN */}
          <button
            type="submit"
            // disabled={isSubmitting}
            className="
              flex
              h-[49px]
              w-full
              items-center
              justify-center
              gap-2
              rounded-[6px]
              bg-[#7053b6]
              text-[12px]
              font-medium
              text-white
              transition
              hover:bg-[#7b5bc5]
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {/* {isSubmitting ? (
              "Signing in..."
            ) : (
              <>
                Sign In

                <LogIn
                  size={16}
                  strokeWidth={1.8}
                />
              </>
            )} */}

<h3>SignIn</h3>

          </button>
        </form>

        {/* BOTTOM DIVIDER */}
        <div className="my-7 h-px bg-white/[0.06]" />

        {/* SIGN UP */}
        <p className="text-center text-[9px] text-white/70">
          Don't have an account?{" "}

          <button
          onClick={()=> navigate('/register')}
            type="button"
            className="
              font-semibold
              text-[#c19bff]
              transition
              hover:text-[#d7c4ff]
            "
          >
            Sign Up
          </button>
        </p>

      </div>

      {/* FOOTER */}
      <footer className="mt-7 text-center">

        <p className="text-[9px] text-white/25">
          © 2024 Synthetix AI. Enterprise Intelligence Platforms.
        </p>

        <div
          className="
            mt-3
            flex
            items-center
            justify-center
            gap-5
            text-[9px]
            text-white/25
          "
        >
          <button className="transition hover:text-white/50">
            Privacy Policy
          </button>

          <button className="transition hover:text-white/50">
            Terms of Service
          </button>

        </div>

      </footer>

    </div>
  );
};

export default Login;