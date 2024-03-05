import Link from 'next/link';
import React from 'react'

type Props = {
  title: string;
  cover: string | null;
  content: string | null;
  mode: string | null;
}

const Draft = (props: Props) => {
  return (
    <section>
      <div className="p-4 bg-white rounded-xl mb-4">
        <div className="flex items-center">
          <img src={props.cover} alt="" className='w-10 h-8 rounded-lg object-cover' />
          <h2 className='text-lg ml-4 font-bold mb-2 truncate '>{props.title}</h2>

          <Link href={"/"} className="px-3 py-1 bg-[#8CA6FC] text-white rounded-lg text-sm ml-auto">
            Edit
          </Link>
        </div>
        <div className="h-[2px] w-full bg-gray-300 my-4"></div>
        <div className="">
          <div className="mb-4">
            <span className='text-xs text-[#8CA6FC] bg-[#E8E7F9] rounded-xl font-bold p-1 px-2'>
              mode: {props.mode}
            </span>
          </div>

          <p className='text-sm my-4 text-typo leading-7'>
            {props.content}
          </p>

          <div className="flex justify-end mt-4">
            <Link href={"/"} className="px-3 py-1 mr-4 text-[#8CA6FC] rounded-lg text-sm">
              Save
            </Link>
            <Link href={"/"} className="px-3 py-1 bg-[#8CA6FC] text-white rounded-lg text-sm">
              Publish
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Draft