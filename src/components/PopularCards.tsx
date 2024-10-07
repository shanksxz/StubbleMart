import Image from "next/image";
import { Button } from "./ui/button";

export default function PopularCards() {
    return (
        <div className=" font-raleway shadow-md mr-6 flex flex-col overflow-hidden relative z-10">
            <div className="min-w-[475px] min-h-[310px] relative">
                <Image src="/assets/image/stubble.png" alt="stubble" fill objectFit="cover"></Image>
            </div>
            <div className="flex flex-col gap-3 p-6 bg-[#FEF3D7] rounded-lg">
                <div className=" flex w-full justify-between items-center">
                    <p className="font-semibold text-[25px]">Stubble Mulch</p>
                </div>
                <p>The practice of leaving crop residue on the soil surface to reduce erosion and conserve moisture.</p>
                <div className="flex justify-between px-6">
                    <Button variant={"outline"} size={'lg'} className=" text-primary-green border-primary-green py-[16px] px-[36px]">$28.85</Button>
                    <Button size={"lg"} className="bg-primary-green py-[16px] px-[36px]">Add</Button>
                </div>
            </div>
        </div>
    )
}