import { Button } from "./ui/button";
import { MessageCircle, Mic } from "lucide-react";


export default function ExtraButtons() {
    return (
        <div className=" fixed bottom-[50px] sm:bottom-[100px] right-3 z-10 flex flex-col gap-3 justify-center">
            <Button className=" bg-primary-green w-fit rounded-full py-7">
                <MessageCircle />
            </Button>
            <Button className="bg-primary-green w-fit rounded-full py-7">
                <Mic />
            </Button>

        </div>
    )
}
