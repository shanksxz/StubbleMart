import Image from "next/image";
import { Button } from "./ui/button";

export default function Collaboration() {
    return (
        <div className="w-full">
            <div className="flex  flex-col-reverse sm:flex-row justify-between w-[93%] font-raleway mx-auto items-center gap-5 py-[80px] sm:py-[120px]">
                <div className="flex flex-col w-[80%] sm:w-[55%]  gap-6 ">
                    <h2 className=" text-[30px] sm:text-[35px] font-bold">Join Our <span className=" text-primary-green">Collaboration Business</span></h2>
                    <p className="text-[25px] sm:text-[30px]  font-medium">Empowering Sustainable Partnerships</p>
                    <p className=" text-[20px] sm:text-[25px] text-slate-400">Partner with us to leverage innovative solution and sustainable practices. Together , we can achieb greater heightsand contribute to a better future for all</p>
                    <Button className="text-white w-fit hover:bg-white hover:text-primary-green  bg-primary-green text-[16px]" size={"lg"} >Collaborate with Us</Button>

                </div>
                <div className="relative w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] ">
                    <Image src={"/svg/collaboration.svg"} alt="dfas" fill objectFit="cover"></Image>

                </div>
            </div>
        </div>
    )
}