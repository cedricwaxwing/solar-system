import { Corner } from "./Corner";
import Logo from "./Logo";
import Sidebar from "./Sidebar";

const UI = () => {
  return (
    <>
      <header className='fixed top-0 left-0 w-screen flex items-center px-2 md:px-4 pt-4 md:pt-0 z-10'>
        <div className='flex items-center justify-center space-x-2 md:space-x-4 w-full'>
          <Corner className='hidden md:flex transform -rotate-90 transform-top-left scale-150 translate-y-2' />
          <div className='w-full h-px bg-teal-400'></div>
          <Logo className='text-xs md:text-sm whitespace-nowrap text-center font-display font-medium tracking-wide text-white uppercase leading-none' />
          <div className='w-full h-px bg-teal-400'></div>
          <Corner className='hidden md:flex transform transform-top-right scale-150 translate-y-2' />
        </div>
      </header>
      <main>
        <Sidebar />
        <Corner className='hidden md:flex transform rotate-90 transform-bottom-right fixed bottom-4 right-4 w-8 h-8 -translate-y-2' />
      </main>
    </>
  );
};

export default UI;
