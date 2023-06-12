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




export const rfEdgesCreateStack = [ { id: 'stack-nullpointer', source: 'stack', target: 'nullpointer' ,style: {color:'rgba(124, 252, 0, 0.2)' },},];


export const rfEdgesCreateNode = [ { id: 'node-result', source: 'node', target: 'result', style: {color:'rgba(124, 252, 0, 0.2)' },},];
export const rfEdgesStackPush = [ ];
export const rfEdgesStackPop = [ ];
export const rfEdgesStackDispose = [ { id: 'stack-result', source: 'stack', target: 'result', style: {color:'rgba(255, 0, 0, 0.2)'} },];