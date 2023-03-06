import PropTypes from "prop-types";
import React, { useState } from "react";
import ReactSyntaxHighlighter from "react-syntax-highlighter";

import "./SourceCodeBlock.scss";

export const SourceCodeBlock = ({ sourceCode }) => {
    const [expanded, setExpanded] = useState(true);

    const getShowButtonProps = () => ({
        className: "source-code-block--show-button",
        onClick: () => {
            setExpanded(!expanded);
        },
    });

    const getSyntaxHighlighterProps = () => ({
        codeTagProps: {
            className: "source-code-block--code",
        },
        customStyle: {
            backgroundColor: "transparent",
            margin: "1em 0 0 0",
            padding: 0,
        },
        language: "jsx",
    });

    return (
        <div className="source-code-block">
            {expanded && (
                <ReactSyntaxHighlighter {...getSyntaxHighlighterProps()}>
                    {sourceCode}
                </ReactSyntaxHighlighter>
            )}
            <button {...getShowButtonProps()}>
                {expanded ? "Hide Source Code" : "Show Source Code"}
            </button>
        </div>
    );
};

SourceCodeBlock.propTypes = {
    sourceCode: PropTypes.string,
};

export default SourceCodeBlock;
