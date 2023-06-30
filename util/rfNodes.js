const nodes = [
    {
        id: 'A',
        type: 'group',
        position: { x: 0, y: 0 },
        style: {
            width: 170,
            height: 140,
        },
    },
    {
        id: 'A-1',
        type: 'input',
        data: { label: 'Child Node 1' },
        position: { x: 10, y: 10 },
        parentNode: 'A',
        extent: 'parent',
    },
    {
        id: 'A-2',
        data: { label: 'Child Node 2' },
        position: { x: 10, y: 90 },
        parentNode: 'A',
        extent: 'parent',
    },
    {
        id: 'B',
        type: 'output',
        position: { x: -100, y: 200 },
        data: null,
        style: {
            width: 170,
            height: 140,
            backgroundColor: 'rgba(240,240,240,0.25)',
        },
    },
    {
        id: 'B-1',
        data: { label: 'Child 1' },
        position: { x: 50, y: 10 },
        parentNode: 'B',
        extent: 'parent',
        draggable: false,
        style: {
            width: 60,
        },
    },
    {
        id: 'B-2',
        data: { label: 'Child 2' },
        position: { x: 10, y: 90 },
        parentNode: 'B',
        extent: 'parent',
        draggable: false,
        style: {
            width: 60,
        },
    },
    {
        id: 'B-3',
        data: { label: 'Child 3' },
        position: { x: 100, y: 90 },
        parentNode: 'B',
        extent: 'parent',
        draggable: false,
        style: {
            width: 60,
        },
    },
    {
        id: 'C',
        type: 'output',
        position: { x: 100, y: 200 },
        data: { label: 'Node C' },
    },
];

export default nodes;

export const rfStackMain = [
    { id: 'constraints', type: 'objectNode', data: { label: '<<constraints>>', backgroundColor: 'yellow',borderStyle : '1px solid black'  }, position: { x: 0, y: 0 }, style: { backgroundColor: 'yellow', width: 220, height: 300, border: '1px solid black' }, },
    { id: 'requires', type: 'objectNode', data: { label: '<<requires>>', backgroundColor: 'yellow',borderStyle : '1px solid black' }, position: { x: 10, y: 100 }, parentNode: 'constraints', extent: 'parent', style: { backgroundColor: 'yellow', width: 200, height: 100, border: '1px solid black' }, },
    { id: 'requires-var', type: 'objectNode', data: { label: 'true' }, position: { x: 20, y: 50 }, parentNode: 'requires', extent: 'parent', style: { backgroundColor: '', }, },
    { id: 'ensures', type: 'objectNode', data: { label: '<<ensures>>', backgroundColor: 'yellow',borderStyle : '1px solid black' }, position: { x: 10, y: 200 }, parentNode: 'constraints', extent: 'parent', style: { backgroundColor: 'yellow', width: 200, height: 100, border: '1px solid black' }, },
    { id: 'ensures-var', type: 'objectNode', data: { label: 'true' }, position: { x: 20, y: 50 }, parentNode: 'ensures', extent: 'parent', style: { backgroundColor: '', }, },
    /*
    { id: 'main', data: { label: 'main' }, position: { x: 200, y: 0 }, style: { width: 100, height: 50, }, },
    { id: 'createStack', data: { label: 'createStack' }, position: { x: 0, y: 250 }, style: { width: 100, height: 50, }, },
    { id: 'push', data: { label: 'push' }, position: { x: 200, y: 250 }, style: { width: 100, height: 50, }, },
    { id: 'pop', data: { label: 'pop' }, position: { x: 300, y: 350 }, style: { width: 100, height: 50, }, },
    { id: 'dispose', data: { label: 'dispose' }, position: { x: 450, y: 350 }, style: { width: 100, height: 50, }, },
    { id: 'createNode', data: { label: 'createNode' }, position: { x: 150, y: 450 }, style: { width: 100, height: 50, }, },
*/


];


export const rfCreateStack = [
    { id: 'stack', data: { label: 'result:stack' }, position: { x: 100, y: 100 }, className: 'light', style: { backgroundColor: 'rgba(124, 252, 0, 0.2)', width: 200, height: 100 }, },
    { id: 'stack-var', type: 'objectNode', data: { label: 'cnt=0' }, position: { x: 20, y: 50 }, parentNode: 'stack', extent: 'parent', },
    { id: 'nullpointer', type: 'output', data: { label: '' }, position: { x: 250, y: 250 }, style: { width: 30, height: 30 }, },
    { id: 'nptr', type: 'circleNode', data: { label: '⏊' }, position: { x: 5, y: 5 }, parentNode: 'nullpointer', extent: 'parent', },
    { id: 'result', type: 'objectNode', data: { label: 'return',backgroundColor: '#dcb2dc',  }, position: { x: 500, y: 0 }, style: {backgroundColor: '#dcb2dc',  width: 200, height: 100 }, },
    { id: 'result-var', type: 'objectNode', data: { label: 'result:stack', labelColor: 'black',backgroundColor: 'rgba(124, 252, 0, 0.2)', }, position: { x: 20, y: 50 }, parentNode: 'result', extent: 'parent',  },
];


export const rfCreateNode = [
    { id: 'node', type: 'input', data: { label: 'result:node' }, position: { x: 100, y: 100 }, className: 'light', style: { backgroundColor: 'rgba(124, 252, 0, 0.2)', width: 200, height: 100 }, },
    { id: 'node-var', type: 'objectNode', data: { label: 'value=v' }, position: { x: 20, y: 50 }, parentNode: 'node', extent: 'parent', },
    { id: 'nullpointer', type: 'output', data: { label: '' }, position: { x: 250, y: 250 }, style: { width: 30, height: 30 }, },
    { id: 'nptr', type: 'circleNode', data: { label: '⏊' }, position: { x: 5, y: 5 }, parentNode: 'nullpointer', extent: 'parent', },
    { id: 'result', type: 'objectNode', data: { label: 'return',backgroundColor: '#dcb2dc', }, position: { x: 500, y: 0 }, style: {backgroundColor: '#dcb2dc',  width: 200, height: 100 }, },
    { id: 'result-var', type: 'objectNode', data: { label: 'result:node', labelColor: 'black',backgroundColor: 'rgba(124, 252, 0, 0.2)', }, position: { x: 20, y: 50 }, parentNode: 'result', extent: 'parent', style: { backgroundColor: 'rgba(124, 252, 0, 0.2)', }, },
];

export const rfStackPush = [

    { id: 'stack', data: { label: 's:stack' }, position: { x: 200, y: 0 }, className: 'light', style: { width: 200, height: 100 }, },
    { id: 'stack-var', type: 'objectNode', data: { label: <>cnt = ?c <strong>{'~>'}</strong> ?c+1</> }, position: { x: 20, y: 50 }, parentNode: 'stack', extent: 'parent', style: { backgroundColor: 'purple', }, },
    { id: 'node0', data: { label: '?n:node' }, position: { x: 0, y: 300 }, className: 'light', style: { backgroundColor: 'rgba(124, 252, 0, 0.2)', width: 200, height: 100 }, },
    { id: 'node-var', type: 'objectNode', data: { label: 'value=v' }, position: { x: 20, y: 50 }, parentNode: 'node0', extent: 'parent', },
    { id: 'node1', data: { label: '?h:node' }, position: { x: 250, y: 500 }, },
    { id: 'nullpointer', type: 'circleNode', draggable: false, data: { label: '⏊' }, position: { x: 120, y: 0 }, style: { width: 20, height: 20 }, parentNode: 'node1', extent: 'parent', },
    { id: 'constraints', data: { label: '<<constraints>>' }, position: { x: 500, y: 0 }, style: { backgroundColor: 'yellow', width: 220, height: 200 }, },
    { id: 'requires', data: { label: '<<requires>>' }, position: { x: 10, y: 100 }, parentNode: 'constraints', extent: 'parent', style: { backgroundColor: 'yellow', width: 200, height: 100 }, },
    { id: 'requires-var', type: 'objectNode', data: { label: '?c < INT_MAX' }, position: { x: 20, y: 50 }, parentNode: 'requires', extent: 'parent', style: { backgroundColor: '', }, },
    
    
];

export const rfStackPop = [
    { id: 'stack', type: 'input', data: { label: 's:stack' }, position: { x: 200, y: 0 }, className: 'light', style: { width: 200, height: 100 }, },
    { id: 'stack-var', type: 'objectNode', data: { label: <>cnt = ?c <strong>{'~>'}</strong> ?c-1</> }, position: { x: 50, y: 50 }, parentNode: 'stack', extent: 'parent', style: { backgroundColor: 'purple', }, },
    { id: 'node0', type: 'output', data: { label: '?n:node' }, position: { x: 250, y: 500 }, className: 'light', style: { backgroundColor: '', width: 200, height: 100 }, },
    { id: 'nullpointer', type: 'circleNode', draggable: false, data: { label: '⏊' }, position: { x: 120, y: 0 }, style: { width: 20, height: 20 }, parentNode: 'node0', extent: 'parent', },
    { id: 'node1', data: { label: '?he:node' }, position: { x: 0, y: 300 }, style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 200, height: 100 }, },
    { id: 'node1-var', type: 'objectNode', data: { label: 'value=?res' }, position: { x: 20, y: 50 }, parentNode: 'node1', extent: 'parent', },
    { id: 'result', type: 'objectNode', data: { label: 'return',backgroundColor: '#dcb2dc', }, position: { x: 500, y: 0 }, style: { backgroundColor: '#dcb2dc', width: 200, height: 100 }, },
    { id: 'result-var', type: 'valueNode', data: { label: '?res' }, position: { x: 20, y: 50 }, parentNode: 'result', extent: 'parent', style: { backgroundColor: '', }, },
    { id: 'constraints', data: { label: '<<constraints>>' }, position: { x: 500, y: 250 }, style: { backgroundColor: 'yellow', width: 220, height: 200 }, },
    { id: 'requires', data: { label: '<<requires>>' }, position: { x: 10, y: 100 }, parentNode: 'constraints', extent: 'parent', style: { backgroundColor: 'yellow', width: 200, height: 100 }, },
    { id: 'requires-var', type: 'objectNode', data: { label: '?c > 0' }, position: { x: 20, y: 50 }, parentNode: 'requires', extent: 'parent', style: { backgroundColor: '', }, },
    
];

export const rfStackDispose = [
    { id: 'stack', data: { label: 's:stack' }, position: { x: 100, y: 100 }, className: 'light', style: { backgroundColor: 'rgba(255, 0, 0, 0.2)', width: 200, height: 100 }, },
    { id: 'stack-var', data: { label: 'cnt=0' }, position: { x: 20, y: 50 }, parentNode: 'stack', extent: 'parent', },
    { id: 'nullpointer', type:'output', data: { label: '' }, position: { x: 250, y: 250 }, style: { width: 30, height: 30 }, },
    { id: 'nptr', type: 'circleNode', data: { label: '⏊' }, position: { x: 5, y: 5 }, parentNode: 'nullpointer', extent: 'parent', },
];