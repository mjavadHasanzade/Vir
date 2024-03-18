const getCaretCoordinates = (): { x: number; y: number } => {
    let x: number;
    let y: number;
    const selection = window.getSelection();
    if (selection && selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0).cloneRange();
        range.collapse(false);
        const rect = range.getClientRects()[0];
        if (rect) {
            x = rect.left;
            y = rect.top;
        }
    }
    return { x, y };
};

export default getCaretCoordinates;