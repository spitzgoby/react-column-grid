import { getDocument } from './browser';

const getStyleElement = (id: string) => getDocument()?.querySelector(`#${id}`);

const STYLE_ELEMENT_TAGS = ['LINK', 'STYLE'];
const findFirstStyleElement = () => {
    const headNodes = Array.from(getDocument().head.children);
    let firstStyleElement = null;    

    firstStyleElement = headNodes.find((node) => STYLE_ELEMENT_TAGS.includes(node.tagName)) || null;

    return firstStyleElement;
};

export const injectCss = (id: string, css: string) => {
    const doc = getDocument();    

    if (doc) {
        const firstStyleElement = findFirstStyleElement();
        let style = getStyleElement(id);

        if (!style) {
            style = doc.createElement('style');
            style.id = id
            style.setAttribute('type', 'text/css');
        }

        style.innerHTML = css;

        doc.head.insertBefore(style, firstStyleElement);
    } 
};

export const removeCss = (id: string) => {
    const doc = getDocument();    

    if (doc) {
        let style = getStyleElement(id);

        doc.removeChild(style);
    }
};