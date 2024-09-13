"use client"

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Button from "./Button"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    return (
        <header className="bg-primary-gray font-raleway py-4 md:px-20 px-4 text-white">
            <nav className="flex justify-between items-center">
                <div className="hidden md:flex items-center space-x-4">
                    <ul className='font-normal flex gap-4'>
                        <li>Home</li>   
                        <li>About</li>
                        <li>Services</li>
                        <li>Collaborate</li>
                        <li>News</li>
                    </ul>
                </div>
                <div className="flex gap-4">
                    <Button className="bg-primary-green px-6 text-black font-semibold">
                        Login
                    </Button>
                    <Button className="border px-6 border-primary-green text-primary-green">
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
                        <Button className="bg-primary-green px-6 text-black font-semibold">
                            Login
                        </Button>
                        <Button className="border px-6 border-primary-green text-primary-green">
                            Contact
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}