import Image from "next/image";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function Hero() {
    return (
        <div className="w-full">
            <div className="w-full absolute z-[-1] h-[600px]">
                <Image src={"/svg/servicebanner2.svg"} alt="hdla" fill objectFit="cover"></Image>

            </div>
            <div className="w-full z-[1]">
                <div className="w-[80%] mx-auto h-[600px] flex flex-col justify-center">
                    <h1 className=" font-bold text-[50px] text-white">Services</h1>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="text-primary-green font-semibold text-[24px]">
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>

                            </BreadcrumbItem>
                            <BreadcrumbSeparator></BreadcrumbSeparator>
                            <BreadcrumbItem className="text-white font-semibold text-[24px]">
                                <BreadcrumbLink href="/services">Services</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>

                    </Breadcrumb>


                </div>



            </div>
        </div>
    )
}
