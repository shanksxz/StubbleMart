import Image from "next/image";

export default function Explain() {
    return (
        <div className="w-full font-raleway relative">
            <div className="absolute w-full min-h-[700px] sm:min-h-[570px] top-10 z-[-1]">
                <Image src="/svg/st2 1.svg" alt="dlfa" fill objectFit="cover"></Image>
            </div>

            <div className="flex flex-col justify-between gap-5 items-center py-[50px] sm:py-[100px] w-[80%] mx-auto">
                <h2 className="font-bold text-[35px] text-white text-center sm:text-start">We Our <span className="text-primary-green">Stubble Mart</span></h2>
                <p className="text-white text-[20px] font-medium text-center sm:text-start">Join the green Revolution by turning agricultural waste into valuable resources for a cleaner , tech-driven future.</p>
                <div className="flex flex-col sm:flex-row justify-between bg-white p-8 w-[80%]">
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

        </div>
    )
}
