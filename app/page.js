'use client'
import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { Tab, Nav } from 'react-bootstrap';
import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import styles from './page.module.css'
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, MarkerType, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';

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

//import MonacoEditor from '../monaco-editor';
import DynamicMonaco from "@/app/dynamicMonaco";
import { createVisualization } from "./analyzeCodeStructure";
import { convertToReactFlowFormat } from "./convertToReactFlowFormat"
import { formatArgs } from "./formatArgs";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 250;
const nodeHeight = 250;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
    console.log("getLayoutedElements nodes: ", nodes);
    console.log("getLayoutedElements edges: ", edges);

    const isHorizontal = direction === 'LR';
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
        if (!node.parentNode) { // Überprüfen Sie, ob der Knoten eine parentNode Eigenschaft hat
            dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
        }
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        if (!node.parentNode) { // Überprüfen Sie erneut, ob der Knoten eine parentNode Eigenschaft hat
            const nodeWithPosition = dagreGraph.node(node.id);
            node.targetPosition = isHorizontal ? 'left' : 'top';
            node.sourcePosition = isHorizontal ? 'right' : 'bottom';

            // Verschieben der Dagre-Knotenposition (Ankerpunkt = Mitte) nach oben links,
            // um den Ankerpunkt von React Flow (oben links) anzupassen.
            node.position = {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            };
        }

        return node;
    });

    return { nodes, edges };
};


const rfStyle = {
    backgroundColor: '#dce1e0',
};

const nodeTypes = {
    circleNode: CircleNode,
    objectNode: ObjectNode,
    valueNode: ValueNode,
};


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
                    if (key === '$cstNode' || key === '$document' || key === '$container' || key === '$containerIndex' || key === '$containerProperty' || key === '$nodeDescription' || key === '$refNode' || key === '_nodeDescription' || key === 'error') {
                        delete current[key]; // lösche unerwünschte Eigenschaften
                    } else if (typeof current[key] === 'object') {
                        stack.push(current[key]); // füge Kindknoten zum Stapel hinzu
                    }
                }
            }
        }
    }
}

const baseNode = {
    id: '',
    data: { label: '' },
    position: { x: 0, y: 0 },
    className: '',
    style: {},
};

function generateNodes(parsedData) {
    let nodes = [];
    let edges = [];
    console.log("parsedData: ", parsedData)
    // Iterate over the array `vee` in the data
    parsedData.vee.forEach((item, index) => {
        console.log("item: ", item)
        let node = { ...baseNode };  // Kopiere die Basis Knotenstruktur

        // Update the node based on the specific data
        switch (item.$type) {
            case "VeriFastExpression":
                // Process the "VeriFastExpression" and create corresponding nodes and edges
                if (item.vffuncref) {
                    node.id = 'stack';
                    node.data.label = 'result:stack';
                    node.position = { x: 100, y: 100 };
                    node.className = 'light';
                    node.style = { backgroundColor: 'rgba(124, 252, 0, 0.2)', width: 200, height: 100 };

                    // Adding the components to the list of nodes
                    nodes.push(node);

                    // Create nodes for the struct components
                    item.vffuncref.vfstruct.ref.sdl.list.forEach((component, cIndex) => {
                        let compNode = { ...baseNode };

                        compNode.id = 'stack-var' + cIndex;  // Benutze Index für eindeutige ID
                        compNode.type = 'objectNode';
                        compNode.data.label = component.name + '=0';
                        compNode.position = { x: 20, y: 50 + 50 * cIndex }; // Verteile die Knoten gleichmäßig vertikal
                        compNode.parentNode = 'stack';
                        compNode.extent = 'parent';

                        nodes.push(compNode);
                    });
                }
                break;
            // Add more cases for other $type values...
            default:
                break;
        }
    });

    // Further logic for creating edges added here...

    return { nodes, edges };
}




export default function Prototype() {




    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [originalAst, setOriginalAst] = useState({});
    const [ast, setAst] = useState({});
    const [selectedNode, setSelectedNode] = useState("main");
    const [selectedEdges, setSelectedEdges] = useState("main");
    const [functionNames, setFunctionNames] = useState([]);

    const [client, setClient] = useState(null);

    const [data, setData] = useState([]); // Zustand für Daten
    const [selectedFunction, setSelectedFunction] = useState(null);

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

        console.log("AST after cleanup: ", ast)
        if (ast.tdecl) {
            // Extract the TopLevelDeclarations
            let topLevelDeclarations = ast.tdecl;

            // Filter all functions
            let functions = topLevelDeclarations.filter(decl => decl.$type === 'FunctionDeclaration');

            // Extract the names of the functions
            let functionNames = functions.map(func => func.name);

            // Put the function names in the state 
            setFunctionNames(functionNames);

        }
    }, [originalAst]);


    useEffect(() => {
        if (ast.tdecl) {
            // Finde die Funktionsdeklaration
            const functionDeclarations = ast.tdecl.filter(node => node.$type === "FunctionDeclaration");
            // Erstelle die Visualisierungsobjekte für jede Funktion
            const visualizations = functionDeclarations.map(func => {
                // Funktion zur Handhabung von "requires" oder "ensures"
                console.log("func: ", func)


                // "requires" Teil des Vertrags
                //console.log("*****  verVisualization:  *****");
                const verVisualization = createVisualization(func.ver);
                //console.log("verVisualization:", verVisualization);

                // "ensures" Teil des Vertrags (anpassen, wenn nötig)
                //console.log("*****  veeVisualization:  *****");
                const veeVisualization = createVisualization(func.vee);
                //console.log("veeVisualization:", veeVisualization);

                let argumente = (func.ptl && func.ptl.plist && func.ptl.plist.pdlist) ? formatArgs(func.ptl.plist.pdlist) : null;
                let funktionsAufruf = `${func.name}(${argumente || ''})`;

                return {
                    functionName: funktionsAufruf, //func.name,
                    ver: verVisualization, // "requires" Visualisierung
                    vee: veeVisualization  // "ensures" Visualisierung
                };
            });

            // Jetzt sollte visualizations die Strukturen für die Visualisierung enthalten
            console.log("visualizations:", visualizations);
            setData(visualizations);
            setSelectedFunction(visualizations[0]?.functionName || null);
        }
    }, [ast]);

    const functionData = data.find(item => item.functionName === selectedFunction);

    const flowData = useMemo(() => {
        const { nodes, edges } = selectedFunction ? convertToReactFlowFormat(functionData) : { nodes: [], edges: [] };
        return getLayoutedElements(nodes, edges)
    }, [selectedFunction, functionData]);



    useEffect(() => {
        console.log("flowData: ", flowData)
        setNodes(flowData.nodes);
        setEdges(flowData.edges)
    }, [flowData]);

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

    const handleFunctionSelect = (e) => setSelectedFunction(e.target.value);

    useEffect(() => {

    }, []);

    function handleEditorDidMount(editor, monaco) {
        editor.onDidChangeModelContent(() => {
            const code = editor.getValue();
            // Use the Langium parser here to generate the AST from the code
            // Then update the Cytoscape canvas with the new AST data
        });
    }
    function onLoad(reactFlowInstance) {
        console.log('flow loaded:', reactFlowInstance.getElements());
    }

    function onError(event) {
        console.log('An error occurred:', event);
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

                        <iframe src="/proof-visualization/index.html" width="100%" height="100%"></iframe>

                    </div>



                    <div id="rf-container" className={styles.rfContainer} >
                        {/*}
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
                                        <select className={styles.nodeSelector} id="node-selector" value={selectedFunction || ''} onChange={handleFunctionSelect}>
                                            {data.map(item => (
                                                <option key={item.functionName} value={item.functionName}>
                                                    {item.functionName}
                                                </option>
                                            ))}
                                        </select>
                                        <div id="rf-pane" className={styles.rfPane} >
                                            <ReactFlow
                                                //elements={flowData}
                                                nodes={nodes}
                                                edges={edges}
                                                onLoad={onLoad}
                                                onError={onError}
                                                onNodesChange={onNodesChange}
                                                onEdgesChange={onEdgesChange}
                                                onConnect={onConnect}
                                                //defaultEdgeOptions={defaultEdgeOptions}
                                                nodeTypes={nodeTypes}
                                                fitView
                                                style={rfStyle}
                                                attributionPosition="top-right"
                                            >
                                                
                                                <Controls />
                                                <Background />
                                            </ReactFlow>
                                        </div>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                                            */}
                        <select className={styles.nodeSelector} id="node-selector" value={selectedFunction || ''} onChange={handleFunctionSelect}>
                            {data.map(item => (
                                <option key={item.functionName} value={item.functionName}>
                                    {item.functionName}
                                </option>
                            ))}
                        </select>

                        <ReactFlow
                            //elements={flowData}
                            nodes={nodes}
                            edges={edges}
                            onLoad={onLoad}
                            onError={onError}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            //defaultEdgeOptions={defaultEdgeOptions}
                            nodeTypes={nodeTypes}
                            fitView
                            style={rfStyle}
                            attributionPosition="top-right"
                        >

                            <Controls />
                            <Background />
                        </ReactFlow>
                    </div>




                </div>
            </main >
        </div >

    );


}
