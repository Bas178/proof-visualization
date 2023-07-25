'use client'
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { Tab, Nav } from 'react-bootstrap';
import { useEffect, useState, useRef, useCallback } from 'react';
import styles from './page.module.css'
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, MarkerType, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';

import { defaultCode } from '@/util/defaultCode';
import FloatingEdge from '@/util/floatingEdge';

import initialNodes, { rfStackMain, rfCreateStack, rfCreateNode, rfStackDispose, rfStackPush, rfStackPop } from '@/util/rfNodes'
import initialEdges, { rfEdgesStackDispose, rfEdgesStackPop, rfEdgesStackPush } from '@/util/rfEdges'
import { rfEdgesStackMain, rfEdgesCreateStack, rfEdgesCreateNode } from "@/util/rfEdges";
import CircleNode from "@/util/circleNode";
import ObjectNode from "@/util/objectNode";

import '@/util/node.css'
import ValueNode from "@/util/valueNode";
import ASTree from "@/util/jsonTree";

import MonacoEditor from '../monaco-editor';

const rfStyle = {
    backgroundColor: 'white',
};

const nodeTypes = {
    circleNode: CircleNode,
    objectNode: ObjectNode,
    valueNode: ValueNode,
};

function cleanTree(obj, depth = 0, maxDepth = 5) {
    if (depth > maxDepth) return obj;
    for (let key in obj) {
        if (key === '$cstNode' || key === '$document' || key === '$container'
        ) {
            delete obj[key];
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            cleanTree(obj[key], depth + 1, maxDepth);
        }
    }
}


function generateNodesFromAst(ast) {

    const nodes = [];
    let topleveldeclaration = ast.tdecl;
    console.log("topleveldeclaration: ", topleveldeclaration)
    let helpAST = ast;
    const newAST = cleanTree(helpAST);

    console.log("newAST: ", newAST)


    // AST Rekursiv durchlaufen
    function traverse(node, parentId) {
        // Erstelle einen neuen Knoten mit den benötigten Eigenschaften
        const newNode = {
            id: nodes.length, // die ID ist die aktuelle Länge des nodes Arrays
            type: node.$type, // der Typ des Knotens ist in der $type Eigenschaft
            parentId, // die parentId wird von der aufrufenden Funktion bereitgestellt
            // füge hier weitere Eigenschaften hinzu, die du visualisieren möchtest
        };

        nodes.push(newNode); // den neuen Knoten zum nodes Array hinzufügen

        // Liste der Eigenschaften, auf die sich die Rekursion beschränken soll
        const allowedProperties = ['tdecl', 'cs', 've'];

        // Gehe durch alle Eigenschaften des aktuellen Knotens im AST
        for (let key in node) {
            // Überprüfe, ob die Eigenschaft in der Liste der erlaubten Eigenschaften ist
            if (allowedProperties.includes(key)) {
                // Wenn die Eigenschaft ein Objekt ist, dann rufe die traverse Funktion darauf auf
                if (node[key] instanceof Object) {
                    traverse(node[key], newNode.id);
                }
            }
        }


        traverse(topleveldeclaration, null); // beginne mit dem obersten Knoten im AST (parentId ist null)
        return nodes;
    }
}

function generateEdgesFromAst(nodes) {
    // Überprüfen Sie, ob nodes definiert ist und ob es sich um ein Array handelt
    if (nodes === undefined || nodes === null) {
        console.error('nodes is undefined or null');
        return [];
    }
    if (!Array.isArray(nodes)) {
        console.error('nodes is not an array:', nodes);
        return [];
    }
    const edges = [];

    // Gehe durch alle Knoten
    for (let node of nodes) {
        // Wenn der Knoten eine parentId hat, erstelle eine Kante von der parentId zu der aktuellen id
        if (node.parentId !== null) {
            edges.push({ from: node.parentId, to: node.id });
        }
    }

    return edges;
}

function cleanAST(node) {
    let seen = new Set(); // um zyklische Referenzen zu vermeiden
    let stack = [node];  // Stack anstelle von Rekursion

    while (stack.length > 0) {
        let current = stack.pop();

        if (seen.has(current)) continue; // vermeide zyklische Referenzen
        seen.add(current);

        if (typeof current === 'object' && current !== null) { // überprüfe, ob es ein Objekt ist
            for (let key in current) {
                if (current.hasOwnProperty(key)) {
                    if (key === '$cstNode' || key === '$document' || key === '$container' || key === '$containerIndex' || key === '$containerProperty') {
                        delete current[key]; // lösche unerwünschte Eigenschaften
                    } else if (typeof current[key] === 'object') {
                        stack.push(current[key]); // füge Kindknoten zum Stapel hinzu
                    }
                }
            }
        }
    }
}




export default function Home() {




    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [originalAst, setOriginalAst] = useState({});
    const [ast, setAst] = useState({});
    const [selectedNode, setSelectedNode] = useState("main");
    const [selectedEdges, setSelectedEdges] = useState("main");

    const [client, setClient] = useState(null);


    useEffect(() => {
        function handleReceiveMessage(event) {
            // Prüfen Sie, ob das Event die erwarteten Eigenschaften hat
            if (!event.data || event.data.source === 'react-devtools-content-script' || !event.data.$type || event.data.$type !== 'Model') {
                return;
            }
            setOriginalAst(event.data);
            // Hier können Sie den empfangenen AST nach Bedarf verwenden
            console.log("AST handleReceiveMessage: ", event.data)
            // TODO: Erzeugen Sie Ihre neuen Nodes und Edges hier basierend auf dem AST

        }

        window.addEventListener('message', handleReceiveMessage);

        // Stellen Sie sicher, dass der EventListener bei Bereinigung entfernt wird
        return () => {
            window.removeEventListener('message', handleReceiveMessage);
        };
    }, []);

    useEffect(() => {
        // Verwenden Sie die Funktion
        let ast = originalAst;
        cleanAST(ast);
        setAst(ast)
        const newNodes = generateNodesFromAst(ast);
        console.log("generateNodesFromAst: ", newNodes);
        const newEdges = generateEdgesFromAst(ast);
        console.log("generateEdgesFromAst: ", newEdges);

        // Aktualisieren Sie Ihren Graphen mit den neuen Daten
        setNodes(newNodes);
        setEdges(newEdges);
        console.log("AST after cleanup: ", ast)
    }, [originalAst]);

    const defaultEdgeOptions = {
        style: { strokeWidth: 3, stroke: 'black' },

        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: 'black',
        },
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
            {//   <MonacoEditor />
            }
            {/*
// Run button removed for the time being, the editor and parser could not be accessed from the Next.js environment.

            <div className={styles.runButtonContainer}>
                <button className={styles.runButton} onClick={() => generateAndDisplay()}>Run</button>
            </div>

*/}

            <main className={styles.main}>
                <div className="row">

                    <div id="editor" className={styles.editor} >

                        <iframe src="/index.html" width="100%" height="100%"></iframe>

                    </div>

                    <div id="rf-container" className={styles.rfContainer} >
                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Nav variant="pills" className="flex-row">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">AST Ansicht</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Reactflow Visualisierung</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <ASTree jsonData={ast} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="second" >
                                    <div className={styles.rfTab}>
                                        <select className={styles.nodeSelector} id="node-selector" onChange={handleFunctionSelect}>
                                            <option value="main">main()</option>
                                            <option value="createStack">createStack()</option>
                                            <option value="createNode">createNode(int v)</option>
                                            <option value="push">push(stack *s, int v)</option>
                                            <option value="pop">pop(stack *s)</option>
                                            <option value="dispose">dispose(stack *s)</option>
                                        </select>

                                        <ReactFlow
                                            nodes={nodes}
                                            edges={edges}
                                            onNodesChange={onNodesChange}
                                            onEdgesChange={onEdgesChange}
                                            onConnect={onConnect}
                                            defaultEdgeOptions={defaultEdgeOptions}
                                            nodeTypes={nodeTypes}
                                            fitView
                                            style={rfStyle}
                                            attributionPosition="top-right"
                                        >
                                            {/* <MiniMap /> */}
                                            <Controls />
                                            <Background />
                                        </ReactFlow>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>




                </div>
            </main >
        </div >

    );


}
