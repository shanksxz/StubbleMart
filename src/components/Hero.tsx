import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="w-full font-raleway relative">
            <div className="w-full absolute z-[2] h-[400px] md:h-[500px] lg:h-[600px]">
                <Image src="/svg/Rectangle 3.svg" priority alt="Background shape" fill style={{ objectFit: "cover" }} />
            </div>
            <div className="absolute w-full h-[400px] md:h-[500px] lg:h-[600px]">
                <Image src="/svg/image.svg" alt="Hero background" fill style={{ objectFit: "cover" }} />
            </div>

            <div className="relative z-10 flex pt-[40px] sm:pt-0 flex-col w-[80%] lg:w-[60%] xl:w-[50%] px-8 sm:px-6 md:px-8 lg:px-20 justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] gap-4">
                <h1 className="font-bold text-white text-2xl sm:text-4xl md:text-5xl lg:text-[50px] leading-tight">
                    Transforming <span className="text-primary-green">Stubble</span> into <span className="text-primary-green">Sustainable Solutions</span>
                </h1>
                <p className="text-slate-300 text-[15px] sm:text-[25px]">
                    Join the green Revolution by turning agricultural waste into valuable resources for a cleaner, tech-driven future.
                </p>
                <Link href={"/products"}>
                    <Button className="bg-primary-green w-fit" size="lg">
                        Explore
                    </Button>
                </Link>
            </div>
        </div>
    )
}