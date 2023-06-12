'use client'
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './page.module.css'

import Editor from '@monaco-editor/react';

import { defaultCode } from '@/util/defaultCode';

import initialNodes, {  rfStackMain, rfCreateStack, rfCreateNode, rfStackDispose, rfStackPush, rfStackPop } from '@/util/rfNodes'
import initialEdges, { rfEdgesStackDispose, rfEdgesStackPop, rfEdgesStackPush } from '@/util/rfEdges'
import { rfEdgesStackMain, rfEdgesCreateStack, rfEdgesCreateNode } from "@/util/rfEdges";

const rfStyle = {
  backgroundColor: '#eeeeee',
};

export default function Reactflow() {

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const [selectedNode, setSelectedNode] = useState("main");
  const [selectedEdges, setSelectedEdges] = useState("main");

  const nodeConfigurations = {
    "main": rfStackMain,
    "createStack": rfCreateStack,
    "createNode": rfCreateNode,
    "push": rfStackPush,
    "pop": rfStackPop,
    "dispose": rfStackDispose,
    // usw.
  };

  const edgeConfigurations = {
    "main": rfEdgesStackMain,
    "createStack": rfEdgesCreateStack,
    "createNode": rfEdgesCreateNode,
    "push": rfEdgesStackPush,
    "pop": rfEdgesStackPop,
    "dispose": rfEdgesStackDispose,
    // usw.
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const handleFunctionSelect = (e) => {
    setSelectedNode(e.target.value);
    setSelectedEdges(e.target.value);
  };

  useEffect(() => {
    const newNodes = getNodesForSelection(selectedNode); // Implement this function
    setNodes(newNodes);
    const newEdges = getEdgesForSelection(selectedNode); // Implement this function
    setEdges(newEdges);
  }, [selectedNode, selectedEdges]);

  function handleEditorDidMount(editor, monaco) {
    editor.onDidChangeModelContent(() => {
      const code = editor.getValue();
      // Use the Langium parser here to generate the AST from the code
      // Then update the Cytoscape canvas with the new AST data
    });
  }

  function getNodesForSelection(selection) {
    return nodeConfigurations[selection] || [];
  }

  function getEdgesForSelection(selection) {
    return edgeConfigurations[selection] || [];
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

      <div className={styles.runButtonContainer}>
        <button className={styles.runButton}>Run</button>
      </div>

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


          <div id="rf-container" className={styles.rfContainer} >
            <select className={styles.nodeSelector} id="node-selector" onChange={handleFunctionSelect}>
              <option value="main">main</option>
              <option value="createStack">createStack()</option>
              <option value="createNode">createNode()</option>
              <option value="push">push(s,v)</option>
              <option value="pop">pop(s)</option>
              <option value="dispose">dispose(s)</option>
            </select>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              style={rfStyle}
              attributionPosition="top-right"
            >
             {/* <MiniMap /> */ }
              <Controls/>
              <Background />
            </ReactFlow>

          </div>
        </div>
      </main >
    </div >
  )
}
