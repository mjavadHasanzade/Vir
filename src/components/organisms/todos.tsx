import React from 'react'
import { HiOutlineDocumentCheck } from 'react-icons/hi2'
import TodoItem from '../molecules/todo-item'

type Props = {
    todos: {
        id: string;
        task: string;
        completed: boolean;
        time: string
    }[],

}

const Todos = (props: Props) => {
    return (
        <section>
            <div className="bg-[#F2F2F2] rounded-xl p-4 mt-4">
                <h1 className='flex items-center'>
                    <HiOutlineDocumentCheck className='mr-4 text-2xl' />
                    <span className='text-lg font-bold'>
                        To-do List
                    </span>


                </h1>
                {props.todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
            </div>
        </section>
    )
}

export default Todos;