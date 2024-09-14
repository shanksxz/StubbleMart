"use client"

import { popular } from "src/utils";
import Slider from "react-slick";
import PopularCards from "./PopularCards";

export default function Popular() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };
    return (
        <div className="w-full">
            <div className="w-[93%] mx-auto py-[120px] font-raleway">
                <h2 className="font-bold text-[35px]">Search your <span className=" text-primary-green">Popular Stubble</span></h2>
                <div className="py-[30px]">
                    <div className="slider-container">
                        <Slider {...settings}>
                            {popular.map(pop => (
                                <PopularCards></PopularCards>
                            ))}
                        </Slider>

                    </div>

                </div>


            </div>
        </div>
    )
}
