import React from 'react'

type Props = {
    title: string;
    cover: string | null;
    description: string | null;
    score: number | null;
    mode: string | null;
}

const MemoryCard = (props: Props) => {
    return (
        <div className='bg-[#E8EDFF] my-4 rounded-xl p-4 flex items-center'>
            <div className="rounded-xl w-1/4 overflow-hidden">
                <img src={props.cover} alt={props.title} className='w-full max-h-[100px] object-cover' />
            </div>
            <div className="w-3/4 ml-4">
                <h2 className='text-xl font-bold mb-2'>{props.title}</h2>
                <p className='text-xs text-typo mb-4'>{props.description}</p>
                <div className="flex  items-center">
                    <span className='mr-4 text-[.7rem] bg-white rounded-xl py-1 px-2'>
                        {props.mode} mode: ({props.score}/5)
                    </span>

                    <span className='mr-4 text-typo text-[.6rem]'>
                        {props.date ?? "2023-12-02"}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MemoryCard