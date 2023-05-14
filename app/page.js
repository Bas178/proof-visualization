import { useEffect, useRef } from 'react';
import styles from './page.module.css'
import cytoscape from 'cytoscape';
import Editor from '@monaco-editor/react';
import { cytoscapeDummyElements, cytoscapeStackMain, cytoscapeStackPush, cytoscapeStackPop, cytoscapeStyles, cytoscapeStackStyles } from './cytoscapeConfig';


export default function Home() {
    const [defaultValue, setDefaultValue] = useState("");
    const cyRef = useRef(null);

    useEffect(() => {
        fetch('app/defaultCode.txt')
            .then(response => response.text())
            .then(text => {
                setDefaultValue(text);
            });

        cyRef.current = cytoscape({
            container: document.getElementById('cy'),
            style: cytoscapeStyles,
            elements: cytoscapeDummyElements,
        });

        cyRef.current.style(cytoscapeStyles);
        cyRef.current.layout({ name: 'cose' }).run();

        document.getElementById('node-selector').addEventListener('change', function (event) {
            var selectedOption = event.target.value;

            // Clear the current elements in the cytoscape instance
            cy.elements().remove();

            // Based on the selected option, add new nodes and edges
            if (selectedOption === 'main') {
                cy.add(cytoscapeStackMain);
                cy.style(cytoscapeStyles);
                cy.layout({ name: 'cose' }).run(); // Apply the 'cose' layout to the elements  
            } else if (selectedOption === 'push') {
                cy.add(cytoscapeStackPush);
                cy.style(cytoscapeStackStyles);
            } else if (selectedOption === 'pop') {
                cy.add(cytoscapeStackPop);
                cy.style(cytoscapeStackStyles);
            }

            // ... und so weiter für jede Option
        });
    }, []);

    function handleEditorDidMount(editor, monaco) {
        editor.onDidChangeModelContent(() => {
            const code = editor.getValue();
            // Use the Langium parser here to generate the AST from the code
            // Then update the Cytoscape canvas with the new AST data
        });
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">ProofVisualization</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Documentation</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Showcase</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Playground</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">GitLab</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="container-fluid"></div>
            <div id="main" className="row">
                <Editor
                    height="90vh"
                    defaultLanguage="c"
                    defaultValue={defaultValue}
                    theme="vs-dark"
                    onMount={handleEditorDidMount}
                />
                <div id="cy-container">
                    <select id="node-selector">
                        <option value="main">Main</option>
                        <option value="push">Push2(s,v1,v2)</option>
                        <option value="pop">Pop()</option>
                    </select>
                    <div id="cy" ref={cyContainer}></div>
                </div>
            </div>
        </div>

    );
}
