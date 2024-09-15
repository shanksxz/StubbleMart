import { support } from "@/utils";
import SupportCard from "./SupportCard";
export default function Support() {
    return (
        <div className="w-full">
            <div className="w-[70%] h-full">
                {support.map((el) => (
                    <SupportCard key={el.id} el={el} />
                ))}

            </div>
        </div>
    )
}
