import Image from "next/image";
import { Button } from "./ui/button";

export default function Hero() {
    return (
        <div className="w-full font-raleway relative">
            <div className="  w-full absolute z-[2] h-[600px]">
                <Image src={"/svg/Rectangle 3.svg"} alt="sldf" fill objectFit="cover"></Image>

            </div>
            <div className="absolute w-full h-[600px]">
                <Image src={"/svg/image.svg"} alt="hero" fill objectFit="cover" ></Image>
            </div>

            <div className=" relative z-10 flex flex-col w-[50%] mx-20 justify-center h-[550px] gap-4 ">
                <h1 className=" font-bold text-white text-[50px] ">
                    Transforming <span className=" text-primary-green ">Stubble </span>into <span className="text-primary-green">Sustainable Solutions</span>
                </h1>
                <p className=" text-slate-300 text-[25px]">Join the green Revolution by turning agricultural waste into valuable resources for a cleaner , tech-driven future.</p>
                <Button className=" bg-primary-green w-fit " size={"lg"} >Explore</Button>

            </div>
        </div>
    )
}
