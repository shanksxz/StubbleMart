import Link from "next/link"
import { BarChart3, ShoppingCart, Tractor, Truck, Store, Users, Package, User } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-full shadow-lg">
      <div className="flex items-center justify-center h-16 border-b">
        <span className="text-2xl font-semibold">StubbleMart</span>
      </div>
      <nav className="mt-6">
        <Link href="/dashboard" className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100">
          <BarChart3 className="h-5 w-5 mr-3" />
          Dashboard
        </Link>
        <Link href="/collaborators/stubble-purchasing" className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100">
          <ShoppingCart className="h-5 w-5 mr-3" />
          Stubble Purchasing
        </Link>
        <Link href="/collaborators/machine-rental" className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100">
          <Tractor className="h-5 w-5 mr-3" />
          Machine Rental
        </Link>
        <Link href="/collaborators/transportation" className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100">
          <Truck className="h-5 w-5 mr-3" />
          Transportation
        </Link>
        <Link href="/collaborators/agri-shops" className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100">
          <Store className="h-5 w-5 mr-3" />
          Agriculture Shops
        </Link>
        <Link href="/farmers" className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100">
          <Users className="h-5 w-5 mr-3" />
          Farmers
        </Link>
        <Link href="/dashboard/product" className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100">
          <Package className="h-5 w-5 mr-3" />
          Products
        </Link>
        <Link href="/admin-profile" className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100">
          <User className="h-5 w-5 mr-3" />
          Admin Profile
        </Link>
      </nav>
    </div>
  )
}

