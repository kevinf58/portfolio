import { useState, useEffect } from "react";
import { FaCode, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Link from "@/components/ui/Link";
import { IoIosMail } from "react-icons/io";
import copyText from "@/utils/copyText";

const NavBarMobile = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-screen bg-dark-gray px-8 pb-5 pt-7 transform transition-transform duration-200 ease-in z-20 ${
          open ? "translate-y-0 shadow-default" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center gap-2">
          <FaCode />
          <h1>Kevin Feng</h1>
          <IoClose className="text-white ml-auto lg:hover:cursor-pointer" size={30} onClick={toggleMenu} />
        </div>
        <div className="flex flex-col items-center mt-8 gap-4">
          <Link href={"/"} className="px-1.5" onClick={toggleMenu}>
            Home
          </Link>
          <Link href={"/journal"} className="px-1.5" onClick={toggleMenu}>
            Journal
          </Link>
          <Link href={"/contact"} className="px-1.5" onClick={toggleMenu}>
            Contact
          </Link>
          <div className="flex gap-4 mt-10">
            <a
              className="flex items-center gap-1.5"
              href="https://www.linkedin.com/in/kfengg/"
              title={`${"https://www.linkedin.com/in/kfengg/"}`}
              target="_blank"
              onClick={toggleMenu}
            >
              <FaLinkedin className="text-[#126BC5]" />
              <span className="text-xs">LinkedIn</span>
            </a>
            <a
              className="flex items-center gap-1.5"
              href="https://github.com/kevinf58"
              title={`${"https://github.com/kevinf58"}`}
              target="_blank"
              onClick={toggleMenu}
            >
              <FaGithub className="text-white" />
              <span className="text-xs">GitHub</span>
            </a>
            <a
              className="flex items-center gap-1.5"
              onClick={() => {
                copyText();
                toggleMenu();
              }}
              title="Click to copy email"
            >
              <IoIosMail className="text-white" />
              <span className="text-xs">Email</span>
            </a>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-black/30 transform transition-transform duration-200 ease-in z-10 ${
          open ? "translate-y-0 shadow-default" : "-translate-y-full"
        }`}
        onClick={toggleMenu}
      />
      <IoMenu className="text-white h-full lg:hover:cursor-pointer" size={30} onClick={toggleMenu} />
    </div>
  );
};

export default NavBarMobile;
