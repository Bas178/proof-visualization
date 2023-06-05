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
    { id: 'main', data: { label: 'main' }, type: 'group', position: { x: 0, y: 0 }, style: { width: 170, height: 140, }, className: 'light', },    
    { id: 'createStack', data: { label: 'createStack' }, position: { x: 100, y: 0 }, style: { width: 170, height: 140, }, },
    { id: 'push', data: { label: 'push' }, position: { x: 200, y: 0 }, style: { width: 170, height: 140, }, },
    { id: 'pop', data: { label: 'pop' }, position: { x: 300, y: 0 }, style: { width: 170, height: 140, }, },
    { id: 'dispose', data: { label: 'dispose' }, position: { x: 400, y: 0 }, style: { width: 170, height: 140, }, },
    { id: 'createNode', data: { label: 'createNode' }, position: { x: 500, y: 0 }, style: { width: 170, height: 140, }, },
    
    
    
];




export const rfCreateStack = [ /* Ihre Node-Konfiguration hier */];


export const rfCreateNode = [ /* Ihre Node-Konfiguration hier */];