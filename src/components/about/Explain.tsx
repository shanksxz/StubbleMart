import Image from "next/image";

export default function Explain() {
    return (
        <div className="w-full font-raleway relative">
            <div className=" w-full">
                <Image src="/assets/image/Frame 34 (1).png" alt="dlfa" fill objectFit="cover"></Image>
            </div>
            <div className="flex flex-col justify-between gap-5 items-center py-[120px] w-[80%] mx-auto relative z-10 ">
                <h2 className="font-bold text-[35px] text-white text-center sm:text-start">We Our <span className="text-primary-green">Stubble Mart</span></h2>
                <p className="text-white text-[20px] font-medium text-center sm:text-start">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore, molestias!</p>
                <div className="sm:flex flex-col  sm:flex-row justify-between bg-white p-8 w-[80%] hidden ">
                    <div className=" relative w-full sm:w-[400px] h-[250px] ">
                        <Image src={"/svg/trans3.svg"} alt="fda" fill className=" object-contain sm:object-cover"></Image>
                    </div>
                    <div className="w-full sm:w-[50%] flex flex-col items-center gap-5">
                        <h3 className="font-bold text-[20px] sm:text-start  text-center
                                ">Grow Organics At Your Home With Us</h3>
                        <p className="font-medium text-[16px] text-center line-clamp-4 sm:line-clamp-none">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores voluptatem ipsa vero ducimus! Hic aut, rem perspiciatis facilis ipsum ab consequatur, molestias architecto ex vel incidunt qui placeat sapiente nesciunt veniam praesentium nam totam, inventore magnam ipsa reiciendis vitae. Minus!</p>



                    </div>
                </div>
            </div>

        </div >
    )
}
