import { BsChevronCompactDown } from "react-icons/bs";

const ScrollDown = () => {
  return (
    <div className="flex group justify-center w-full absolute bottom-6">
      <a href="#scroll">
        <h6 className="text-white/40 text-sm">Scroll Down</h6>
        <BsChevronCompactDown className="w-full h-auto text-white/40 px-4 -mt-4 lg:group-hover:animate-bounce cursor-pointer" />
      </a>
    </div>
  );
};

export default ScrollDown;
