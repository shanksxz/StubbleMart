"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Mail } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="min-h-screen flex flex-col md:flex-row font-raleway">
            <motion.div
                className="md:w-1/2 p-8 text-white relative overflow-hidden"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AdobeStock_104214660-scaled%201-OClypndJeioXPbmxpouyTAX2U4bPty.png')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 to-green-800/80"></div>
                <div className="absolute inset-0 backdrop-blur-[2px]"></div>
                <div className="relative z-20 h-full flex flex-col justify-between">
                    <img src="/placeholder.svg?height=50&width=200" alt="Stubble Mart Logo" className="mb-8" />
                    <div>
                        <h1 className="text-5xl font-bold mb-4 drop-shadow-md">
                            {isLogin ? 'Welcome Back' : 'Create New Account'}
                        </h1>
                        <p className="mb-8 text-xl text-green-100 drop-shadow">
                            {isLogin
                                ? 'Log in to access your Stubble Mart account and start managing your agricultural needs.'
                                : 'Join Stubble Mart today and revolutionize your farming experience with our cutting-edge solutions.'}
                        </p>
                    </div>
                    <div className="text-sm text-green-100 mt-8 drop-shadow">
                        © 2023 Stubble Mart. All rights reserved.
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="md:w-1/2 bg-white p-8 md:p-16 flex items-center justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="w-full max-w-md">
                    <h2 className="text-3xl font-semibold mb-8 text-green-700">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </h2>
                    <Button variant="outline" className="w-full mb-4 h-12 text-lg flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Continue with Google
                    </Button>
                    <div className="relative my-6">
                        <Separator />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                            Or continue with email
                        </span>
                    </div>
                    <form className="space-y-6">
                        {!isLogin && (
                            <div>
                                <Label htmlFor="name" className="text-lg">Name</Label>
                                <Input id="name" type="text" placeholder="John Doe" className="mt-1 h-12" />
                            </div>
                        )}
                        <div>
                            <Label htmlFor="email" className="text-lg">Email</Label>
                            <Input id="email" type="email" placeholder="you@example.com" className="mt-1 h-12" />
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-lg">Password</Label>
                            <Input id="password" type="password" className="mt-1 h-12" />
                        </div>
                        {!isLogin && (
                            <div>
                                <Label htmlFor="dob" className="text-lg">Date of Birth</Label>
                                <div className="relative mt-1">
                                    <Input id="dob" type="date" className="h-12" />
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                        )}
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg flex items-center justify-center gap-2">
                            <Mail className="w-5 h-5" />
                            {isLogin ? 'Login with Email' : 'Sign Up with Email'}
                        </Button>
                    </form>
                    <div className="mt-6 text-center">
                        {isLogin ? (
                            <>
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <button onClick={() => setIsLogin(false)} className="text-green-600 hover:underline font-semibold">
                                        Sign up
                                    </button>
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    <a href="#" className="text-green-600 hover:underline">Forgot your password?</a>
                                </p>
                            </>
                        ) : (
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <button onClick={() => setIsLogin(true)} className="text-green-600 hover:underline font-semibold">
                                    Log in
                                </button>
                            </p>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}