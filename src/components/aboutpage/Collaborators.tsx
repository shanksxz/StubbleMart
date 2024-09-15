"use client"
import { collaborators } from "@/utils";
import Image from "next/image";

export default function Collaborators() {
    return (
        <div className="w-full">
            <div className="w-[80%] flex flex-col sm:flex-row h-[600px] sm:h-full justify-between items-center mx-auto py-10">
                {collaborators.map((collaborator) => (
                    <Image src={collaborator.url} alt="collaborator" width={100} height={50} />

                ))}

            </div>
        </div>
    )
}
