import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/authHook'
import Register from './Register'

const Login = () => {

  let { navigate, errors, register, handleSubmit, loginForm } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-1">Welcome back</h1>
        <p className="text-sm text-gray-500 text-center mb-8">Sign in to your account</p>

        <form className="space-y-4" onSubmit={handleSubmit(loginForm)}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
            {...register("email",{
              required:"email is required"
            })}
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
            {...register("password",{
              required:"password is required"
            })}
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 rounded-md border border-gray-300 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && <p className='text-red-600'> {errors.password.message} </p>}
          </div>

          <button
            type="submit"
          >
            Sign in
          </button>
        </form>

        <p onClick={() => navigate("/register")} className="text-sm text-gray-500 text-center mt-6">
          Don't have an account? Regsiter Here!

        </p>
      </div>
    </div>
  )
}

export default Login
