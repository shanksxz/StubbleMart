"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Mail } from 'lucide-react'

const blogPosts = [
    { title: 'Rice Stubble', image: '/svg/stubble.svg' },
    { title: 'Wheat Stubble', image: '/svg/stubble.svg' },
    { title: 'SugarCane Stubble', image: '/svg/stubble.svg' },
    { title: 'Corn Stubble', image: '/svg/stubble.svg' },
    { title: 'Soyabean Stubble', image: '/svg/stubble.svg' },
]

export default function NewsletterPage() {
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle newsletter signup
        console.log('Signed up with:', email)
        setEmail('')
    }

    return (
        <div className="min-h-screen bg-gray-100">

            <main className="container mx-auto px-4 py-8  w-[80%] ">
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-green-600 text-white rounded-lg p-8 mb-8"
                >
                    <h2 className="text-3xl font-bold mb-4">Stay up to date with Bowles Farming</h2>
                    <p className="mb-4">Join our newsletter to hear the latest news from our team.</p>
                    <form onSubmit={handleSubmit} className="flex">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="flex-grow p-2 rounded-l-md text-gray-800"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-r-md flex items-center"
                        >
                            Join
                            <ChevronRight className="ml-2" size={20} />
                        </button>
                    </form>
                </motion.section>

                <section>
                    <h3 className="text-2xl font-bold mb-4">Recent Posts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogPosts.map((post, index) => (
                            <motion.article
                                key={post.title}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h4 className="text-xl font-semibold mb-2">{post.title}</h4>
                                    <p className="text-gray-600 mb-4">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-green-600 text-white px-4 py-2 rounded-md"
                                    >
                                        Read More
                                    </motion.button>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </section>
            </main>


        </div>
    )
}