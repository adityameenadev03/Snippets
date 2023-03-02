import React, { useState } from "react";
import Prism from "prismjs";


function Beautify({code}) {

    const highlightedCode = Prism.highlight(code, Prism.languages.javascript, 'javascript');

    return (
        <div className="wrapper">
            <div className="beautify code" >
                <div className="dots">
                <div className="dot"></div>
               <div className="dot"></div>
               <div className="dot"></div>
                </div>
            

                    <pre className="line-numbers">
                        <code
                            className="language-javascript"
                            dangerouslySetInnerHTML={{ __html: highlightedCode }}
                        />
                    </pre>
            </div>
        </div>


    );
}

export default Beautify;
