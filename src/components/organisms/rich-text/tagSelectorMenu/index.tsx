import { useState, useEffect } from "react";
import { matchSorter } from "match-sorter";
import styles from "./styles.module.scss";

type Tag = {
  id: string;
  tag: string;
  label: string;
};

type Position = {
  x: number;
  y: number;
};

interface TagSelectorMenuProps {
  position: Position;
  closeMenu: () => void;
  handleSelection: (tag?: string) => void;
}

const MENU_HEIGHT = 150;

const allowedTags: Tag[] = [
  {
    id: "page-title",
    tag: "h1",
    label: "Page Title",
  },
  {
    id: "heading",
    tag: "h2",
    label: "Heading",
  },
  {
    id: "subheading",
    tag: "h3",
    label: "Subheading",
  },
  {
    id: "paragraph",
    tag: "p",
    label: "Paragraph",
  },
  {
    id: "image",
    tag: "img",
    label: "Image",
  },
];

const TagSelectorMenu: React.FC<TagSelectorMenuProps> = ({ position, closeMenu, handleSelection }) => {
  const [tagList, setTagList] = useState<Tag[]>(allowedTags);
  const [selectedTag, setSelectedTag] = useState<number>(0);
  const [command, setCommand] = useState<string>("");

  const isMenuOutsideOfTopViewport = position.y - MENU_HEIGHT < 0;
  const y = !isMenuOutsideOfTopViewport
    ? position.y - MENU_HEIGHT
    : position.y + MENU_HEIGHT / 3;
  const x = position.x;

  useEffect(() => {
    setTagList(matchSorter(allowedTags, command, { keys: ["tag"] }));
  }, [command]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSelection(tagList[selectedTag]?.tag);
      } else if (e.key === "Tab" || e.key === "ArrowDown") {
        e.preventDefault();
        const newSelectedTag = selectedTag === tagList.length - 1 ? 0 : selectedTag + 1;
        setSelectedTag(newSelectedTag);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const newSelectedTag = selectedTag === 0 ? tagList.length - 1 : selectedTag - 1;
        setSelectedTag(newSelectedTag);
      } else if (e.key === "Backspace") {
        if (command) {
          setCommand(command.slice(0, -1));
        } else {
          closeMenu();
        }
      } else {
        setCommand(command + e.key);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [tagList, selectedTag, command, closeMenu, handleSelection]);

  return (
    <div
      className={styles.menuWrapper}
      style={{
        top: y,
        left: x,
        justifyContent: !isMenuOutsideOfTopViewport ? "flex-end" : "flex-start",
      }}
    >
      <div className={styles.menu}>
        {tagList.map((tag, key) => (
          <div
            key={key}
            data-tag={tag.tag}
            className={tagList.indexOf(tag) === selectedTag ? [styles.item, styles.selectedTag].join(" ") : styles.item}
            role="button"
            tabIndex={0}
            onClick={() => handleSelection(tag.tag)}
          >
            {tag.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelectorMenu;


