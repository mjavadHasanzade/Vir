"use client"
import React, { useRef, useEffect, useState } from 'react';
import ContentEditable, { type ContentEditableEvent } from 'react-contenteditable';

interface Block {
    id: string;
    html: string;
    tag: string;
}

interface EditableBlockProps {
    id: string;
    html: string;
    tag: string;
    updatePage: (data: { id: string; html: string; tag: string }) => void;
    addBlock: (currentBlock: Block) => void;
    deleteBlock: (currentBlock: Block) => void;
}

function EditableBlock(props: EditableBlockProps) {
    const [html, setHtml] = useState<string>(props.html);
    const [tag, setTag] = useState<string>(props.tag);
    const [htmlBackup, setHtmlBackup] = useState('');
    const [previousKey, setPreviousKey] = useState('');
    const contentEditable = useRef<any>(undefined);

    // useEffect(() => {
    //     setHtml(props.html);
    //     setTag(props.tag);
    // }, [props.html, props.tag]);

    // useEffect(() => {
    //     console.log({ html }, props.html);
    // }, [html]);

    useEffect(() => {
        const htmlChanged = props.html !== html;
        const tagChanged = props.tag !== tag;

        if (htmlChanged || tagChanged) {
            props.updatePage({
                id: props.id,
                html: String(html),
                tag: tag,
            });
        }
    }, [html, tag, props]);

    const onChangeHandler = (e: ContentEditableEvent) => {
        setHtml(e.target.value);
    };

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        setHtml((prevHtml) => {

            if (e.key === '/') {
                setHtmlBackup(prevHtml);
            }
            if (e.key === 'Enter') {
                if (previousKey !== 'Shift') {
                    e.preventDefault();
                    props.addBlock({
                        id: props.id,
                        ref: contentEditable.current,
                    });
                }
            }
            if (e.key === 'Backspace' && prevHtml.length <= 0) {
                console.log(prevHtml.length, e.key);

                e.preventDefault();
                props.deleteBlock({
                    id: props.id,
                    ref: contentEditable.current,
                });
            }
            setPreviousKey(e.key);
            return prevHtml;
        });
    };

    return (
        <ContentEditable
            className="Block"
            innerRef={contentEditable}
            html={html}
            tagName="div"
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandler}
        />
    );
}
export default EditableBlock;