"use client"

import { popular } from "src/utils";
import Slider from "react-slick";
import PopularCards from "./PopularCards";

export default function Popular() {
    const settings = {
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        arrows: true,
        dotsClass: "slick-dots slick-thumb",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }]
    };
    return (
        <div className="w-full">
            <div className=" w-[85%] sm:w-[93%] mx-auto py-[120px] font-raleway">
                <h2 className="font-bold text-[30px] sm:text-[35px]">Search your <span className=" text-primary-green">Popular Stubble</span></h2>
                <div className="py-[30px]">
                    <div className="slider-container w-full">
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