import Collaboration from "src/components/Collaboration";
import Empowering from "src/components/Empowering";
import Explore from "src/components/Explore";
import Extras from "src/components/Extras";
import Hero from "src/components/Hero";
import Navbar from "src/components/Navbar";
import Popular from "src/components/Popular";
import Services from "src/components/Services";
import Link from "next/link";
// import getServerSession from "@/server/getServerSession";

export default function Home() {
  // const session = await getServerSession();

  // if(!session?.user?.email) {
  //   return <div>Access Denied</div>;
  // }

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


