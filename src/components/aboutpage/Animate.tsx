"use client"

import Image from "next/image"
import { motion } from "framer-motion"
export default function Animate() {
    return (
        <div className="w-full ">
            <div className=" w-full h-[570px] absolute z-[-1]">
                <Image src="/svg/slbg3 1.svg" alt="dfhda" fill objectFit="cover"></Image>
            </div>

            <div className="w-[80%] mx-auto flex justify-center items-center h-[600px] ">
                <h2 className="sm:text-[150px] flex flex-col w-full z-10 relative  text-[50px] text-white font-bold text-center">
                    <motion.div initial={{ x: -300 }} whileInView={{ x: 0, transition: { duration: 1.5 } }}  >
                        STUBBLE
                    </motion.div>
                    <motion.div initial={{ x: 300 }} whileInView={{ x: 0, transition: { duration: 1.5 } }} >
                        MART
                    </motion.div>
                </h2>


            </div>
        </div>
    )
}
