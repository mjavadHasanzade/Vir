import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import AllMemories from "~/components/organisms/all-memories";
import Draft from "~/components/organisms/draft";

import { api } from "~/trpc/server";


const MEMOS = [
  {
    title: "Salsile project brief",
    description: "No, going all perfect! Let me show you images of the project",
    content: "Salsile Inc.is a well- established fashion retailer specializing in high - quality clothing and accessories for men and women.The client is looking to revamp their existing e - commerce website to enhance user experience, improve overall aesthetics, and increase online sales.The new design should reflect their brand identity as a modern, and customer - centric fashion store.",
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
          <AllMemories memories={MEMOS} />
        </div>
        <div className="w-1/2">
          <Draft title={MEMOS[0]!.title} cover={MEMOS[0]!.cover} content={MEMOS[0]!.content} mode={MEMOS[0]!.mode} />
        </div>
      </div>
    </div>
  );
}