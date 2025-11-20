import { Menu } from "lucide-react";
import logo from "../../assets/images/logo.jpg";
import { Bell } from "lucide-react";

function Nav() {
  return (
    <div className="w-full h-20 m-0 shadow-lg flex items-center bg-white">
      <div className="flex gap-6 items-center">
        <Menu className="p-0.5 ml-5" />
        <img src={logo} alt="logo" className="w-30" />
      </div>

      <div className="ml-auto flex gap-6 items-center">
        <Bell className="mr-3 p-0.5" />
        <div className="w-12 h-12 bg-amber-100 mr-5 rounded-4xl border-1 border-amber-200"></div>
      </div>
    </div>
  );
}

export default Nav;
