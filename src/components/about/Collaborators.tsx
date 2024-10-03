"use client"
import { collaborators } from "@/utils";
import Image from "next/image";

export default function Collaborators() {
    return (
        <div className="w-full">
            <div className="w-[80%] sm:flex grid grid-cols-2 grid-rows-2 place-items-center gap-10  sm:flex-row min-h-[300px] sm:h-full justify-between items-center mx-auto py-8">
                {collaborators.map((collaborator) => (
                    <Image src={collaborator.url} alt="collaborator" width={100} height={50} />

                ))}

            </div>
        </div>
    )
}
