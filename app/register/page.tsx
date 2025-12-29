"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff, Calendar, ChevronDown } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-black">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/joker.jpg"
          alt="Joker Cards Background"
          fill
          className="object-cover"
          priority
        />
        {/* Synapse Logo Overlay */}
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

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-[582px] space-y-8">
          {/* Header */}
          <div className="text-center space-y-3 font-joker">
            <h1
              className="text-3xl md:text-4xl lg:text-4xl font-joker text-white tracking-wider"
            >
              the cards are dealt
              <br />
              join in
            </h1>
          </div>

          {/* Registration Form Card */}
          <Card className="bg-black/40 border-white/20 backdrop-blur-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl text-white text-center font-roboto">
                Create Your Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="First Name"
                    className="bg-transparent border-white/50 text-white placeholder:text-white/50 focus:border-white focus:ring-white/50 h-12 font-card placeholder:font-card"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Last Name"
                    className="bg-transparent border-white/50 text-white placeholder:text-white/50 focus:border-white focus:ring-white/50 h-12 font-card placeholder:font-card"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="flex gap-3">
                <div className="relative w-32">
                  <select className="w-full h-12 px-3 bg-transparent border border-white/50 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white appearance-none font-roboto">
                    <option value="91" className="bg-black">INR (+91)</option>
                    <option value="1" className="bg-black">USA (+1)</option>
                    <option value="44" className="bg-black">UK (+44)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 pointer-events-none" />
                </div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="flex-1 bg-transparent border-white/50 text-white placeholder:text-white/50 focus:border-white focus:ring-white/50 h-12 font-card placeholder:font-card"
                />
              </div>

              {/* Date of Birth and Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* DOB */}
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Date of Birth (DD/MM/YYYY)"
                    className="w-full h-12 px-4 bg-transparent border-white/50 text-white placeholder:text-white/50 focus:border-white focus:ring-white/50 pr-12 font-roboto placeholder:font-roboto"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 pointer-events-none" />
                </div>

                {/* Gender */}
                <div className="relative">
                  <select
                    defaultValue=""
                    className="w-full h-12 px-4 bg-transparent border border-white/50 rounded-md appearance-none text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white font-roboto text-sm [&:not([value=''])]:text-white"
                  >
                    <option value="" disabled className="bg-black text-white/50">
                      Gender
                    </option>
                    <option value="male" className="bg-black text-white">Male</option>
                    <option value="female" className="bg-black text-white">Female</option>
                    <option value="other" className="bg-black text-white">Other</option>
                    <option value="prefer-not-to-say" className="bg-black text-white">
                      Prefer not to say
                    </option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50 pointer-events-none" />
                </div>
              </div>

              {/* College Name */}
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="College Name"
                  className="bg-transparent border-white/50 text-white placeholder:text-white/50 focus:border-white focus:ring-white/50 h-12 font-roboto placeholder:font-roboto"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="bg-transparent border-white/50 text-white placeholder:text-white/50 focus:border-white focus:ring-white/50 h-12 font-roboto placeholder:font-roboto"
                />
              </div>

              {/* Password */}
              <div className="relative space-y-2">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="bg-transparent border-white/50 text-white placeholder:text-white/50 focus:border-white focus:ring-white/50 h-12 pr-12 font-roboto placeholder:font-roboto"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Confirm Password */}
              <div className="relative space-y-2">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="bg-transparent border-white/50 text-white placeholder:text-white/50 focus:border-white focus:ring-white/50 h-12 pr-12 font-roboto placeholder:font-roboto"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Get OTP Button */}
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-gray-100 font-semibold text-lg h-12 rounded-md transition-colors mt-6"
                size="lg"
              >
                Verify & Continue →
              </Button>

              {/* Login Link */}
              <p className="text-center text-white/80 text-sm mt-6 font-roboto">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-red-500 hover:text-red-400 font-semibold transition-colors font-roboto"
                >
                  Log In
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}