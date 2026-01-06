"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login submitted:", formData)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Joker Card Image */}
      <div className="relative hidden md:flex md:w-1/2 bg-[#1a1a1a]">
        {/* Dice Logo */}
        {/* <CHANGE> added horizontal gradient overlay to soften the boundary between image and form */}
   
        <div className="absolute top-8 left-8 z-10">
                  <div className="relative w-16 h-16">
                    <Image
                      src="/Synapse Logo.png"
                      alt="Synapse Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

        {/* Joker Card Background Image */}
        <Image src="/joker.jpg" alt="Joker Card" fill className="object-cover" priority />
         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-black pointer-events-none" />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-[#050505] px-6 py-12">
        <div className="w-full max-w-[515px]">
          {/* Title - Using Bebas Neue font, larger size */}
          <h1
            className="text-center text-white text-[40px] md:text-[50px] leading-[1.1] font-joker mb-16 tracking-wide"
        
          >
            welcome back to
            <br />
            the game
          </h1>

          {/* Login Form - 24px gap between elements as per Figma specs */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email Input - Transparent background with white border */}
            <div>
              <input
                type="email"
                placeholder="E.g. rsharma@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3.5 bg-transparent border border-white rounded-md text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-all text-base font-poppins"
                required
              />
            </div>

            {/* Password Input - Transparent background with white border and eye icon */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3.5 bg-transparent border border-white rounded-md text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-all text-base pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              >
                {showPassword ?  (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ):(
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) 
            }
              </button>
            </div>

            {/* Forgotten Password Link - Using Roboto font, right-aligned with underline */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-white/80 text-sm underline hover:text-white transition-colors font-poppins"
              >
                Forgotten your password?
              </Link>
            </div>

            {/* Continue Button - White background, black text, proper spacing */}
            <button
              type="submit"
              className="w-full bg-white text-black py-3.5 rounded-md text-2xl hover:bg-white/90 transition-colors mt-2 font-jqka cursor-pointer"
            >
              Continue
            </button>

            {/* Sign Up Link - Red color for "Sign up" link */}
            <p className="text-center text-white/70 text-base mt-4 font-sans">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#dc2626] hover:underline font-poppins font-medium">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}