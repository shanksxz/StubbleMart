import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
// import getServerSession from "@/server/getServerSession";

export default async function Page() {
  // const session = await getServerSession();

  // if(!session?.user?.email) {
  //   return <div>Access Denied</div>;
  // }

  return (
    // <div>
    //   <h1>Dashboard</h1>
    //   <p>Welcome {session.user.email}</p>
    // </div>
    <>
      <Navbar />
      <Main />
    </>
  );
}