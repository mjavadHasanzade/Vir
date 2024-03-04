import React from 'react'

type Props = {
  title: string;
  cover: string;
  description: string;
}

const Draft = (props: Props) => {
  return (
    <section>
      <div className="p-4 bg-white rounded-xl">
        <div className="flex">
          <img src={draftMemory.cover} alt="" className='w-6 h-8' />
        </div>
      </div>
    </section>
  )
}

export default Draft