import React from "react";
import { useForm } from "react-hook-form";
import {
    User,
    Mail,
    Lock,
    Command,
    Sparkles,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {

    let { register, handleSubmit, errors, onRegisterSubmit } = useAuth()

    const password = watch("password", "");

    const getPasswordStrength = () => {
        if (!password) return 0;

        let strength = 0;

        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        return strength;
    };

    const strength = getPasswordStrength();

    const getStrengthText = () => {
        if (strength === 1) return "Weak password";
        if (strength === 2) return "Fair password";
        if (strength === 3) return "Strong password";
        if (strength === 4) return "Very strong password";

        return "";
    };

    const strengthWidth = {
        0: "w-0",
        1: "w-1/4",
        2: "w-2/4",
        3: "w-3/4",
        4: "w-full",
    };

    // const onSubmit = async (data) => {
    //     console.log(data);
    // };

    return (
        <div className="min-h-screen flex bg-[#100e14] text-white">

            {/* LEFT SECTION */}
            <section
                className="
          relative
          hidden
          lg:flex
          lg:w-[40%]
          min-h-screen
          overflow-hidden
          flex-col
          justify-between
          border-r
          border-white/10
          bg-[#071228]
        "
            >
                {/* Background */}
                <div
                    className="
            absolute
            inset-0
            bg-[url('/src/assets/signup-art.png')]
            bg-cover
            bg-center
            opacity-90
          "
                />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#071228]/90" />

                {/* Logo */}
                <div className="relative z-10 px-7 pt-6">
                    <h1 className="text-[17px] font-bold">
                        Synthetix AI
                    </h1>
                </div>

                {/* Bottom content */}
                <div className="relative z-10 px-7 pb-8">

                    <div
                        className="
              mb-5
              flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#d6c5ff]
            "
                    >
                        <Sparkles
                            size={15}
                            strokeWidth={1.8}
                            className="text-[#b791ff]"
                        />

                        Next-Gen Intelligence
                    </div>

                    <h2
                        className="
              max-w-[380px]
              text-[29px]
              font-bold
              leading-[1.08]
              tracking-[-0.03em]
            "
                    >
                        Accelerate your team's
                        <br />
                        intelligence.
                    </h2>

                    <p
                        className="
              mt-5
              max-w-[390px]
              text-[12px]
              leading-[1.7]
              text-white/70
            "
                    >
                        Connect your enterprise data to our specialized AI
                        models and unlock unparalleled strategic insights
                        in seconds.
                    </p>

                    <div className="mt-12 flex gap-9">

                        <div>
                            <p className="text-[15px] font-semibold">
                                99.9%
                            </p>

                            <p className="mt-1 text-[8px] text-white/40">
                                Uptime SLA
                            </p>
                        </div>

                        <div>
                            <p className="text-[15px] font-semibold">
                                ISO
                            </p>

                            <p className="mt-1 text-[8px] text-white/40">
                                27001 Certified
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* RIGHT SECTION */}
            <main
                className="
          flex
          min-h-screen
          flex-1
          items-center
          justify-center
          px-5
          py-10
          sm:px-8
        "
            >
                <div className="w-full max-w-[485px]">

                    {/* Header */}
                    <div className="mb-9">
                        <h2
                            className="
                text-[29px]
                font-bold
                tracking-[-0.03em]
              "
                        >
                            Create your account
                        </h2>

                        <p className="mt-2 text-[11px] text-white/50">
                            Experience the future of collaborative data intelligence.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(onRegisterSubmit)}
                        className="space-y-5"
                    >

                        {/* FULL NAME */}
                        <div>

                            <label
                                htmlFor="fullName"
                                className="
                  mb-2
                  block
                  text-[10px]
                  font-semibold
                  text-white/80
                "
                            >
                                Full Name
                            </label>

                            <div className="relative">

                                <User
                                    size={15}
                                    strokeWidth={1.6}
                                    className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-white/30
                  "
                                />

                                <input
                                    id="fullName"
                                    type="text"
                                    placeholder="Enter your full name"
                                    {...register("fullName", {
                                        required: "Full name is required",
                                    })}
                                    className={`
                    h-[53px]
                    w-full
                    rounded-[7px]
                    border
                    bg-[#18161c]
                    pl-11
                    pr-4
                    text-[12px]
                    outline-none
                    transition
                    placeholder:text-white/20

                    ${errors.fullName
                                            ? "border-red-500/70"
                                            : "border-white/10 focus:border-[#9d7ae8]"
                                        }
                  `}
                                />
                            </div>

                            {errors.fullName && (
                                <p className="mt-1.5 text-[10px] text-red-400">
                                    {errors.fullName.message}
                                </p>
                            )}

                        </div>

                        {/* EMAIL */}
                        <div>

                            <label
                                htmlFor="email"
                                className="
                  mb-2
                  block
                  text-[10px]
                  font-semibold
                  text-white/80
                "
                            >
                                Email Address
                            </label>

                            <div className="relative">

                                <Mail
                                    size={15}
                                    strokeWidth={1.6}
                                    className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-white/30
                  "
                                />

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
                    h-[53px]
                    w-full
                    rounded-[7px]
                    border
                    bg-[#18161c]
                    pl-11
                    pr-4
                    text-[12px]
                    outline-none
                    transition
                    placeholder:text-white/20

                    ${errors.email
                                            ? "border-red-500/70"
                                            : "border-white/10 focus:border-[#9d7ae8]"
                                        }
                  `}
                                />
                            </div>

                            {errors.email && (
                                <p className="mt-1.5 text-[10px] text-red-400">
                                    {errors.email.message}
                                </p>
                            )}

                        </div>

                        {/* PASSWORD */}
                        <div>

                            <label
                                htmlFor="password"
                                className="
                  mb-2
                  block
                  text-[10px]
                  font-semibold
                  text-white/80
                "
                            >
                                Password
                            </label>

                            <div className="relative">

                                <Lock
                                    size={15}
                                    strokeWidth={1.6}
                                    className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-white/30
                  "
                                />

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("password", {
                                        required: "Password is required",

                                        minLength: {
                                            value: 8,
                                            message:
                                                "Password must contain at least 8 characters",
                                        },
                                    })}
                                    className={`
                    h-[53px]
                    w-full
                    rounded-[7px]
                    border
                    bg-[#18161c]
                    pl-11
                    pr-4
                    text-[12px]
                    outline-none
                    transition
                    placeholder:text-white/25

                    ${errors.password
                                            ? "border-red-500/70"
                                            : "border-white/10 focus:border-[#9d7ae8]"
                                        }
                  `}
                                />

                            </div>

                            {/* Password Strength */}
                            {password && (
                                <div className="mt-2 flex items-center gap-3">

                                    <span
                                        className="
                      whitespace-nowrap
                      text-[9px]
                      text-[#a989ff]
                    "
                                    >
                                        {getStrengthText()}
                                    </span>

                                    <div
                                        className="
                      h-[3px]
                      flex-1
                      overflow-hidden
                      rounded-full
                      bg-white/10
                    "
                                    >
                                        <div
                                            className={`
                        ${strengthWidth[strength]}
                        h-full
                        rounded-full
                        bg-[#b99aff]
                        transition-all
                        duration-300
                      `}
                                        />
                                    </div>

                                </div>
                            )}

                            {errors.password && (
                                <p className="mt-1.5 text-[10px] text-red-400">
                                    {errors.password.message}
                                </p>
                            )}

                        </div>

                        {/* TERMS */}
                        <div>

                            <label
                                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-3
                "
                            >
                                <input
                                    type="checkbox"
                                    {...register("terms", {
                                        required:
                                            "You must accept the terms",
                                    })}
                                    className="
                    h-[17px]
                    w-[17px]
                    accent-[#9674dc]
                  "
                                />

                                <span className="text-[10px] text-white/60">
                                    I agree to the{" "}

                                    <span className="text-[#bca0ff]">
                                        Terms of Service
                                    </span>

                                    {" "}and{" "}

                                    <span className="text-[#bca0ff]">
                                        Privacy Policy.
                                    </span>
                                </span>

                            </label>

                            {errors.terms && (
                                <p className="mt-2 text-[10px] text-red-400">
                                    {errors.terms.message}
                                </p>
                            )}

                        </div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            // disabled={isSubmitting}
                            className="
                mt-2
                h-[52px]
                w-full
                rounded-[7px]
                bg-gradient-to-r
                from-[#8c68cd]
                to-[#c5a6fb]
                text-[12px]
                font-semibold
                text-[#130f19]
                transition
                hover:brightness-110
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
                        >
                            {/* {isSubmitting
                                ? "Creating Account..."
                                : "Create Account"} */}
                        </button>

                    </form>

                    {/* DIVIDER */}
                    <div className="my-8 flex items-center gap-4">

                        <div className="h-px flex-1 bg-white/[0.07]" />

                        <span
                            className="
                text-[8px]
                uppercase
                tracking-wider
                text-white/25
              "
                        >
                            Or continue with
                        </span>

                        <div className="h-px flex-1 bg-white/[0.07]" />

                    </div>

                    {/* SOCIAL LOGIN */}
                    <div className="grid grid-cols-2 gap-4">

                        {/* Google */}
                        <button
                            type="button"
                            className="
                flex
                h-[52px]
                items-center
                justify-center
                gap-2
                rounded-[7px]
                border
                border-white/10
                text-[11px]
                font-medium
                transition
                hover:bg-white/[0.04]
              "
                        >
                            {/* Google SVG */}
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

                        {/* SSO */}
                        <button
                            type="button"
                            className="
                flex
                h-[52px]
                items-center
                justify-center
                gap-2
                rounded-[7px]
                border
                border-white/10
                text-[11px]
                font-medium
                transition
                hover:bg-white/[0.04]
              "
                        >
                            <Command
                                size={15}
                                strokeWidth={1.8}
                            />

                            SSO
                        </button>

                    </div>

                    {/* LOGIN */}
                    <p
                        className="
              mt-12
              text-center
              text-[10px]
              text-white/40
            "
                    >
                        Already have an account?{" "}

                        <button
                            type="button"
                            className="
                font-semibold
                text-[#b591ff]
                transition
                hover:text-[#d0baff]
              "
                        >
                            Log In
                        </button>

                    </p>

                </div>
            </main>
        </div>
    );
};

export default Register;