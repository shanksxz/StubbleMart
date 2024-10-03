"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { Button } from "src/components/ui/button"
import { Input } from "src/components/ui/input"
import { Label } from "src/components/ui/label"
import { Separator } from "src/components/ui/separator"
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleLogin = async ({
        method,
        email,
        password
    }: {
        method: 'google' | 'credentials',
        email?: string,
        password?: string
    }) => {
        try {
            const res = await signIn(method, {
                redirect: false,
                email,
                password
            })

            console.log(res)

            if (res?.ok) {
                toast.success('Logged in successfully')
                await new Promise(resolve => setTimeout(resolve, 3000))
                router.push('/')
            } else {
                toast.error('Login failed. Please check your credentials.')
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
            console.error(error)
        }
    }

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
                    <img src="/svg/newlogo.svg" alt="Stubble Mart Logo" className="mb-8" />
                    <div>
                        <h1 className="text-5xl font-bold mb-4 drop-shadow-md">Welcome Back</h1>
                        <p className="mb-8 text-xl text-green-100 drop-shadow">
                            Log in to access your Stubble Mart account and start managing your agricultural needs.
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
                    <h2 className="text-3xl font-semibold mb-8 text-green-700">Login</h2>

                    <Button onClick={() => handleLogin({ method: 'google' })} variant="outline" className="w-full mb-4 h-12 text-lg flex items-center justify-center gap-2">
                        Continue with Google
                    </Button>

                    <div className="relative my-6">
                        <Separator />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                            Or continue with email
                        </span>
                    </div>

                    <form className="space-y-6" onSubmit={e => {
                        e.preventDefault()
                        handleLogin({ method: 'credentials', email, password })
                    }}>
                        <div>
                            <Label htmlFor="email" className="text-lg">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                className="mt-1 h-12"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="password" className="text-lg">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                className="mt-1 h-12"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg flex items-center justify-center gap-2">
                            <Mail className="w-5 h-5" />
                            Login with Email
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            <a href="#" className="text-green-600 hover:underline">Forgot your password?</a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
