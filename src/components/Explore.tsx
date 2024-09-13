import { details } from "@/utils";
import Image from "next/image";

export default function Explore() {
    return (
        <div className="w-full bg-[#FEF3D7]  ">
            <div className="w-[93%] mx-auto font-raleway flex justify-between py-[120px] items-center">
                <div>
                    <h2 className=" text-[35px] font-bold mb-10">Explore Our Impact : How we’re <span className=" text-primary-green">Transforming Farming</span>  and <span className="text-primary-green">Benefitting</span> the Environment</h2>
                    <div className="grid grid-cols-2 items-center grid-rows-2 gap-4 w-full ">
                        {details.map(detail => (
                            <div key={detail.id} className="p-5 flex flex-col items-center gap-4 border-2 border-primary-green max-w-[300px] text-[30px] rounded-lg ">
                                <h1 className="font-semibold">{detail.number}+</h1>
                                <p>{detail.desc}</p>
                            </div>
                        ))}

                    </div>

                </div>

                <div className="relative min-w-[586px] min-h-[502px] ">
                    <Image src={"/svg/Group 5.svg"} alt="sldf" fill objectFit="cover"></Image>
                </div>

            </div>
        </div>
    )
}
