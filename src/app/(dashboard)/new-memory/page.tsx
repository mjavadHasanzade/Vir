"use client"
import { useEffect, useState } from "react";
import RichText from "~/components/organisms/rich-text";
import { api } from "~/trpc/react";
import { initialBlock } from "~/utils";

interface Block {
  id: string;
  html?: string;
  tag?: string;
  imageUrl?: string;
  ref?: HTMLElement | null
}
export default function NewMemory() {

  const newMemory = api.memory.create.useMutation({
    onSuccess: () => {
      console.log("Memory created successfully");

    }
  });
  const [blocks, setBlocks] = useState<Array<Block>>([initialBlock]);

  return (
    <div>
      <div className="flex mb-4">
        <button disabled={blocks.length <= 1} onClick={() => newMemory.mutate({ content: JSON.stringify(blocks), title: String(blocks[0]?.html) })}
          className="disabled:opacity-50 disabled:cursor-default bg-blue-400 px-4 py-2 cursor-pointer rounded-lg text-white hover:bg-blue-600 transition-all ease-in delay-300">Create</button>
      </div>
      <RichText blocks={blocks} setBlocks={(x: Block[]) => setBlocks(x)} />
    </div>
  );
}