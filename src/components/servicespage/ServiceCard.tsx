"use client"
import { motion } from "framer-motion"
export default function ServiceCard({ el }: { el: { id: number, tag: string, name: string, desc: string } }) {
    const settings = {
        down: { height: 0, transition: { duration: 0.5 } },
        up: { height: "85%", transition: { duration: 0.5 } }
    }
    return (
        <motion.div initial={"down"} whileHover={"up"} key={el.id} className=" bg-[#D9D9D9] w-[449px] min-h-[400px] relative pt-10 pb-5">
            <motion.div className="absolute bottom-0 w-full bg-primary-green h-full " variants={settings}>

            </motion.div>
            <div className="py-5 px-7 w-full relative z-[1]">
                <div className="font-bold text-[50px] w-full text-end ">
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
