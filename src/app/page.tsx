import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import AllMemories from "~/components/organisms/all-memories";
import Draft from "~/components/organisms/draft";

import { api } from "~/trpc/server";


const MEMOS = [
  {
      title: "Salsile project brief",
      description: "No, going all perfect! Let me show you images of the project",
      cover: "/images/1.jpg",
      score: 5,
      mode: "😍"
  }, {
      title: "A Good Day at new york",
      description: "No, going all perfect! Let me show you images of the project",
      cover: "/images/2.jpg",
      score: 3,
      mode: "😊"
  }, {
      title: "Sad moments",
      description: "No, going all perfect! Let me show you images of the project",
      cover: "/images/3.jpg",
      score: 2,
      mode: "😐"
  }
]

export default async function Home() {
  noStore();
  const hello = await api.memory.hello.query({ text: "from tRPC" });

  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className="w-1/2 pr-4">
          <AllMemories />
        </div>
        <div className="w-1/2">
          <Draft />
        </div>
      </div>
    </div>
  );
}

async function CrudShowcase() {
  const latestPost = await api.memory.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.title}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      {/* <CreatePost /> */}
    </div>
  );
}
