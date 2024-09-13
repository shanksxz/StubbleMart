import Collaboration from "@/components/Collaboration";
import Empowering from "@/components/Empowering";
import Explore from "@/components/Explore";
import Extras from "@/components/Extras";
import Hero from "@/components/Hero";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import Popular from "@/components/Popular";
import Services from "@/components/Services";
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