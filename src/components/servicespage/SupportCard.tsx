import Image from "next/image";

export default function SupportCard({ el }: { el: { id: number, img: string, head: string, desc: string, head2: string } }) {
    return (
        <div className={`flex flex-col sm:flex-row w-full mb-[100px] justify-between  gap-10  ${el.id === 1 || el.id === 3 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
            <div className="flex flex-col items-center gap-3 sm:items-start justify-between w-full">
                <Image src={el.img} alt="dfd" width={485} height={356} objectFit="cover"></Image>
                <div className={`bg-primary-green w-[90%] text-center sm:text-start  text-[27px] font-bold rounded-md py-1 px-3 text-white ${el.id === 2 && "sm:text-end"}`}>{el.head2}</div>
            </div>
            <div className="flex flex-col  gap-4 w-full justify-start items-center text-center sm:items-start sm:text-start">
                <h2 className=" text-primary-green font-bold text-[26px] sm:text-[36px]">{el.head}</h2>
                <p className="font-medium w-[90%] text-[20px] sm:text-[24px]">{el.desc}</p>

            </div>

        </div>
    )
}
