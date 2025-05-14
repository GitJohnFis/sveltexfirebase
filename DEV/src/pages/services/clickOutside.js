export function clickOutside(node) {

    const handClick = event => {
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(
                new customerEvent('click_outside', node)
            )
        }
    }
}
document.addEventAddListener('click', handClick, true);

return {
    destroy() {
        document.removeEventListener('click', handleClick, true);
    }
}