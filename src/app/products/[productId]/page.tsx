'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import img from "public/assets/image/image.png"

interface StubbleProduct {
  id: number;
  title: string;
  description: string;
  priceRange: string;
  imageUrl: string;
}

export default function ProductDetails() {
  const params = useParams()
  const [product, setProduct] = useState<StubbleProduct | null>(null)
  const [state, setState] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const mockProduct: StubbleProduct = {
      id: Number(params.id),
      title: "Dew Stubble",
      description: "Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum",
      priceRange: "$100-$500",
      imageUrl: img.src
    }
    setProduct(mockProduct)
  }, [params.id])

  useEffect(() => {
    // user current location
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            console.log(latitude, longitude)
          },
          (error) => {
            setError("Unable to retrieve your location")
          }
        )
      } else {
        setError("Geolocation is not supported by your browser")
      }
    }

    getUserLocation()
  }, [])

  if (!product) return <div>Loading...</div>

  return (
    <div className="min-h-screen font-raleway py-4 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-sm overflow-hidden max-w-7xl mx-auto">
        <div className="p-6">
          <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to search
          </Link>
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-64 md:h-full object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-2xl font-semibold text-primary-green mb-6">Price Range: {product.priceRange}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter state" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
                </div>
              </div>

              {error && <p className="text-red-500">{error}</p>}
              
              <div className="mb-6">
                <Label className="text-lg font-semibold mb-2">Select Land Size:</Label>
                <RadioGroup defaultValue="2-3">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2-3" id="2-3" />
                      <Label htmlFor="2-3">2-3 acres land</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4-8" id="4-8" />
                      <Label htmlFor="4-8">4-8 acres land</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="9-15" id="9-15" />
                      <Label htmlFor="9-15">9-15 acres land</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="51+" id="51+" />
                      <Label htmlFor="51+">51+ acres land</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="mb-6">
                <Label className="text-lg font-semibold mb-2">Select Services:</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cutting" />
                    <label htmlFor="cutting">Cutting Services</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="transportation" />
                    <label htmlFor="transportation">Transportation Services</label>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-primary-green text-white hover:bg-primary-green/90">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
