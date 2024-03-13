const setCaretToEnd = (element: HTMLElement) => {
    const range = document.createRange();
    const selection = window.getSelection();
    if (selection) {
        range.selectNodeContents(element);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    element.focus();
};

export default setCaretToEnd;