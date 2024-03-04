import { MdSort } from 'react-icons/md'
import { RxFileText } from 'react-icons/rx'
import MemoryCard from '../molecules/memory-card'

type Props = {}

const AllMemories = (props: Props) => {
    return (
        <section>
            <div className="bg-white rounded-xl p-4">
                <h1 className='flex items-center'>
                    <RxFileText className='mr-4 text-2xl' />
                    <span className='text-lg font-bold'>
                        All Memories
                    </span>

                </h1>
                <div className="my-6 flex items-center justify-between">
                    <button className='text-[#8FA5FF]'>124 Memory</button>
                    <button> <MdSort className='text-lg' /> </button>

                </div>

                <div className="">
                    {MEMOS.map(item =>
                        <MemoryCard mode={item.mode} score={item.score} key={item.title} cover={item.cover} description={item.description} title={item.title} />
                    )}

                </div>
            </div>
        </section>
    )
}

export default AllMemories