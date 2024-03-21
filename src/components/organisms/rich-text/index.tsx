"use client"
import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import EditableBlock from "./editable-block";

import { setCaretToEnd, objectId, initialBlock } from "~/utils";
import usePrevious from "~/hooks/usePrevious";
import Notice from "./notice";

// A page is represented by an array containing several blocks
// [
//   {
//     _id: "5f54d75b114c6d176d7e9765",
//     html: "Heading",
//     tag: "h1",
//     imageUrl: "",
//   },
//   {
//     _id: "5f54d75b114c6d176d7e9766",
//     html: "I am a <strong>paragraph</strong>",
//     tag: "p",
//     imageUrl: "",
//   },
//     _id: "5f54d75b114c6d176d7e9767",
//     html: "/im",
//     tag: "img",
//     imageUrl: "images/test.png",
//   }
// ]

interface Block {
    _id: string;
    html?: string;
    tag?: string;
    imageUrl?: string;
    ref?: HTMLElement;
}

const EditablePage = () => {


    const [blocks, setBlocks] = useState<Array<Block>>([initialBlock]);
    const [currentBlockId, setCurrentBlockId] = useState<string>('');

    const prevBlocks = usePrevious(blocks);

    // Handling the cursor and focus on adding and deleting blocks
    useEffect(() => {
        // If a new block was added, move the caret to it
        if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
            const nextBlockPosition =
                blocks.map((b) => b._id).indexOf(currentBlockId) + 1 + 1;
            const nextBlock = document.querySelector<HTMLElement>(
                `[data-position="${nextBlockPosition}"]`
            );
            if (nextBlock) {
                nextBlock.focus();
            }
        }
        // If a block was deleted, move the caret to the end of the last block
        if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
            const lastBlockPosition = prevBlocks
                .map((b) => b._id)
                .indexOf(currentBlockId);
            const lastBlock = document.querySelector<HTMLElement>(
                `[data-position="${lastBlockPosition}"]`
            );
            if (lastBlock) {
                setCaretToEnd(lastBlock);
            }
        }
    }, [blocks, prevBlocks, currentBlockId]);

    const updateBlockHandler = (currentBlock: Block) => {
        const index = blocks.map((b) => b._id).indexOf(currentBlock._id);
        const oldBlock = blocks[index];
        const updatedBlocks = [...blocks];
        updatedBlocks[index] = {
            ...updatedBlocks[index],
            tag: currentBlock.tag ?? "undefined tag",
            html: currentBlock.html ?? "undefined Html",
            imageUrl: currentBlock.imageUrl ?? "undefined image",
            _id: currentBlock._id
        };
        setBlocks(updatedBlocks);
        // If the image has been changed, we have to delete the
        // old image file on the server
        if (oldBlock?.imageUrl && oldBlock.imageUrl !== currentBlock.imageUrl) {
            // deleteImageOnServer(oldBlock.imageUrl);
            console.log("deleteImageOnServer from updateBlockHandler")
        }
    };

    const addBlockHandler = (currentBlock: Block) => {
        console.log(currentBlock);

        setCurrentBlockId(currentBlock._id);
        const index = blocks.map((b) => b._id).indexOf(currentBlock._id);
        const updatedBlocks = [...blocks];
        const newBlock = { _id: objectId(), tag: "p" };
        updatedBlocks.splice(index + 1, 0, newBlock);
        updatedBlocks[index] = {
            ...updatedBlocks[index],
            tag: currentBlock.tag ,
            html: currentBlock.html ,
            imageUrl: currentBlock.imageUrl ,
            _id: currentBlock._id
        };
        setBlocks(updatedBlocks);
    };

    const deleteBlockHandler = (currentBlock: Block) => {
        if (blocks.length > 1) {
            setCurrentBlockId(currentBlock._id);
            const index = blocks.map((b) => b._id).indexOf(currentBlock._id);
            const deletedBlock = blocks[index];
            const updatedBlocks = [...blocks];
            updatedBlocks.splice(index, 1);
            setBlocks(updatedBlocks);
            // If the deleted block was an image block, we have to delete
            // the image file on the server
            if (deletedBlock?.tag === "img" && deletedBlock.imageUrl) {
                // deleteImageOnServer(deletedBlock.imageUrl);
                console.log("deleteImageOnServer from deletedBlock")
            }
        }
    };

    const onDragEndHandler = (result) => {
        console.log({ result });

        const { destination, source } = result;

        // If we don't have a destination (due to dropping outside the droppable)
        // or the destination hasn't changed, we change nothing
        if (!destination || destination.index === source.index) {
            return;
        }

        const updatedBlocks = [...blocks];
        const removedBlocks = updatedBlocks.splice(source.index - 1, 1);
        updatedBlocks.splice(destination.index - 1, 0, removedBlocks[0]);
        setBlocks(updatedBlocks);
    };

    const pageId = "5f54d75b114c6d176d7e9767"

    return (
        <>
            {/* {true && (
                <Notice status="ERROR" dismissible>
                    <h4>Hey 👋 You just created a public page.</h4>
                    <p>It will be automatically deleted after 24 hours.</p>
                </Notice>
            )} */}
            {/* <DragDropContext onDragEnd={onDragEndHandler}>
                <Droppable droppableId={pageId}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}> */}
            {blocks.map((block) => {
                const position =
                    blocks.map((b) => b._id).indexOf(block._id) + 1;
                return (
                    <EditableBlock
                        key={block._id}
                        position={position}
                        id={block._id}
                        tag={block.tag}
                        html={block.html}
                        imageUrl={block.imageUrl}
                        pageId={pageId}
                        addBlock={addBlockHandler}
                        deleteBlock={deleteBlockHandler}
                        updatePage={updateBlockHandler}
                    />
                );
            })}
            {/* {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext> */}
        </>
    );
};

export default EditablePage;
