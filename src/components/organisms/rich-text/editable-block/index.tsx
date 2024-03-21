import React, { type ChangeEvent, type FocusEvent, type KeyboardEvent, type MouseEvent, type RefObject } from "react";
import { Draggable } from "react-beautiful-dnd";
import styles from "./styles.module.scss";
import TagSelectorMenu from "../tagSelectorMenu";
import ActionMenu from "../actionMenu";
import DragHandleIcon from "~/images/draggable.svg";
import { setCaretToEnd, getCaretCoordinates, getSelection } from "~/utils";
import ContentEditable from "react-contenteditable";

const CMD_KEY = "/";

interface EditableBlockProps {
    id: string;
    position: number;
    html: string;
    tag: string;
    imageUrl: string;
    pageId: string;
    updateBlock: (block: Block) => void;
    deleteBlock: (block: Block) => void;
    addBlock: (block: Block) => void;
}

interface EditableBlockState {
    htmlBackup: string | null;
    html: string;
    tag: string;
    imageUrl: string;
    placeholder: boolean;
    previousKey: string | null;
    isTyping: boolean;
    tagSelectorMenuOpen: boolean;
    tagSelectorMenuPosition: { x: number | null; y: number | null };
    actionMenuOpen: boolean;
    actionMenuPosition: { x: number | null; y: number | null };
}

interface Block {
    id: string;
    html: string;
    tag: string;
    imageUrl: string;
}

class EditableBlock extends React.Component<EditableBlockProps, EditableBlockState> {
    private contentEditable: RefObject<HTMLElement>;
    private fileInput: HTMLInputElement | null;

    constructor(props: EditableBlockProps) {
        super(props);
        this.contentEditable = React.createRef();
        this.fileInput = null;
        this.handleTagSelection = this.handleTagSelection.bind(this);
        this.closeActionMenu = this.closeActionMenu.bind(this);
        this.state = {
            htmlBackup: null,
            html: "",
            tag: "p",
            imageUrl: "",
            placeholder: false,
            previousKey: null,
            isTyping: false,
            tagSelectorMenuOpen: false,
            tagSelectorMenuPosition: {
                x: null,
                y: null,
            },
            actionMenuOpen: false,
            actionMenuPosition: {
                x: null,
                y: null,
            },
        };
    }

    componentDidMount() {
        const hasPlaceholder = this.addPlaceholder({
            block: this.contentEditable.current,
            position: this.props.position,
            content: this.props.html || this.props.imageUrl,
        });
        if (!hasPlaceholder) {
            this.setState({
                ...this.state,
                html: this.props.html,
                tag: this.props.tag,
                imageUrl: this.props.imageUrl,
            });
        }
    }

    componentDidUpdate(prevProps: EditableBlockProps, prevState: EditableBlockState) {
        const stoppedTyping = prevState.isTyping && !this.state.isTyping;
        const hasNoPlaceholder = !this.state.placeholder;
        const htmlChanged = this.props.html !== this.state.html;
        const tagChanged = this.props.tag !== this.state.tag;
        const imageChanged = this.props.imageUrl !== this.state.imageUrl;
        if (
            ((stoppedTyping && htmlChanged) || tagChanged || imageChanged) &&
            hasNoPlaceholder
        ) {
            this.props.updateBlock({
                id: this.props.id,
                html: this.state.html,
                tag: this.state.tag,
                imageUrl: this.state.imageUrl,
            });
        }
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.closeActionMenu, false);
    }

    handleChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ ...this.state, html: e.target.value });
    }

    handleFocus() {
        if (this.state.placeholder) {
            this.setState({
                ...this.state,
                html: "",
                placeholder: false,
                isTyping: true,
            });
        } else {
            this.setState({ ...this.state, isTyping: true });
        }
    }

    handleBlur(e: FocusEvent<HTMLInputElement>) {
        const hasPlaceholder = this.addPlaceholder({
            block: this.contentEditable.current,
            position: this.props.position,
            content: this.state.html || this.state.imageUrl,
        });
        if (!hasPlaceholder) {
            this.setState({ ...this.state, isTyping: false });
        }
    }

    handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === CMD_KEY) {
            this.setState({ htmlBackup: this.state.html });
        } else if (e.key === "Backspace" && !this.state.html) {
            this.props.deleteBlock({ id: this.props.id });
        } else if (
            e.key === "Enter" &&
            this.state.previousKey !== "Shift" &&
            !this.state.tagSelectorMenuOpen
        ) {
            e.preventDefault();
            this.props.addBlock({
                id: this.props.id,
                html: this.state.html,
                tag: this.state.tag,
                imageUrl: this.state.imageUrl,
                ref: this.contentEditable.current,
            });
        }
        this.setState({ previousKey: e.key });
    }

    handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === CMD_KEY) {
            this.openTagSelectorMenu("KEY_CMD");
        }
    }

    handleMouseUp() {
        const block = this.contentEditable.current;
        const { selectionStart, selectionEnd } = getSelection(block);
        if (selectionStart !== selectionEnd) {
            this.openActionMenu(block, "TEXT_SELECTION");
        }
    }

    handleDragHandleClick(e: MouseEvent<HTMLSpanElement>) {
        const dragHandle = e.target as HTMLElement;
        this.openActionMenu(dragHandle, "DRAG_HANDLE_CLICK");
    }

    openActionMenu(parent: HTMLElement, trigger: string) {
        const { x, y } = this.calculateActionMenuPosition(parent, trigger);
        this.setState({
            ...this.state,
            actionMenuPosition: { x: x, y: y },
            actionMenuOpen: true,
        });
        setTimeout(() => {
            document.addEventListener("click", this.closeActionMenu, false);
        }, 100);
    }

    closeActionMenu() {
        this.setState({
            ...this.state,
            actionMenuPosition: { x: null, y: null },
            actionMenuOpen: false,
        });
        document.removeEventListener("click", this.closeActionMenu, false);
    }

    openTagSelectorMenu(trigger: string) {
        const { x, y } = this.calculateTagSelectorMenuPosition(trigger);
        this.setState({
            ...this.state,
            tagSelectorMenuPosition: { x: x, y: y },
            tagSelectorMenuOpen: true,
        });
        document.addEventListener("click", this.closeTagSelectorMenu, false);
    }

    closeTagSelectorMenu() {
        this.setState({
            ...this.state,
            htmlBackup: null,
            tagSelectorMenuPosition: { x: null, y: null },
            tagSelectorMenuOpen: false,
        });
        document.removeEventListener("click", this.closeTagSelectorMenu, false);
    }

    handleTagSelection(tag: string) {
        if (tag === "img") {
            console.log(this);

            this.setState({ ...this.state, tag: tag }, () => {
                this.closeTagSelectorMenu();
                if (this.fileInput) {
                    this.fileInput.click();
                }
                this.props.addBlock({
                    id: this.props.id,
                    html: "",
                    tag: "p",
                    imageUrl: "",
                    ref: this.contentEditable.current,
                });
            });
        } else {
            if (this.state.isTyping) {
                this.setState({ tag: tag, html: this.state.htmlBackup }, () => {
                    setCaretToEnd(this.contentEditable.current);
                    this.closeTagSelectorMenu();
                });
            } else {
                this.setState({ ...this.state, tag: tag }, () => {
                    this.closeTagSelectorMenu();
                });
            }
        }
    }

    async handleImageUpload() {
        if (this.fileInput && this.fileInput.files[0]) {
            const pageId = this.props.pageId;
            const imageFile = this.fileInput.files[0];
            const formData = new FormData();
            formData.append("image", imageFile);
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API}/pages/images?pageId=${pageId}`,
                    {
                        method: "POST",
                        credentials: "include",
                        body: formData,
                    }
                );
                const data = await response.json();
                const imageUrl = data.imageUrl;
                this.setState({ ...this.state, imageUrl: imageUrl });
            } catch (err) {
                console.log(err);
            }
        }
    }

    addPlaceholder({ block, position, content }: { block: HTMLElement; position: number; content: string }) {
        const isFirstBlockWithoutHtml = position === 1 && !content;
        const isFirstBlockWithoutSibling = !block.parentElement.nextElementSibling;
        if (isFirstBlockWithoutHtml && isFirstBlockWithoutSibling) {
            this.setState({
                ...this.state,
                html: "Type a page title...",
                tag: "h1",
                imageUrl: "",
                placeholder: true,
                isTyping: false,
            });
            return true;
        } else {
            return false;
        }
    }

    calculateActionMenuPosition(parent: HTMLElement, initiator: string) {
        switch (initiator) {
            case "TEXT_SELECTION":
                const { x: endX, y: endY } = getCaretCoordinates(false);
                const { x: startX, y: startY } = getCaretCoordinates(true);
                const middleX = startX + (endX - startX) / 2;
                return { x: middleX, y: startY };
            case "DRAG_HANDLE_CLICK":
                const x = parent.offsetLeft - parent.scrollLeft + parent.clientLeft - 90;
                const y = parent.offsetTop - parent.scrollTop + parent.clientTop + 35;
                return { x: x, y: y };
            default:
                return { x: null, y: null };
        }
    }

    calculateTagSelectorMenuPosition(initiator: string) {
        switch (initiator) {
            case "KEY_CMD":
                const { x: caretLeft, y: caretTop } = getCaretCoordinates(true);
                return { x: caretLeft, y: caretTop };
            case "ACTION_MENU":
                const { x: actionX, y: actionY } = this.state.actionMenuPosition;
                return { x: actionX - 40, y: actionY };
            default:
                return { x: null, y: null };
        }
    }

    render() {
        return (
            <>
                {this.state.tagSelectorMenuOpen && (
                    <TagSelectorMenu
                        position={this.state.tagSelectorMenuPosition}
                        closeMenu={this.closeTagSelectorMenu}
                        handleSelection={this.handleTagSelection}
                    />
                )}
                {this.state.actionMenuOpen && (
                    <ActionMenu
                        position={this.state.actionMenuPosition}
                        actions={{
                            deleteBlock: () => this.props.deleteBlock({ id: this.props.id }),
                            turnInto: () => this.openTagSelectorMenu("ACTION_MENU"),
                        }}
                    />
                )}
                <Draggable key={this.props.id} draggableId={this.props.id} index={this.props.position}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            className={styles.draggable}
                            {...provided.draggableProps}
                        >
                            {this.state.tag !== "img" && (
                                <ContentEditable
                                    innerRef={this.contentEditable}
                                    data-position={this.props.position}
                                    data-tag={this.state.tag}
                                    html={this.state.html}
                                    onChange={(e) => this.handleChange(e)}
                                    onFocus={() => this.handleFocus()}
                                    onBlur={(e) => this.handleBlur(e)}
                                    onKeyDown={(e) => this.handleKeyDown(e)}
                                    onKeyUp={(e) => this.handleKeyUp(e)}
                                    onMouseUp={() => this.handleMouseUp()}
                                    tagName={this.state.tag}
                                    className={[
                                        styles.block,
                                        this.state.isTyping ||
                                            this.state.actionMenuOpen ||
                                            this.state.tagSelectorMenuOpen
                                            ? styles.blockSelected
                                            : null,
                                        this.state.placeholder ? styles.placeholder : null,
                                        snapshot.isDragging ? styles.isDragging : null,
                                    ].join(" ")}
                                />
                            )}
                            {this.state.tag === "img" && (
                                <div
                                    data-position={this.props.position}
                                    data-tag={this.state.tag}
                                    ref={this.contentEditable}
                                    className={[
                                        styles.image,
                                        this.state.actionMenuOpen || this.state.tagSelectorMenuOpen
                                            ? styles.blockSelected
                                            : null,
                                    ].join(" ")}
                                >
                                    <input
                                        id={`${this.props.id}_fileInput`}
                                        name={this.state.tag}
                                        type="file"
                                        onChange={() => this.handleImageUpload()}
                                        ref={(ref) => (this.fileInput = ref)}
                                        hidden
                                    />
                                    {!this.state.imageUrl && (
                                        <label
                                            htmlFor={`${this.props.id}_fileInput`}
                                            className={styles.fileInputLabel}
                                        >
                                            No Image Selected. Click To Select.
                                        </label>
                                    )}
                                    {this.state.imageUrl && (
                                        <img
                                            src={
                                                process.env.NEXT_PUBLIC_API + "/" + this.state.imageUrl
                                            }
                                            alt={/[^\/]+(?=\.[^\/.]*$)/.exec(this.state.imageUrl)[0]}
                                        />
                                    )}
                                </div>
                            )}
                            <span
                                role="button"
                                tabIndex={0}
                                className={styles.dragHandle}
                                onClick={(e) => this.handleDragHandleClick(e)}
                                {...provided.dragHandleProps}
                            >
                                <img src={DragHandleIcon.src} alt="Icon" />
                            </span>
                        </div>
                    )}
                </Draggable>
            </>
        );
    }
}

export default EditableBlock;


