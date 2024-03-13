import React, { useEffect, useState } from 'react';
import { matchSorter } from 'match-sorter';

const MENU_HEIGHT = 120;
const allowedTags = [
    {
        id: 'page-title',
        tag: 'h1',
        label: 'Page Title',
    },
    {
        id: 'heading',
        tag: 'h2',
        label: 'Heading',
    },
    {
        id: 'subheading',
        tag: 'h3',
        label: 'Subheading',
    },
    {
        id: 'paragraph',
        tag: 'p',
        label: 'Paragraph',
    },
];

interface SelectMenuProps {
    position: { x: number; y: number };
    onSelect: (tag: string) => void;
    close: () => void;
}

const SelectMenu: React.FC<SelectMenuProps> = ({
    position,
    onSelect,
    close,
}) => {
    const [command, setCommand] = useState('');
    const [items, setItems] = useState(allowedTags);
    const [selectedItem, setSelectedItem] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const selected = selectedItem;
            const updatedCommand = command + e.key;

            switch (e.key) {
                case 'Enter':
                    e.preventDefault();
                    onSelect(items[selected].tag);
                    break;
                case 'Backspace':
                    if (!command) close();
                    setCommand(command.substring(0, command.length - 1));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    const prevSelected = selected === 0 ? items.length - 1 : selected - 1;
                    setSelectedItem(prevSelected);
                    break;
                case 'ArrowDown':
                case 'Tab':
                    e.preventDefault();
                    const nextSelected = selected === items.length - 1 ? 0 : selected + 1;
                    setSelectedItem(nextSelected);
                    break;
                default:
                    setCommand(updatedCommand);
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [command, items, selectedItem, onSelect, close]);

    useEffect(() => {
        const updatedItems = matchSorter(allowedTags, command, { keys: ['tag'] });
        setItems(updatedItems);
    }, [command]);

    const x = position.x;
    const y = position.y - MENU_HEIGHT;
    const positionAttributes = { top: y, left: x };

    return (
        <div className="SelectMenu" style={positionAttributes}>
            <div className="items">
                {items.map((item, key) => {
                    const isSelected = items.indexOf(item) === selectedItem;
                    return (
                        <div
                            className={isSelected ? 'Selected menu-item' : ' menu-item'}
                            key={key}
                            role="button"
                            tabIndex={0}
                            onClick={() => onSelect(item.tag)}
                        >
                            {item.label}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SelectMenu;