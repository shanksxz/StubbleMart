import { Button } from "src/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import SearchBar from "./SearchBar";
import Link from "next/link";

interface ProductProps {
    id?: string;
    title: string;
    description: string;
    priceRange: string;
    imgUrl: string;
}

function StubbleCard({ imgUrl, title, description, priceRange }: ProductProps) {
    console.log("priceRange", imgUrl)
    return (
        <div className="font-raleway p-2 text-white flex justify-center items-center">
            <div className="bg-white rounded-sm shadow-lg overflow-hidden max-w-sm">
                <img
                    src={imgUrl}
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
                            {/* ${new Prisma.Decimal(price).toNumber()}
                             */}
                             ₹{priceRange}
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


export default function Product({ products } : {
    products: ProductProps[]
}) {
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
                    {products && products.map((stubble, index) => (
                        <Link href={`/products/${stubble.id}`} key={index}>
                            <StubbleCard key={index} {...stubble} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}