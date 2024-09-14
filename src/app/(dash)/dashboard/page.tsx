"use client"

import { getCollaboratorsCountByCategory, getUserCountWhoOrdered } from "@/actions/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, ShoppingCart, Tractor, Truck, Store, Users } from "lucide-react"
import { useEffect, useState } from "react"

export default function Dashboard() {

  const [collaboratorTypes, setCollaboratorTypes] = useState([
    { name : "Stubble purchasing company", count: 0, icon: ShoppingCart, type: "STUBBLE_PURCHASING_COMPANY" },
    { name : "Machine rental", count: 0, icon: Tractor, type: "MACHINE_RENTAL" },
    { name : "Transportation company", count: 0, icon: Truck, type: "TRANSPORTATION_COMPANY" },
    { name : "Agriculture shops", count: 0, icon: Store, type: "AGRICULTURE_SHOPS" },
  ])

  const [farmerCount, setFarmerCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCollaboratorsCountByCategory();
      if(res.success) {
        const counts = res.counts!
        setCollaboratorTypes(collaboratorTypes.map(collab => {
          return {
            ...collab,
            count: counts[collab.type as keyof typeof counts] || 0
          }
        }))
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUserCountWhoOrdered();
      if(res.success) {
        setFarmerCount(Object.keys(res.counts!).length)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collaboratorTypes.map((collab, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {collab.name}
                </CardTitle>
                <collab.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{collab.count}</div>
                <p className="text-xs text-muted-foreground">
                  Registered collaborators
                </p>
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Registered Farmers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{farmerCount}</div>
              <p className="text-xs text-muted-foreground">
                Farmers who have ordered with us
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}