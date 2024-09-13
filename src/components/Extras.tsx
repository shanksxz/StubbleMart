import { extra } from '@/utils'
import React from 'react'
import Image from 'next/image'

export default function Extras() {
    return (
        <div className='w-full'>
            <div className='w-[93%] mx-auto py-[120px] flex justify-between'>
                {extra.map(item => (
                    <div key={item.id} className='flex flex-col items-center justify-center font-raleway relative overflow-hidden text-white font-bold text-[25px]'>
                        <div className='relative w-[602px] h-[289px]'>
                            <Image src={item.img} alt={item.name} fill objectFit='cover'></Image>
                        </div>
                        <div className='absolute bg-black opacity-65 w-full z-[3] h-full rounded-[20px]'></div>
                        <p className='absolute z-[5]'>{item.name}</p>

                    </div>
                ))}

            </div>
        </div>
    )
}
