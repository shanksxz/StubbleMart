import Collaboration from "src/components/Collaboration";
import Empowering from "src/components/Empowering";
import Explore from "src/components/Explore";
import Extras from "src/components/Extras";
import Hero from "src/components/Hero";
import Popular from "src/components/Popular";
import Services from "src/components/Services";

export default function Home() {
  return (
    <div>
      <Hero></Hero>
      <Explore></Explore>
      <Collaboration></Collaboration>
      <Popular></Popular>
      <Services></Services>
      <Extras></Extras>
      <Empowering></Empowering>
    </div>
  );
}
