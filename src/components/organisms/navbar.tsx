import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { TbPlus, TbSettings2 } from 'react-icons/tb';

type props = { user: { name?: string, image?: string } }

const Navbar = ({ user: { image, name } }: props) => {

  return (
    <nav className="flex items-center justify-between bg-white rounded-xl px-4 py-4 my-4">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 rounded-full relative overflow-hidden">
          <Image
            src={image ?? "https://solobeat.ir/assets/images/user.jpg"}
            alt={name ?? "Unknown"}
            fill
          />
        </div>
        <span className="text-gray-800 font-medium">{name}</span>
      </div>
      <ul className="flex items-center space-x-4">
        <li className="px-3 py-1 bg-[#8CA6FC] text-white rounded-xl font-sm">
          <Link href={"/"}>
            All
          </Link>
        </li>
        <li className="px-3 py-1 text-typo">
          <Link href={"/memories"}>
            Memories
          </Link>
        </li>
        <li className="px-3 py-1 text-typo">
          <Link href={"/todos"}>
            Todos
          </Link>
        </li>
        <li className="px-3 py-1 text-typo">
          <Link href={"/media"}>
            Media
          </Link>
        </li>
        <li>
          <button className='rounded-md p-1 text-sm bg-[#F4F5F7] text-typo'>
            <TbPlus />
          </button>
        </li>
      </ul>
      <button className="px-3 py-1 bg-[#FED37D] text-typo rounded-md font-medium flex items-center">
        <TbSettings2 className='mr-2' />
        <span>
          Settings
        </span>

      </button>
    </nav>
  );
};

export default Navbar;