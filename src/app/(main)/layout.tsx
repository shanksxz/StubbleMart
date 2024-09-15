import Navbar from "src/components/Navbar";
import Footer from "@/components/Footer";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
        </div>
    )
}
