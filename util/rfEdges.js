import { MarkerType, } from 'reactflow';
export default [
    { id: 'a1-a2', source: 'A-1', target: 'A-2' },
    { id: 'a2-b', source: 'A-2', target: 'B' },
    { id: 'a2-c', source: 'A-2', target: 'C' },
    { id: 'b1-b2', source: 'B-1', target: 'B-2' },
    { id: 'b1-b3', source: 'B-1', target: 'B-3' },
];

export const rfEdgesStackMain = [

    { id: 'createStackEdge', source: 'main', target: 'createStack' },
    { id: 'push1', source: 'main', target: 'push' },
    { id: 'push2', source: 'main', target: 'push' },
    { id: 'pop1', source: 'main', target: 'pop' },
    { id: 'pop2', source: 'main', target: 'pop' },
    { id: 'disposeEdge', source: 'main', target: 'dispose' },
    { id: 'createNodeCreateStack', source: 'createStack', target: 'createNode' },
    { id: 'createNodePush', source: 'push', target: 'createNode' },



];




export const rfEdgesCreateStack = [{ id: 'stack-nullpointer', source: 'stack', target: 'nullpointer', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: 'green', }, label: 'head', style: { strokeWidth: 2, stroke: 'green', }, },];


export const rfEdgesCreateNode = [{ id: 'node-result', source: 'node', target: 'result', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: 'green', }, label: 'next', style: { strokeWidth: 2, stroke: 'green', }, },];
export const rfEdgesStackPush = [
    { id: 'stack-node0', source: 'stack', target: 'node0', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: 'green', }, label: 'head', style: { strokeWidth: 2, stroke: 'green', }, },
    { id: 'stack-node1', source: 'stack', target: 'node1', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: 'red', }, label: 'head', style: { strokeWidth: 2, stroke: 'red', }, },
    { id: 'node0-node1', source: 'node0', target: 'node1', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: 'green', }, label: 'next', style: { strokeWidth: 2, stroke: 'green', }, },
];
export const rfEdgesStackPop = [
    { id: 'stack-node0', source: 'stack', target: 'node0', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: 'red', }, label: 'head', style: { strokeWidth: 2, stroke: 'red', }, },
    { id: 'stack-node1', source: 'stack', target: 'node1', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: 'green', }, label: 'head', style: { strokeWidth: 2, stroke: 'green', }, },
    { id: 'node0-node1', source: 'node0', target: 'node1', markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: 'red', }, label: 'next', style: { strokeWidth: 2, stroke: 'red', }, },
];
export const rfEdgesStackDispose = [{ id: 'stack-nullpointer', source: 'stack', target: 'nullpointer',  markerEnd: { type: MarkerType.ArrowClosed, width: 20, height: 20, color: 'red', }, label: 'next', style: { strokeWidth: 2, stroke: 'red', }, },];