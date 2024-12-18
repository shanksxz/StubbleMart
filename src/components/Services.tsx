import Image from "next/image";
import { Button } from "./ui/button";

export default function Services() {
    return (
        <div className="w-full font-raleway">
            <div className="w-[85%] sm:w-[93%] mx-auto flex flex-col-reverse sm:flex-row justify-between sm:items-center py-[10px] sm:py-[120px]">
                <div className="flex flex-col gap-4 w-[90%] sm:w-[49%]">
                    <h1 className="text-[30px] sm:text-[35px] font-bold">Our <span className=" text-primary-green">Services</span></h1>
                    <p className=" text-primary-gray text-[20px] sm:text-[25px] w-full">Offering a sustainable solution for farmers, we buy  and sell agricultural stubble to support eco-friendly practices. Join us in reducing waste and contributing to a greener environment .</p>
                    <Button size={"lg"} className=" w-fit bg-primary-green text-white">Read More</Button>
                </div>
                <div className="relative hidden sm:block sm:w-[667px] sm:h-[289px] ">
                    <Image src="/assets/image/truck.png" alt="truck" fill objectFit="cover"></Image>
                </div>
            </div>
        </div>
    )
}
