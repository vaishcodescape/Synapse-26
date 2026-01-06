"use client"

import Image from "next/image"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image src="/joker.jpg" alt="Joker Cards Background" fill className="object-cover" priority />
        
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-black pointer-events-none" />
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
      </div>

      {/* Right Side - Reset Password Form */}
      <div className="w-full lg:w-1/2 bg-black flex items-center justify-center p-8">
        <div className="w-full max-w-[582px] space-y-8">
          {/* Header */}
          <div className="text-center space-y-2 mb-29">
            <h1 className="text-3xl md:text-4xl font-joker lowercase text-white tracking-wider">
              RESET YOUR
              <br />
              PASSWORD
            </h1>
          </div>

          {/* Reset Password Form */}
          <div className="space-y-6 mt-6">
            {/* Email Input */}
            <input
              type="email"
              placeholder="E.g. rsharma@gmail.com"
              className="w-full px-4 py-3 bg-transparent border border-white rounded-md text-white font-poppins placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
            />

            {/* Get OTP Button */}
            <button className="w-full bg-white text-black hover:bg-gray-100 font-jqka text-2xl h-12 rounded-md transition-colors cursor-pointer">
              <Link href="/otp" />
              Get OTP
            </button>

            {/* Sign Up Link */}
            <p className="text-center font-sans text-white text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-red-500 hover:text-red-400 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
