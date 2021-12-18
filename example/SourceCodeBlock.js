import React, { useState } from 'react';
import ReactSyntaxHighlighter from 'react-syntax-highlighter';

import "./SourceCodeBlock.scss";

export default ({ sourceCode }) => {
    const [expanded, setExpanded] = useState(false);

    const getShowButtonProps = () => ({
        className: 'source-code-block--show-button',
        onClick: () => { setExpanded(!expanded) }
    });

    const getSyntaxHighlighterProps = () => ({
        codeTagProps: { 
            className: 'source-code-block--code'
        },
        customStyle: {
            backgroundColor: 'transparent',
            margin: '1em 0 0 0',
            padding: 0
        },
        language: 'jsx'
    });

    return (
        <div className="source-code-block">
            <button {...getShowButtonProps()}>{
                expanded ? "Hide Source Code" : "Show Source Code" }
            </button>
            {expanded &&
                <ReactSyntaxHighlighter {...getSyntaxHighlighterProps()}>
                    {sourceCode}
                </ReactSyntaxHighlighter>
            }
        </div>
    )
};