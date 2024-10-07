import CollaboratorForm from "@/components/CollaboratorForm";
import Image from "next/image";

export default function Collaborate() {
    return (
        <div className="">
            <div className="w-full relative top-0">
                <div className="absolute top-0 w-full h-[700px] overflow-hidden">
                    <Image src="/assets/image/collaborator-hero-img.png" alt="fhdsl" fill objectFit="cover"></Image>
                </div>
                <div className="w-full absolute z-[1] min-h-[700px] bg-black opacity-80">
                </div>
                <div className="relative z-[5] top-32">
                    <h1 className="text-5xl font-extrabold text-center text-primary-green mb-8 tracking-tight">Collaborate with Us</h1>
                    <p className="text-center text-white mb-8 text-xl w-[70%] sm:w-[30%]  mx-auto">Collaborate with us and be part of a growing network of businesses. Together, we can achieve more and create sustainable solutions for the agriculture industry.</p>
                </div>
            </div>
            <div className="relative z-[1] md:translate-y-[15rem] translate-y-[8rem]">
                <CollaboratorForm />
            </div>
        </div>
    )
}
