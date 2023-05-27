import { Outlet } from "react-router-dom";
import Navbar from "components/container/navbar";
import Footer from "components/container/footer";

export default function MainLayout() {
  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}
