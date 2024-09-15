import { service } from '@/utils'
import Image from 'next/image'
import ServiceCard from './ServiceCard'
export default function OurServices() {
    return (
        <div className="w-full">
            <div className="w-[90%] mx-auto flex flex-col items-center py-10 gap-3">
                <Image src="/svg/green.svg" alt="fda" width={100} height={100}></Image>
                <h2 className=' text-[25px] font-normal'>Our Services</h2>
                <h3 className=' font-bold text-[40px]'>What We Offer</h3>
                <div className='grid grid-rows-1 grid-cols-3 gap-12 w-full'>
                    {service.map((el) => (
                        <ServiceCard key={el.id} el={el}></ServiceCard>

                    ))}
                </div>

            </div>
        </div>
    )
}
