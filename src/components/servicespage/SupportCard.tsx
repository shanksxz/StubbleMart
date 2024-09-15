import Image from "next/image";

export default function SupportCard({ el }: { el: { id: number, img: string, head: string, desc: string, head2: string } }) {
    return (
        <div className="flex w-full justify-between items-center">
            <div className="flex flex-col items-center">
                <Image src={el.img} alt="dfd" width={485} height={356}></Image>
                <div>{el.head2}</div>
            </div>
            <div className="flex w-full justify-start items-start">
                <h2>{el.head}</h2>
                <p>{el.desc}</p>

            </div>

        </div>
    )
}
