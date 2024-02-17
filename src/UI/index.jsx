import Logo from "./Logo";
import Sidebar from "./Sidebar";

const UI = () => {
  return (
    <>
      <header className='fixed top-0 left-0 w-screen flex items-center p-4 z-10'>
        <Logo className='text-white hover:text-white/60 duration-300 ease-in-out cursor-pointer' />
      </header>
      <main>
        <Sidebar />
      </main>
    </>
  );
};

export default UI;
