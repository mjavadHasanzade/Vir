import { unstable_noStore as noStore } from "next/cache";
import AllMemories from "~/components/organisms/all-memories";
import Draft from "~/components/organisms/draft";
import Todos from "~/components/organisms/todos";
import { api } from "~/trpc/server";

const TodoList = [
  { id: "1", task: "Buy groceries", completed: false, time: "10:30 AM" },
  { id: "2", task: "Do laundry", completed: true, time: "10:30 AM" },
  { id: "3", task: "Pay bills", completed: false, time: "10:30 AM" }
];

export default async function Home() {
  noStore();
  const { count, memories } = await api.memory.getLatest.query();
  const lastDraft = await api.memory.getLastDraft.query();


  if (count === 0)
    await api.memory.seed.query();


  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className="w-1/2 pr-4">
          <AllMemories memories={memories} count={count} />
        </div>
        <div className="w-1/2">
          {lastDraft &&
            <Draft title={lastDraft.title} cover={lastDraft.cover} content={lastDraft.content} mode={lastDraft.mode} />
          }
          <Todos todos={TodoList} />
        </div>
      </div>
    </div>
  );
}
