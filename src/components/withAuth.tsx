'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Spinner } from "@nextui-org/spinner"


export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAdminAuth(props: P) {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'loading') return

      if (status === 'unauthenticated') {
        router.push('/login')
      }       
    }, [status, router])

    if (status === 'loading') {
      return (
        <div className="flex justify-center items-center h-screen">
          <Spinner color="success" />
        </div>
      )
    }

    if (status === 'authenticated') {
      return <WrappedComponent {...props} />
    }
    return null
  }
}