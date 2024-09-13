import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import img from "public/assets/image/image.png"
import SearchBar from "./SearchBar";
import Link from "next/link";

interface StubbleCardProps {
    id: number;
    imageUrl: string;
    title: string;
    description: string;
    price: string;
}

function StubbleCard({ imageUrl, title, description, price, id }: StubbleCardProps) {
    return (
        <div className="font-raleway p-2 text-white flex justify-center items-center">
            <div className="bg-white rounded-sm shadow-lg overflow-hidden max-w-sm">
                <img
                    src={img.src}
                    alt={`${title} image`}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-[#f5f5f5]">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
                    <p className="text-gray-600 text-sm mb-4">
                        {description}
                    </p>
                    <div className="flex justify-between items-center">
                        <Button
                            variant="outline"
                            className="flex-1 mr-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
                        >
                            ${price}
                        </Button>
                        <Button
                            className="flex-1 bg-primary-green text-white hover:bg-primary-green/90"
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Main() {
    const stubbleData = [
        {
            id: 1,
            imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
            title: "Dew Stubble",
            description: "Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum",
            price: "28.95"
        },
        {
            id: 2,
            imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
            title: "Wheat Stubble",
            description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            price: "32.50"
        },
        {
            id: 3,
            imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
            title: "Rice Stubble",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            price: "25.75"
        },
        {
            id: 4,
            imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
            title: "Corn Stubble",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            price: "30.20"
        },
        {
            id: 5,
            imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
            title: "Rice Stubble",
            description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            price: "25.75"
        },
        {
            id: 6,
            imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HvKxIGqj3ZI8kWVgUlO4cve0ljnBuS.png",
            title: "Corn Stubble",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            price: "30.20"
        }
    ];

    return (
        <div className="min-h-screen px-4 md:px-20 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center mb-4">
                        <Link href={"/"}>
                            <ArrowLeft className="h-6 w-6 text-gray-500 mr-2" />
                        </Link>
                        <h1 className="text-2xl font-semibold font-raleway">
                            Search Your <span className="text-primary-green">Stubble</span>
                        </h1>
                    </div>
                    <SearchBar />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stubbleData.map((stubble, index) => (
                        <Link href={`/products/${stubble.id}`} key={index}>
                            <StubbleCard key={index} {...stubble} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}