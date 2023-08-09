import { MarkerType, } from 'reactflow';

export function convertToReactFlowFormat(functionData) {
    console.log("convertToReactFlowFormat functionData: ", functionData)
let cnt = 0;
    let preNodes = [];
    functionData.ver.nodes.forEach(node => {
        preNodes.push({
            id: node.name,
            data: { label: `${node.name}:${node.type}` },
            style: { backgroundColor: 'red', width: 200, height: 100 },

            position: { x: Math.random() * 250, y: cnt + Math.random() * 250 }
        });
        cnt += 100;
        if (node.variables) {
            Object.entries(node.variables).forEach(([key, value], index) => {
                preNodes.push({
                    id: `${node.name}-${key}`,
                    data: { label: `${key} = ${value}` },

                    position: { x: 20, y: 50 },
                    parentNode: node.name,
                    extent: 'parent'
                });
            });
        }
        if (node.isnull && !node.iscreated){
            preNodes.push({
                id: `${node.name}-nullpointer`,
                data: { label: '⏊' },
                type: 'circleNode',
                draggable: false,
                position: { x: 120, y: 0 },
                style: { width: 20, height: 20 },
                parentNode: node.name,
                extent: 'parent'
            });
        }
    });
   

    let preEdges = functionData.ver.links.map(link => ({
        id: `${link.from}-${link.to}`,
        source: link.from.split(':')[0],
        target: link.to.split(':')[0],
        animated: true,
        style: { stroke: 'red' },
        markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10, color: 'red', }, 
        label: link.linkName,
    }));

    let postNodes = [];
    functionData.vee.nodes.forEach(node => {
        postNodes.push({
            id: node.name,
            data: { label: `${node.name}:${node.type}` },
            style: { backgroundColor: 'green', width: 200, height: 100 },
            position: { x: Math.random() * 250, y: cnt + Math.random() * 250 }
        });
        cnt += 100;
        if (node.variables) {
            Object.entries(node.variables).forEach(([key, value], index) => {
                postNodes.push({
                    id: `${node.name}-${key}`,
                    data: { label: `${key} = ${value}` },

                    position: { x: 20, y: 50 },
                    parentNode: node.name,
                    extent: 'parent'
                });
            });
        }
        if (node.isnull && !node.iscreated){
            postNodes.push({
                id: `${node.name}-nullpointer`,
                data: { label: '⏊' },
                type: 'circleNode',
                draggable: false,
                position: { x: 120, y: 0 },
                style: { width: 20, height: 20 },
                parentNode: node.name,
                extent: 'parent'
            });
        }
       
    });

    let postEdges = functionData.vee.links.map(link => ({
        id: `${link.from}-${link.to}`,
        source: link.from.split(':')[0],
        target: link.to.split(':')[0],
        animated: true,
        style: { stroke: 'green' },
        markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10, color: 'green', }, 
        label: link.linkName,
    }));

    // Merge pre and post nodes and edges
    let nodes = [...preNodes, ...postNodes];
    let edges = [...preEdges, ...postEdges];
   // Remove duplicate nodes and merge their labels and colors
   nodes = nodes.reduce((uniqueNodes, node) => {
    const existingNode = uniqueNodes.find(uniqueNode => uniqueNode.id === node.id);
    if (existingNode) {
        // If the node exists in both lists, set color to neutral
        if (existingNode.style) {
            existingNode.style.backgroundColor = 'white';
        }
        // If the node is a variable node and exists in both lists, merge their labels
        if (node.parentNode && existingNode.data.label !== node.data.label) {
            existingNode.data.label += ` ~> ${node.data.label.split(' = ').pop()}`;
            existingNode.data.labelColor = 'white';
            if (!existingNode.style) {
                existingNode.style = {};
            }
            existingNode.style.backgroundColor = 'purple';
            if (!existingNode.type) {
                existingNode.type = {};
            }
            existingNode.type = 'objectNode';
        }
        
        
    } else {
        uniqueNodes.push(node);
    }
    return uniqueNodes;
}, []);

// Remove duplicate edges and set their color to neutral
edges = edges.reduce((uniqueEdges, edge) => {
    const existingEdge = uniqueEdges.find(uniqueEdge => uniqueEdge.id === edge.id);
    if (existingEdge) {
        // If the edge exists in both lists, set color to neutral
        if (existingEdge.style) {
            existingEdge.style.stroke = 'black';
        }
    } else {
        uniqueEdges.push(edge);
    }
    return uniqueEdges;
}, []);


// constraints
let y = 0;
functionData.ver.constraints.forEach(constraint => {
    // Note the order, Parent Node must appear before Child Node in the list!
    const existingConstraintsNode = nodes.find(requireNode => requireNode.id === 'constraints');
    if (!existingConstraintsNode) {
        nodes.push({ 
            id: 'constraints', 
            type: 'objectNode', 
            data: { label: '<<constraints>>' , backgroundColor: 'yellow',borderStyle : '1px solid black'}, 
            position: { x: 500, y: 0 }, 
            style: { backgroundColor: 'yellow', 
            width: 220, 
            height: 200, 
            border: '1px solid black', 
            borderRadius: '5px' }, },)
        
    }
    const existingRequireNode = nodes.find(requireNode => requireNode.id === 'requires');
    if (!existingRequireNode) {
        nodes.push({ 
            id: 'requires', 
            type: 'objectNode', 
            data: { label: '<<requires>>' , backgroundColor: 'yellow',borderStyle : '1px solid black'}, 
            position: { x: 10, y: 75 }, 
            parentNode: 'constraints', 
            extent: 'parent', 
            style: { backgroundColor: 'yellow', width: 200, height: 100, border: '1px solid black', 
            borderRadius: '5px' }, },)
        
    }
    nodes.push({
        id: `ver-${constraint}`,
        data: { label: constraint },
        type: 'objectNode',
        draggable: false,
        position: { x: 20, y: y + 50 },
        style: {  },
        parentNode: 'requires',
        extent: 'parent'
    });
  
    
    y += 25
});
y = 0;
functionData.vee.constraints.forEach(constraint => {
    // Note the order, Parent Node must appear before Child Node in the list!
    const existingConstraintsNode = nodes.find(requireNode => requireNode.id === 'constraints');
    if (!existingConstraintsNode) {
        nodes.push({ 
            id: 'constraints', 
            type: 'objectNode', 
            data: { label: '<<constraints>>' , backgroundColor: 'yellow',borderStyle : '1px solid black'}, 
            position: { x: 500, y: 0 }, 
            style: { backgroundColor: 'yellow', 
            width: 220, 
            height: 200, 
            border: '1px solid black', 
            borderRadius: '5px' }, },)
        
    }
    const existingRequireNode = nodes.find(requireNode => requireNode.id === 'ensures');
    if (!existingRequireNode) {
        nodes.push({ 
            id: 'ensures', 
            type: 'objectNode', 
            data: { label: '<<ensures>>' , backgroundColor: 'yellow',borderStyle : '1px solid black'}, 
            position: { x: 10, y: 150 }, 
            parentNode: 'constraints', 
            extent: 'parent', 
            style: { backgroundColor: 'yellow', width: 200, height: 100, border: '1px solid black', 
            borderRadius: '5px' }, },)
        
    }
    nodes.push({
        id: `vee-${constraint}`,
        data: { label: constraint },
        type: 'objectNode',
        draggable: false,
        position: { x: 20, y: y + 50 },
        style: {  },
        parentNode: 'ensures',
        extent: 'parent'
    });
  
    
    y += 25
});


//{ id: 'constraints', type: 'objectNode', data: { label: '<<constraints>>' , backgroundColor: 'yellow',borderStyle : '1px solid black'}, position: { x: 500, y: 0 }, style: { backgroundColor: 'yellow', width: 220, height: 200, border: '1px solid black', borderRadius: '5px' }, },
//    { id: 'requires', type: 'objectNode', data: { label: '<<requires>>' , backgroundColor: 'yellow',borderStyle : '1px solid black'}, position: { x: 10, y: 75 }, parentNode: 'constraints', extent: 'parent', style: { backgroundColor: 'yellow', width: 200, height: 100, border: '1px solid black', borderRadius: '5px' }, },
//    { id: 'requires-var', type: 'objectNode', data: { label: '?c < INT_MAX' }, position: { x: 20, y: 50 }, parentNode: 'requires', extent: 'parent', style: { backgroundColor: '', }, },
return { nodes, edges };
}