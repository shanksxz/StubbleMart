import Animate from "@/components/about/Animate";
import AnimatedPoints from "@/components/about/AnimatedPoints";
import Collaborators from "@/components/about/Collaborators";
import Explain from "@/components/about/Explain";
import Hero from "@/components/about/Hero";
import Points from "@/components/about/Points";

export default function About() {
    return (
        <div className=" overflow-x-hidden">
            <Hero></Hero>
            <Explain></Explain>
            <Collaborators></Collaborators>
            <Animate></Animate>
            <Points></Points>
        </div>
    )
}
