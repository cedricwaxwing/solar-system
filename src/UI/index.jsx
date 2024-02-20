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
        <div className='hidden bottom-6 right-6 md:flex fixed items-center space-x-1'>
          <div className='text-[8px] text-emerald-500 font-display font-bold uppercase tracking-wider leading-none transform translate-y-0.5'>
            A project by
          </div>
          <a
            href='https://cedricwaxwing.xyz'
            target='_blank'
            className='text-[10px] text-emerald-300 font-display font-bold uppercase leading-none hover:underline hover:text-emerald-500 cursor-pointer tracking-wide transition-colors duration-300 ease-in-out'
            rel='noreferrer'>
            Cedric Waxwing
          </a>
        </div>
      </main>
    </>
  );
};

export default UI;
