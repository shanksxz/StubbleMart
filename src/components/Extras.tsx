import { extra } from 'src/utils'
import React from 'react'
import Image from 'next/image'

export default function Extras() {
    return (
        <div className='w-full'>
            <div className='w-[85%] sm:w-[93%] mx-auto flex-col sm:flex-row py-[30px] sm:py-[120px] flex justify-between gap-8 sm:gap-0'>
                {extra.map(item => (
                    <div key={item.id} className='flex flex-col items-center justify-center font-raleway relative overflow-hidden text-white font-bold  text-[20px] sm:text-[25px]'>
                        <div className='relative w-[350px] h-[200px] sm:w-[602px] sm:h-[289px] rounded-lg'>
                            <Image src={item.img} alt={item.name} fill objectFit='contain'></Image>
                        </div>
                        <p className='absolute z-[5] text-center sm:text-start px-5'>{item.name}</p>

                    </div>
                ))}

            </div>
        </div>
    )
}