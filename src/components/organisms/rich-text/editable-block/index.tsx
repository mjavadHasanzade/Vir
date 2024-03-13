"use client"
import React, { useRef, useEffect, useState } from 'react';
import ContentEditable, { type ContentEditableEvent } from 'react-contenteditable';
import SelectMenu from '../select-menu';
import getCaretCoordinates from '~/utils/getCaretCoordinates';
import { setCaretToEnd } from '~/utils';

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


    const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);
    const [selectMenuPosition, setSelectMenuPosition] = useState<{ x: number | null, y: number | null }>({ x: null, y: null });

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

    const openSelectMenuHandler = () => {
        const { x, y } = getCaretCoordinates();
        setSelectMenuIsOpen(true);
        setSelectMenuPosition({ x, y });
        document.addEventListener('click', closeSelectMenuHandler);
    };

    const closeSelectMenuHandler = () => {
        setHtml("");
        setSelectMenuIsOpen(false);
        setSelectMenuPosition({ x: null, y: null });
        document.removeEventListener('click', closeSelectMenuHandler);
    };

    const tagSelectionHandler = (tag: string) => {
        setTag(tag);
        setHtml(html);
        setCaretToEnd(contentEditable.current);
        closeSelectMenuHandler();
    };

    const onKeyUpHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === '/') {
            openSelectMenuHandler();
        }
    }

    return (
        <>
            {selectMenuIsOpen && (
                <SelectMenu
                    position={selectMenuPosition}
                    onSelect={tagSelectionHandler}
                    close={closeSelectMenuHandler}
                />
            )}
            <ContentEditable
                className="editable-block"
                innerRef={contentEditable}
                html={html}
                tagName={tag}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownHandler}
                onKeyUp={onKeyUpHandler}
            />
        </>
    );
}
export default EditableBlock;