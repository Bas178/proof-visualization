'use client'
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { useEffect, useState, useRef } from 'react';
import styles from './page.module.css'
import cytoscape from 'cytoscape';
import Editor from '@monaco-editor/react';
import { cytoscapeDummyElements, cytoscapeStackMain, cytoscapeStackPush, cytoscapeStackPop, cytoscapeStyles, cytoscapeStackStyles, sbgnStyleSheet } from './cytoscapeConfig';
import { defaultCode } from "./defaultCode";
//import sbgnStylesheet from 'cytoscape-sbgn-stylesheet';


export default function Home() {
    const cyRef = useRef(null);
    var sbgnStylesheet = require('cytoscape-sbgn-stylesheet');

    useEffect(() => {

        cyRef.current = cytoscape({
            container: document.getElementById('cy'),
            style: sbgnStyleSheet,
            elements: cytoscapeDummyElements,
        });

        cyRef.current.style(sbgnStylesheet);
        cyRef.current.layout({ name: 'cose' }).run();

        document.getElementById('node-selector').addEventListener('change', function (event) {
            var selectedOption = event.target.value;

            // Clear the current elements in the cytoscape instance
            cyRef.current.elements().remove();

            // Based on the selected option, add new nodes and edges
            if (selectedOption === 'main') {
                cyRef.current.add(cytoscapeStackMain);
                cyRef.current.style(sbgnStyleSheet);
                cyRef.current.layout({ name: 'cose' }).run(); // Apply the 'cose' layout to the elements  
            } else if (selectedOption === 'push') {
                cyRef.current.add(cytoscapeStackPush);
                cyRef.current.style(sbgnStyleSheet);
            } else if (selectedOption === 'pop') {
                cyRef.current.add(cytoscapeStackPop);
                cyRef.current.style(cytoscapeStackStyles);                
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
            <main className={styles.main}>
                <div className="row">
                     
                        <div id="editor" className={styles.editor} >
                            <Editor
                                defaultLanguage="c"
                                defaultValue={defaultCode}
                                theme="vs-dark"
                                onMount={handleEditorDidMount}
                            />
                        </div>
                    
                    
                    <div id="cy-container" className={styles.cyContainer} >
                        <select className={styles.nodeSelector} id="node-selector">
                            <option value="main">Main</option>
                            <option value="push">Push2(s,v1,v2)</option>
                            <option value="pop">Pop()</option>
                        </select>
                        <div className={styles.cy} id="cy" ref={cyRef}></div>
                    
                </div>
        </div>
        </main >
        </div >

    );
}
