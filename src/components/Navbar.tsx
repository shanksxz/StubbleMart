"use client"

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'
import { navlinks } from 'src/utils'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { motion } from 'framer-motion'

export default function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const settings2 = {
        close: { x: -100, opacity: 0 },
        open: { x: 0, opacity: 1 }
    }
    const router = useRouter()
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
    const session = useSession();
    const settings = {
        close: { width: 0 },
        open: { width: 100, transition: { duration: 0.5 } }
    }


    return (
        <header className="bg-white font-raleway py-4 md:px-20 px-4 text-white ">
            <nav className="flex justify-between items-center bg-white  ">
                <div className=' relative w-[100px] h-[50px]'>
                    <Image src={"/svg/newlogo.svg"} alt='logo' fill objectFit='cover'></Image>
                </div>
                <div className="hidden md:flex items-center space-x-4 w-[55%]">
                    <ul className='font-bold w-full flex justify-between  '>
                        {navlinks.map(link => (
                            <motion.li initial={"close"} whileHover={"open"} className='flex flex-col gap-1 max-w-fit overflow-hidden text-black relative'>
                                <Link href={link.url}>{link.name}</Link>
                                <motion.div variants={settings} className='w-full bg-primary-green h-[2px] absolute bottom-0 mt-6'></motion.div>
                            </motion.li>

                        ))}
                    </ul>
                </div>
                <div className="flex gap-4">
                    {!session.data?.user?.email &&
                        <Button className="bg-primary-green px-6 text-white hover:bg-white hover:text-black font-semibold" onClick={() => router.push("/login")}>
                            Login
                        </Button>
                    }
                    {
                        session.data?.user?.email &&
                        <Button className="bg-primary-green px-6 text-white hover:bg-white hover:text-black font-semibold" onClick={() => signOut()}>
                            Logout
                        </Button>
                    }
                    <Button className="border px-6 border-primary-green bg-transparent hover:bg-primary-green hover:text-white text-primary-green">
                        Contact
                    </Button>
                </div>
                <button className="md:hidden" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} color='green' /> : <Menu size={24} color='green' />}
                </button>
            </nav>

            <motion.div variants={settings2} animate={!isMenuOpen ? "close" : "open"} className="md:hidden mt-4 bg-white absolute z-20 w-full left-0 px-7 pb-8 ">
                <ul className='font-medium flex flex-col gap-4 text-black '>
                    {navlinks.map(link => (
                        <Link key={link.id} href={link.url}>{link.name}</Link>
                    ))}

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
            </motion.div>

        </header>
    )
}