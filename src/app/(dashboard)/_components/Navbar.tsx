import NavbarRoutes from "@/components/Layouts/NavbarRoutes";
import MobileSidebar from "./MobileSidebar";

const Navbar = () => {
  return (
    <>
      <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
        <MobileSidebar />
        <NavbarRoutes />
      </div>
      <div className=""></div>
    </>
  );
};

export default Navbar;
