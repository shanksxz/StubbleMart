import Link from "next/link"
import { BarChart3, ShoppingCart, Tractor, Truck, Store, Users, Package, User, X, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Sidebar({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${
          open ? "block" : "hidden"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-white lg:translate-x-0 lg:static lg:inset-0 ${
          open ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
        }`}
      >
        <div className="flex items-center justify-between flex-shrink-0 p-4">
          <span className="text-xl font-semibold">StubbleMart</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav className="mt-5 flex flex-col justify-between h-[calc(100vh-80px)]">
          <div>
            <NavItem href="/dashboard" icon={BarChart3}>Dashboard</NavItem>
            <NavItem href="/dashboard/collaborator/stubble-purchasing" icon={ShoppingCart}>Stubble Purchasing</NavItem>
            <NavItem href="/dashboard/collaborator/machine-rental" icon={Tractor}>Machine Rental</NavItem>
            <NavItem href="/dashboard/collaborator/transportation" icon={Truck}>Transportation</NavItem>
            <NavItem href="/dashboard/collaborator/agri-shops" icon={Store}>Agriculture Shops</NavItem>
            <NavItem href="/dashboard/farmers" icon={Users}>Farmers</NavItem>
            <NavItem href="/dashboard/product" icon={Package}>Products</NavItem>
            <NavItem href="/admin-profile" icon={User}>Admin Profile</NavItem>
          </div>
          <div>
            <NavItem href="/dashboard/recycle-bin" icon={Trash}>Recycle Bin</NavItem>
          </div>
        </nav>
      </div>
    </>
  )
}

function NavItem({ href, icon: Icon, children }: { href: string; icon: any; children: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100">
      <Icon className="h-5 w-5 mr-3" />
      {children}
    </Link>
  )
}