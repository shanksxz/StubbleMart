import { support } from "@/utils";
import SupportCard from "./SupportCard";
export default function Support() {
    return (
        <div className="w-full">
            <div className="w-[75%] min-h-[800px]   mx-auto  flex flex-col  justify-between py-[80px]">
                {support.map((el) => (
                    <SupportCard key={el.id} el={el} />
                ))}

            </div>
        </div>
    )
}
