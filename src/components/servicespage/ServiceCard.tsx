"use client"
import { motion } from "framer-motion"
export default function ServiceCard({ el }: { el: { id: number, tag: string, name: string, desc: string } }) {
    const settings = {
        down: { height: 0, transition: { duration: 0.5 } },
        up: { height: "90%", transition: { duration: 0.5 } }
    }
    return (
        <motion.div initial={"down"} whileHover={"up"} key={el.id} className=" bg-[#D9D9D9] mx-4 ml-[-1px] sm:ml-0 sm:mx-0 sm:w-[449px] sm:min-h-[400px] relative pt-10 pb-5">
            <motion.div className="absolute bottom-0 w-full bg-primary-green h-full " variants={settings}>

            </motion.div>
            <div className="py-5 px-7 w-full relative z-[1] hover:text-white transition-all duration-100">
                <div className="font-bold text-[50px] w-full sm:text-end ">
                    {el.tag}
                </div>
                <div>
                    <h3 className=" font-bold text-[30px]">{el.name}</h3>
                    <p className="font-normal text-[25px]">{el.desc}</p>
                </div>

            </div>



        </motion.div>
    )
}
