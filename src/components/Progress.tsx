"use client "
import { useEffect, useState } from "react"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { progress } from "@/utils"
import ProgressBar from "./ProgressBar"


export default function Progress() {
    const [progresses, setProgresses] = useState([0, 0, 0]);
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    useEffect(() => {
        if (isInView) {
            const timer = setTimeout(() => setProgresses([30, 60, 50]), 500)
            return () => clearTimeout(timer)

        }

    }, [isInView])
    return (
        <div ref={ref} className="flex flex-col sm:flex-row justify-start gap-16 mt-10 w-full">
            <div className="flex flex-col sm:gap-10 w-[40%] gap-5 sm:w-[30%] font-medium text-primary-green">
                <p className="text-[25px]">5k + People Join Us</p>
                <p className="text-[25px]">100% Benifitable</p>
            </div>
            <div className="flex flex-col gap-10 w-full">
                {progress.map((item, index) => (
                    <div>
                        <h3 className=" font-Semibold text-[20px]">{item.tile}</h3>
                        <ProgressBar
                            key={item.id}
                            progress={progresses[index] as number}
                            color="bg-green-500"
                        ></ProgressBar>
                    </div>

                ))}


            </div>

        </div>
    )
}