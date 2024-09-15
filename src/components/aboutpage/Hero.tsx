import Image from 'next/image'
import { Button } from '../ui/button'
export default function Hero() {
    return (
        <div className="w-full font-raleway">
            <div>
                <div className="absolute top-0 w-full h-[700px] z-[-1]">
                    <Image src="/svg/frame 14.svg" alt="fadsf" fill objectFit="cover" objectPosition='top'></Image>
                </div>
                <div className="relative z-[5] flex flex-col items-start justify-center h-[500px] w-[90%] gap-4 mx-auto">
                    <h1 className=" text-[40px] sm:text-[50px] text-white font-bold ">About Us</h1>
                    <p className=" text-[#CFCFCF] text-[22px] font-medium sm:text-[25px] w-[70%] sm:w-[60%]">Join the green Revolution by turning agricultural waste into valuable resources for a cleaner , tech-driven future.</p>
                    <Button className="bg-primary-green text-white" size={"lg"} >Explore</Button>

                </div>

            </div>
        </div>)
}
