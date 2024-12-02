import { Outlet } from "react-router-dom";
import Navbar from "./ui/navbar";

const Layout = () => {
  return (
    <div className="bg-background min-h-screen p-1">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
