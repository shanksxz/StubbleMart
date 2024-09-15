import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Define the type for our point data
type Point = {
    x: number;
    y: number;
};

export default function AnimatedPoints() {
    const [points, setPoints] = useState<Point[]>([]);

    useEffect(() => {
        // In a real application, you'd parse the SVG or get the data from an API
        // For this example, we'll use dummy data
        const dummyPoints: Point[] = [
            { x: 100, y: 100 },
            { x: 200, y: 150 },
            { x: 300, y: 200 },
            { x: 400, y: 250 },
            { x: 500, y: 300 },
        ];
        setPoints(dummyPoints);
    }, []);

    return (
        <div className="relative w-full h-[600px] ">
            <>
                <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-09-14%20163203%201-6tEdWBevQjLFbBfdqcPFm30qPa2tXW.svg"
                    alt="Graph background"
                    layout="fill"
                    objectFit="contain"
                    className="translate-x-28"
                />
            </>

        </div>
    );
}