import { List } from "@phosphor-icons/react";
import Logo from "./Logo";
import Left from "./Left";

const UI = () => {
  return (
    <>
      <header className='fixed top-0 left-0 w-screen flex justify-between items-center p-4'>
        <Logo className='text-white hover:text-white/60 duration-300 ease-in-out cursor-pointer' />
        <List
          size={24}
          className='text-white hover:text-white/60 duration-300 ease-in-out cursor-pointer'
        />
      </header>
      <main>
        <Left />
      </main>
    </>
  );
};

export default UI;
