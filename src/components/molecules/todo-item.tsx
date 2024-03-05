import React from 'react'

type Props = {
    todo: {
        id: string;
        task: string;
        completed: boolean;
        time: string
    }
}

const TodoItem = (props: Props) => {
    return (
        <div className='bg-white p-4 my-4 rounded-xl'>
            <div className="flex">
                <div className="w-5 h-5 border-2 border-typo rounded-md"></div>
                <div className='ml-2 '>
                    <h3 className='text-typo leading-[0.8]'>
                        {props.todo.task}
                    </h3>
                    <div className="flex items-center mt-3">
                        <span className={`py-[.15rem] px-2 text-typo rounded-xl text-[.65rem] ${props.todo.completed ? "bg-[#8CA6FC]" : "bg-[#FCD37C]"}`}>
                            {props.todo.completed ? "Done" : "Pending"}
                        </span>
                        <span className='text-[.65rem] text-typo font-bold ml-2'>
                            {props.todo.time}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoItem