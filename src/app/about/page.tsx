import Animate from "@/components/aboutpage/Animate";
import AnimatedPoints from "@/components/aboutpage/AnimatedPoints";
import Collaborators from "@/components/aboutpage/Collaborators";
import Explain from "@/components/aboutpage/Explain";
import Hero from "@/components/aboutpage/Hero";
import Points from "@/components/aboutpage/Points";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function About() {
    return (
        <div>
            <Hero></Hero>
            <Explain></Explain>
            <Collaborators></Collaborators>
            <Animate></Animate>
            <Points></Points>

        </div>
    )
}
