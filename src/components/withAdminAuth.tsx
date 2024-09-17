'use client'


import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { getCurrUser } from '@/actions/user'
import { Spinner } from '@nextui-org/spinner'

export function withAdminAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAdminAuth(props: P) {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'loading') return

      if (status === 'unauthenticated') {
        router.push('/login')
      } else {
        const checkAdminStatus = async () => {
          try {
            const res = await getCurrUser()
            if (res.success && res.user?.role !== 'ADMIN') {
              router.push('/')
            }
          } catch (error) {
            console.error(error)
            router.push('/')
          }
        }
        checkAdminStatus()
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