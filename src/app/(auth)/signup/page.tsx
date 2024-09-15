"use client"

import { motion } from 'framer-motion'
import { ChevronDown, Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '@/actions/user'
import { toast } from 'sonner'
import { signupSchema,  SignupFormData} from '@/validators/index'



export default function SignupPage() {
    const { control, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            role: 'FARMER'
        }
    })

    const onSubmit = async (data: SignupFormData) => {
        try {
            console.log("formData", data)

            const res = await registerUser(data)

            console.log("res", res)

            if (res.success) {
                toast.success(res.message)
                console.log(res.user)
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
            console.error(error)
        }
    }

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
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name" className="text-lg">Name</Label>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            className={`mt-1 h-12 ${errors.name ? 'border-red-500' : ''}`}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="email" className="text-lg">Email</Label>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            className={`mt-1 h-12 ${errors.email ? 'border-red-500' : ''}`}
                                            {...field}
                                        />
                                    )}
                                />
                                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="password" className="text-lg">Password</Label>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="password"
                                        type="password"
                                        className={`mt-1 h-12 ${errors.password ? 'border-red-500' : ''}`}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="phoneNumber" className="text-lg">Phone Number</Label>
                            <Controller
                                name="phoneNumber"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="phoneNumber"
                                        type="tel"
                                        className={`h-12 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="address" className="text-lg">Address</Label>
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        id="address"
                                        type="text"
                                        className={`h-12 ${errors.address ? 'border-red-500' : ''}`}
                                        {...field}
                                    />
                                )}
                            />
                            {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="role" className="text-lg">Role</Label>
                            <Controller
                                name="role"
                                control={control}
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-full h-12">
                                            <SelectValue placeholder="Select your role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="FARMER">Farmer</SelectItem>
                                            <SelectItem value="COLLABORATOR">Collaborator</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
                        </div>
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg flex items-center justify-center gap-2">
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
            {/* The rest of your component remains unchanged */}
        </div>
    )
}