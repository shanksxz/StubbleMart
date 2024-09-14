import Image from "next/image";
import { Button } from "./ui/button";

export default function Services() {
    return (
        <div className="w-full font-raleway">
            <div className="w-[93%] mx-auto flex justify-between items-center py-[120px]">
                {/* content */}
                <div className="flex flex-col gap-4 w-[49%]">
                    <h1 className=" text-[35px] font-bold">Our <span className=" text-primary-green">Services</span></h1>
                    <p className=" text-primary-gray text-[25px] w-full">Offering a sustainable solution for farmers, we buy  and sell agricultural stubble to support eco-friendly practices. Join us in reducing waste and contributing to a greener environment .</p>
                    <Button size={"lg"} className=" w-fit bg-primary-green text-white">Read More</Button>

                </div>
                {/* image */}
                <div className="relative w-[667px] h-[289px]">
                    <Image src={"/svg/truckun.svg"} alt="truck" fill objectFit="cover"></Image>
                </div>
            </div>

        </div>
    )
}