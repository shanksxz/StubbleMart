import Image from 'next/image'
import { Button } from '../ui/button'

export default function Hero() {
    return (
        <div className="w-full font-raleway relative">
            <div className=" top-0 w-full min-h-[150px] z-[-1]">
                <Image src="/svg/Frame 14.svg" alt="fadsf" fill objectFit="cover" objectPosition='top'></Image>
            </div>
            <div className="relative z-[5] flex flex-col items-start justify-center h-[500px] translate-y-[-70px] sm:translate-y-0  w-[90%] gap-4 mx-auto">
                <h1 className=" md:text-[50px] text-[40px] font-bold text-white">About Us</h1>
                <p className=" text-[#CFCFCF] font-semibold  text-[25px] md:w-[70%] md:w-[60%]">Join the green <span className=' text-primary-green'>Revolution</span>  by turning agricultural waste into valuable resources for a cleaner , tech-driven future.</p>
                <Button className="bg-primary-green text-white" size={"lg"} >Explore</Button>
            </div>
        </div>)
}
