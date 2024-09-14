"use client"

import { useEffect, useState } from 'react'
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronRight, ChevronLeft, Plus, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import img from "public/assets/image/image.png";
import { Button } from "src/components/ui/button"
import { Input } from "src/components/ui/input"
import { Label } from "src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "src/components/ui/select"
import { useSession } from 'next-auth/react';
import { collaborationOptions, FormData, formSchema, stepTitles } from '@/validators'
import addCollaborators from '@/actions/collaborator'
import { toast } from 'sonner'



export default function EnhancedCollaborationForm() {
    const { data: sessionData } = useSession();
    const [step, setStep] = useState(1)

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            collaborationType: "Stubble purchasing company",
            companyName: "",
            username: "",
            email: "",
            phoneNumber: "",
            companyAddress: "",
            companyDescription: "",
            query: "",
            crops: [{ cropName: "", priceRangeFrom: "", priceRangeTo: "" }],
        },
        mode: "onChange",
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "crops",
    });

    useEffect(() => {
        if (sessionData?.user) {
            form.setValue("username", sessionData.user.name!);
            form.setValue("email", sessionData.user.email!);
        }
    }, [])

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        console.log(data);

        //? not needed ig
        // if (step < 3) {
        //     setStep(step + 1);
        // } else {
        //     console.log("Form submitted:", data);
        // }

        try {
            const res = await addCollaborators(data);
            if(res.success) {
                toast.success(res.message);
                console.log(res.collaborater);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
            console.error(error);
        }
    };

    const handleNext = async () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            form.handleSubmit(onSubmit)();
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="min-h-screen font-raleway bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-4xl transition-all duration-300 ease-in-out transform hover:scale-[1.02]">
                <h1 className="text-4xl font-extrabold text-center text-emerald-700 mb-2 tracking-tight">Collaborate with Us</h1>
                <p className="text-center text-gray-600 mb-8 text-lg">Join our network and grow your business with us</p>

                <div className="relative mb-12">
                    <div className="flex justify-between">
                        {stepTitles.map((title, index) => (
                            <div key={index} className="flex flex-col items-center relative z-10">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step > index ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                                    } mb-2 transition-all duration-300 ease-in-out transform ${step === index + 1 ? 'scale-110 ring-4 ring-emerald-200' : ''
                                    }`}>
                                    {step > index ? <Check className="w-6 h-6" /> : index + 1}
                                </div>
                                <span className={`text-sm font-medium ${step > index ? 'text-emerald-600' : 'text-gray-600'
                                    } transition-colors duration-300`}>{title}</span>
                            </div>
                        ))}
                    </div>
                    <div className="absolute top-6 left-0 w-full h-1 bg-gray-200">
                        <motion.div
                            className="h-full bg-emerald-600 rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: `${((step - 1) / (stepTitles.length - 1)) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>
                </div>


                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {step === 1 && (
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="relative">
                                            <Select
                                                onValueChange={(value) => form.setValue("collaborationType", value as FormData['collaborationType'])}
                                                defaultValue={form.watch("collaborationType")}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Collaboration Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {collaborationOptions.map(option => (
                                                        <SelectItem key={option} value={option}>{option}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        {(['companyName', 'username', 'email', 'phoneNumber', 'companyAddress'] as const).map((field) => (
                                            <div key={field} className="space-y-2">
                                                <Label htmlFor={field}>
                                                    {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                                                </Label>
                                                <Input
                                                    id={field}
                                                    type={field === 'email' ? 'email' : field === 'phoneNumber' ? 'tel' : 'text'}
                                                    {...form.register(field)}
                                                />
                                                {form.formState.errors[field] && (
                                                    <p className="text-red-500 text-sm">{form.formState.errors[field]?.message}</p>
                                                )}
                                            </div>
                                        ))}
                                        <Button type="button" onClick={handleNext} className="w-full">
                                            Next
                                        </Button>
                                    </div>
                                    <div className="flex flex-col justify-center items-center text-center">
                                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                            Collaborate with us and be part of a growing network of businesses. Together, we can achieve more and create sustainable solutions for the agriculture industry.
                                        </p>
                                        <img src={img.src} alt="Collaboration" className="rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110" />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-8">
                                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                                        <h3 className="font-semibold text-xl mb-4 text-emerald-700">Company Details</h3>
                                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                                            {(['collaborationType', 'companyName', 'username', 'email', 'phoneNumber', 'companyAddress'] as const).map((field) => (
                                                <p key={field} className="flex items-start">
                                                    <span className="font-medium text-gray-700 mr-2">{field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1').trim()}:</span>
                                                    <span className="text-gray-600">{form.watch(field)}</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="companyDescription">Describe your company</Label>
                                            <textarea
                                                id="companyDescription"
                                                {...form.register("companyDescription")}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ease-in-out h-32 resize-none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="query">Any queries?</Label>
                                            <textarea
                                                id="query"
                                                {...form.register("query")}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 ease-in-out h-24 resize-none"
                                            />
                                        </div>
                                        {form.watch("collaborationType") === "Stubble purchasing company" && (
                                            <div className="space-y-4">
                                                <h4 className="font-semibold text-lg text-emerald-700">Crop Information</h4>
                                                {fields.map((field, index) => (
                                                    <div key={field.id} className="space-y-4 p-4 border border-gray-200 rounded-lg">
                                                        <div className="space-y-2">
                                                            <Label htmlFor={`crops.${index}.cropName`}>Crop Name</Label>
                                                            <Input
                                                                {...form.register(`crops.${index}.cropName` as const)}
                                                            />
                                                            {form.formState.errors.crops?.[index]?.cropName && (
                                                                <p className="text-red-500 text-sm">{form.formState.errors.crops[index]?.cropName?.message}</p>
                                                            )}
                                                        </div>
                                                        <div className="flex space-x-4">
                                                            <div className="space-y-2 w-1/2">
                                                                <Label htmlFor={`crops.${index}.priceRangeFrom`}>Price Range From</Label>
                                                                <Input
                                                                    type="number"
                                                                    {...form.register(`crops.${index}.priceRangeFrom` as const)}
                                                                />
                                                                {form.formState.errors.crops?.[index]?.priceRangeFrom && (
                                                                    <p className="text-red-500 text-sm">{form.formState.errors.crops[index]?.priceRangeFrom?.message}</p>
                                                                )}
                                                            </div>
                                                            <div className="space-y-2 w-1/2">
                                                                <Label htmlFor={`crops.${index}.priceRangeTo`}>Price Range To</Label>
                                                                <Input
                                                                    type="number"
                                                                    {...form.register(`crops.${index}.priceRangeTo` as const)}
                                                                />
                                                                {form.formState.errors.crops?.[index]?.priceRangeTo && (
                                                                    <p className="text-red-500 text-sm">{form.formState.errors.crops[index]?.priceRangeTo?.message}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {index > 0 && (
                                                            <Button
                                                                type="button"
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => remove(index)}
                                                                className="mt-2"
                                                            >
                                                                <Trash2 className="w-4 h-4 mr-2" />
                                                                Remove Crop
                                                            </Button>
                                                        )}
                                                    </div>
                                                ))}
                                                <Button type="button" onClick={() => append({ cropName: "", priceRangeFrom: "", priceRangeTo: "" })} variant="outline" className="mt-4">
                                                    <Plus className="w-4 h-4 mr-2" />
                                                    Add Another Crop
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between">
                                        <Button type="button" onClick={handleBack} variant="outline">
                                            <ChevronLeft className="w-5 h-5 mr-2" />
                                            Back
                                        </Button>
                                        <Button type="submit" onClick={handleNext}>
                                            Next
                                            <ChevronRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="text-center space-y-8">
                                    <div className="flex justify-center">
                                        <div className="bg-emerald-500 rounded-full p-6 transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-12">
                                            <Check className="text-white w-20 h-20" />
                                        </div>
                                    </div>
                                    <h2 className="text-3xl font-bold text-emerald-700">Thank You for Collaborating!</h2>
                                    <p className="text-xl text-gray-600 max-w-md mx-auto">We're excited to work with you. We'll contact you soon to discuss the next steps and how we can grow together.</p>
                                </div>
                            )}
                        </form>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}



{/* <div className="relative mb-12">
        <div className="flex justify-between">
            {stepTitles.map((title, index) => (
                <div key={index} className="flex flex-col items-center relative z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step > index ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'
                    } mb-2 transition-all duration-300 ease-in-out transform ${
                        step === index + 1 ? 'scale-110 ring-4 ring-emerald-200' : ''
                    }`}>
                        {step > index ? <Check className="w-6 h-6" /> : index + 1}
                    </div>
                    <span className={`text-sm font-medium ${
                        step > index ? 'text-emerald-600' : 'text-gray-600'
                    } transition-colors duration-300`}>{title}</span>
                </div>
            ))}
        </div>
        <div className="absolute top-6 left-0 w-full h-1 bg-gray-200">
            <motion.div
                className="h-full bg-emerald-600 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${((step - 1) / (stepTitles.length - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        </div>
    </div> */}