import { MapPinCheckInside, PhoneCall, MailOpen } from 'lucide-react'
export default function Footer() {
    return (
        <div className="w-full bg-black">
            <div className="w-[80%] mx-auto grid grid-cols-1 grid-rows-4 sm:grid-cols-4 sm:grid-rows-1 py-[80px] gap-8">
                <div className='flex flex-col items-start'>
                    <h2 className='text-white font-bold text-[28px]'>About Us</h2>
                    <p className='text-gray-500 '>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis dolorum qui consequuntur sunt at nam commodi vero eum autem assumenda! Quisquam, quidem. Quisquam, quidem.
                    </p>
                </div>
                <div className='flex flex-col '>
                    <h2 className='text-white font-bold text-[28px]'>Categories</h2>
                    <ul className=' text-gray-500 flex flex-col gap-3'>
                        <li>Agriculture</li>
                        <li>Uncategorized</li>
                    </ul>
                </div>
                <div>
                    <h2 className='text-white text-[28px] font-bold'>Archives</h2>
                    <p className='text-gray-500'>February 2022</p>
                </div>
                <div>
                    <h2 className='text-white font-bold text-[28px]'>Contact Us</h2>
                    <ul className='text-gray-500 flex flex-col gap-5'>
                        <li className='flex gap-2'><MapPinCheckInside /> StubbleMart,#49436 block,#888 Honey rd Newyork</li>
                        <li className='flex gap-2'><PhoneCall />+(21)-255-999-8888</li>
                        <li className='flex gap-2'><MailOpen /> StubbleMart@gmail.com </li>
                    </ul>
                </div>


            </div>
        </div>
    )
}
