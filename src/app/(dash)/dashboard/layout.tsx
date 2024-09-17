"use client"

import { useState } from 'react'
import { Sidebar } from "@/components/Sidebar"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"


function RootLayout({ children }: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <html lang="en">
      <body className='font-raleway'>
        <div className="flex h-screen bg-gray-100 font-raleway">
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="bg-white shadow-sm lg:hidden">
              <div className="px-4 py-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </div>
            </header>
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}

export default RootLayout
