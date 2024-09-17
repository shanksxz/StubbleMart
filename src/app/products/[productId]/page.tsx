
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { getProductById } from '@/actions/product'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { placeOrder } from '@/actions/order'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import Image from 'next/image'
import { Spinner } from '@nextui-org/spinner'

interface StubbleProduct {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  imgUrl: string;
}

const formSchema = z.object({
  state: z.string().min(1, { message: "State is required" }),
  city: z.string().min(1, { message: "City is required" }),
  landSize: z.enum(["2-3", "4-8", "9-15", "51+"], {
    required_error: "Please select a land size",
  }),
  cuttingServices: z.boolean(),
  transportationServices: z.boolean(),
})

type FormData = z.infer<typeof formSchema>

export default function ProductDetails() {
  const params = useParams()
  const [product, setProduct] = useState<StubbleProduct | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<StubbleProduct[]>([])
  const [error, setError] = useState<string>("")
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "unauthenticated") {
    router.push("/login")
  }

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      state: "",
      city: "",
      landSize: "2-3",
      cuttingServices: false,
      transportationServices: false,
    },
  })

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById({ id: params.productId as string })
        if (res.success) {
          setProduct(res.product!)
          setRelatedProducts(res.relatedProducts || [])
        }
      } catch (error) {
        console.error(error)
        setError("Failed to fetch product details")
      }
    }

    fetchProduct()
  }, [params.productId])

  const onSubmit = async (data: FormData) => {
    try {
      const order = await placeOrder({
        productId: product!.id,
        state: data.state,
        city: data.city,
        landSize: data.landSize,
        serviceType: data && (data.cuttingServices ? ["cutting"] : []).concat(data.transportationServices ? ["transportation"] : []),
      })

      if (order.success) {
        toast.success(order.message);
        router.push("/products")
      }
    } catch (error) {
      console.error(error)
      setError("Failed to place order")
    }
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner color='success' />
      </div>
    )
  }

  return (
    <div className="min-h-screen font-raleway py-4 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-sm overflow-hidden max-w-7xl mx-auto">
        <div className="p-6">
          <Link href="/products" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to search
          </Link>
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <Image
                width={500}
                height={500}
                src={product.imgUrl}
                alt={product.title}
                className="w-full h-64 md:h-full object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-2xl font-semibold text-primary-green mb-6">
                Price Range: ₹{product.priceRange}
              </p>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Controller
                      name="state"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} placeholder="Enter state" />
                      )}
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} placeholder="Enter city" />
                      )}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <Label className="text-lg font-semibold mb-2">Select Land Size:</Label>
                  <Controller
                    name="landSize"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-4"
                      >
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
                      </RadioGroup>
                    )}
                  />
                  {errors.landSize && <p className="text-red-500 text-sm mt-1">{errors.landSize.message}</p>}
                </div>
                
                <div className="mb-6">
                  <Label className="text-lg font-semibold mb-2">Select Services:</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Controller
                        name="cuttingServices"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="cutting"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <label htmlFor="cutting">Cutting Services</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Controller
                        name="transportationServices"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id="transportation"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <label htmlFor="transportation">Transportation Services</label>
                    </div>
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-primary-green text-white hover:bg-primary-green/90">
                  Submit
                </Button>
              </form>

              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4">You May Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link href={`/products/${relatedProduct.id}`} key={relatedProduct.id}>
                    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <img
                        src={relatedProduct.imgUrl}
                        alt={relatedProduct.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{relatedProduct.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{relatedProduct.description.substring(0, 100)}...</p>
                        <p className="text-primary-green font-semibold">₹{relatedProduct.priceRange}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}