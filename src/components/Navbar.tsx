"use client"

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { navlinks } from 'src/utils'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const router = useRouter()
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const session = useSession();

    console.log(session)

    return (
        <header className="bg-primary-gray font-raleway py-4 md:px-20 px-4 text-white">
            <nav className="flex justify-between items-center">
                <div className=' relative w-[100px] h-[50px]'>
                    <Image src={"/svg/logo.svg"} alt='logo' fill objectFit='cover'></Image>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <ul className='font-normal flex gap-4'>
                        {navlinks.map(link => (
                            <li><Link href={link.url}>{link.name}</Link></li>
                        ))}
                    </ul>
                </div>
                <div className="flex gap-4">
                    {!session.data?.user?.email &&
                        <Button className="bg-primary-green px-6 text-black font-semibold" onClick={() => router.push("/login")}>
                            Login
                        </Button>
                    }
                    <Button className="border px-6 border-primary-green bg-transparent hover:bg-primary-green hover:text-white text-primary-green">
                        Contact
                    </Button>
                </div>
                <button className="md:hidden" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>
            {isMenuOpen && (
                <div className="md:hidden mt-4">
                    <ul className='font-normal flex flex-col gap-4'>
                        <li>Home</li>
                        <li>About</li>
                        <li>Services</li>
                        <li>Collaborate</li>
                        <li>News</li>
                    </ul>
                    <div className="flex flex-col gap-4 mt-4">
                        {!session.data?.user?.email &&
                            <Button className="bg-primary-green px-6 text-black font-semibold">
                                Login
                            </Button>
                        }
                        <Button className="border px-6 border-primary-green text-primary-green">
                            Contact
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}