"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { ShoppingCart, Tractor, Truck, Store, Users } from "lucide-react"
import Link from 'next/link'
import { getCollaboratorsCountByCategory, getUserCountWhoOrdered } from "@/actions/admin"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const [collaboratorTypes, setCollaboratorTypes] = useState([
    { name: "Stubble purchasing company", count: 0, icon: ShoppingCart, type: "STUBBLE_PURCHASING_COMPANY" },
    { name: "Machine rental", count: 0, icon: Tractor, type: "MACHINE_RENTAL" },
    { name: "Transportation company", count: 0, icon: Truck, type: "TRANSPORTATION_COMPANY" },
    { name: "Agriculture shops", count: 0, icon: Store, type: "AGRICULTURE_SHOPS" },
  ])

  const [farmerCount, setFarmerCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCollaboratorsCountByCategory();
      if(res.success) {
        const counts = res.counts!
        setCollaboratorTypes(collaboratorTypes.map(collab => ({
          ...collab,
          count: counts[collab.type as keyof typeof counts] || 0
        })))
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collaboratorTypes.map((collab, index) => (
            <Link href={`/dashboard/${collab.type.toLowerCase()}`} key={index}>
              <Card className="hover:shadow-lg transition-shadow duration-200">
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
            </Link>
          ))}
          <Link href="/dashboard/farmers">
            <Card className="hover:shadow-lg transition-shadow duration-200">
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
          </Link>
        </div>
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Collaborator Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={collaboratorTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {collaboratorTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}