"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Mail } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SignupPage() {
    return (
        <div className="h-screen flex flex-col md:flex-row font-raleway">
            <motion.div
                className="md:w-1/2 bg-white p-8 md:p-16 flex items-center justify-center order-2 md:order-1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-semibold mb-8 text-green-700">
                        Sign Up
                    </h2>
                    <form className="space-y-6">
                        <div>
                            <Label htmlFor="name" className="text-lg">Full Name</Label>
                            <Input id="name" type="text" placeholder="John Doe" className="mt-1 h-12" />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-lg">Email</Label>
                            <Input id="email" type="email" placeholder="you@example.com" className="mt-1 h-12" />
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-lg">Password</Label>
                            <Input id="password" type="password" className="mt-1 h-12" />
                        </div>
                        <div>
                            <Label htmlFor="confirm-password" className="text-lg">Confirm Password</Label>
                            <Input id="confirm-password" type="password" className="mt-1 h-12" />
                        </div>
                        <div>
                            <Label htmlFor="dob" className="text-lg">Date of Birth</Label>
                            <div className="relative mt-1">
                                <Input id="dob" type="date" className="h-12" />
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg flex items-center justify-center gap-2">
                            <Mail className="w-5 h-5" />
                            Sign Up with Email
                        </Button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="/login" className="text-green-600 hover:underline font-semibold">
                                Log in
                            </a>
                        </p>
                    </div>
                    <p className="mt-4 text-xs text-center text-gray-500">
                        By signing up, you agree to our{' '}
                        <a href="/terms" className="text-green-600 hover:underline">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="/privacy" className="text-green-600 hover:underline">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </motion.div>
            <motion.div
                className="md:w-1/2 p-8 text-white relative overflow-hidden order-1 md:order-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_104214660-scaled%201-OClypndJeioXPbmxpouyTAX2U4bPty.png')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 to-green-800/80"></div>
                <div className="absolute inset-0 backdrop-blur-[2px]"></div>
                <div className="relative z-20 h-full flex flex-col justify-between">
                    <img src="/placeholder.svg?height=50&width=200" alt="Stubble Mart Logo" className="mb-8" />
                    <div>
                        <h1 className="text-5xl font-bold mb-4 drop-shadow-md">
                            Create New Account
                        </h1>
                        <p className="mb-8 text-xl text-green-100 drop-shadow">
                            Join Stubble Mart today and revolutionize your farming experience with our cutting-edge solutions.
                        </p>
                    </div>
                    <div className="text-sm text-green-100 mt-8 drop-shadow">
                        © 2023 Stubble Mart. All rights reserved.
                    </div>
                </div>
            </motion.div>
        </div>
    )
}