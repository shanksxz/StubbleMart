import Image from "next/image";

export default function Extra() {
    return (
        <div className="w-full h-[500px] relative">
            <div className="w-full absolute min-h-full z-[-1]">
                <Image src={"/svg/cow.svg"} alt="srdaf" fill objectFit="cover"></Image>

            </div>
            <div className="w-[80%] mx-auto min-h-full flex flex-col justify-center items-center">
                <h2 className="text-primary-green text-[30px] sm:text-[48px] font-bold">Services We Do</h2>
                <h3 className="text-white text-[50px] text-center sm:text-start sm:text-[84px] font-bold">Services We Provide</h3>

            </div>

        </div>
    )
}
