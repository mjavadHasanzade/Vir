"use client"
import React, { useEffect, useState } from 'react';
import EditableBlock from './editable-block';
import { initialBlock, uid, setCaretToEnd } from '~/utils'; // assuming you have the required utility functions defined in a separate file

interface EditablePageProps { }

interface Block {
    id: string;
    html: string;
    tag: string;
}

const EditablePage: React.FC<EditablePageProps> = () => {
    const [blocks, setBlocks] = useState<Block[]>([initialBlock]);
    const [currentBlockActive, setCurrentBlockActive] = useState<Block | null>(null);

    const updatePageHandler = (updatedBlock: Block) => {
        const updatedBlocks = blocks.map((block) => {
            if (block.id === updatedBlock.id) {
                return {
                    ...block,
                    tag: updatedBlock.tag,
                    html: updatedBlock.html,
                };
            }
            return block;
        });
        setBlocks(updatedBlocks);
    };

    useEffect(() => {
        if (currentBlockActive) {
            currentBlockActive.ref.nextElementSibling.focus();
        }

    }, [currentBlockActive])


    const addBlockHandler = (currentBlock: Block) => {
        const newBlock: Block = { id: uid(), html: '', tag: 'p' };
        const index = blocks.findIndex((block) => block.id === currentBlock.id);
        console.log(index);

        const updatedBlocks = [...blocks];
        updatedBlocks.splice(index + 1, 0, newBlock);
        setBlocks(updatedBlocks);
        setCurrentBlockActive(currentBlock);

    };

    const deleteBlockHandler = (currentBlock: Block) => {

        const previousBlock = currentBlock.ref.previousElementSibling;
        if (previousBlock) {
            console.log(currentBlock);
            const index = blocks.findIndex((block) => block.id === currentBlock.id);
            const updatedBlocks = [...blocks];
            updatedBlocks.splice(index, 1);
            setBlocks(updatedBlocks);
            setCaretToEnd(previousBlock);
            previousBlock.focus();
        }
    };

    return (
        <div className="Page">
            {blocks.map((block, key) => (
                <EditableBlock
                    key={key}
                    id={block.id}
                    tag={block.tag}
                    html={block.html}
                    updatePage={updatePageHandler}
                    addBlock={addBlockHandler}
                    deleteBlock={deleteBlockHandler}
                />
            ))}
        </div>
    );
};

export default EditablePage;