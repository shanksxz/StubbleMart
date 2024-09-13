import Image from "next/image";
import { Button } from "./ui/button";

export default function Empowering() {
    return (
        <div className="w-full font-raleway">
            <div className="w-[93%] mx-auto flex justify-between py-[120px]">
                <div className="flex flex-col gap-5 items-start">
                    <h2 className="font-bold text-[35px]">Empowering <span className="text-primary-green font-bold">FARMERS</span>,Protecting the <span className="text-primary-green">Environment</span></h2>
                    <p className="text-primary-gray ">At Stubble Mart, we advance sustainable farming by reducing stubble burning for a healthier environment</p>
                    <Button className="bg-primary-green text-white" size={"lg"}>Discover</Button>
                </div>
                <div className="flex flex-col items-center w-[35.3%]">
                    <div className="relative w-[250px] h-[250px] self-end"><Image src={"/svg/image (7).svg"} alt="das" fill ></Image></div>
                    <div className="relative w-[250px] h-[250px] self-start -translate-y-24"><Image src={"/svg/image (6).svg"} alt="afsd" fill></Image></div>
                </div>

            </div>
        </div>
    )
}
