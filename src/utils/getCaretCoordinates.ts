const getCaretCoordinates = (fromStart = true): { x: number; y: number } => {
    let x = 0;
    let y = 0;
    const selection = window.getSelection();
    if (selection && selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0).cloneRange();
        range.collapse(fromStart ? true : false);
        const rect = range.getClientRects()[0];
        if (rect) {
            x = rect.left;
            y = rect.top;
        }
    }
    return { x, y };
};

export default getCaretCoordinates;