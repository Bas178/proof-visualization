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
    });

    let preEdges = functionData.ver.links.map(link => ({
        id: `${link.from}-${link.to}`,
        source: link.from.split(':')[0],
        target: link.to.split(':')[0],
        animated: true,
        style: { stroke: 'red' }
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
    });

    let postEdges = functionData.vee.links.map(link => ({
        id: `${link.from}-${link.to}`,
        source: link.from.split(':')[0],
        target: link.to.split(':')[0],
        animated: true,
        style: { stroke: 'green' }
    }));

    // Merge pre and post nodes and edges
    let nodes = [...preNodes, ...postNodes];
    let edges = [...preEdges, ...postEdges];
   // Remove duplicate nodes and merge their labels and colors
   nodes = nodes.reduce((uniqueNodes, node) => {
    const existingNode = uniqueNodes.find(uniqueNode => uniqueNode.id === node.id);
    if (existingNode) {
        // If the node is a variable node and exists in both lists, merge their labels
        if (node.parentNode && existingNode.data.label !== node.data.label) {
            existingNode.data.label += ` ~> ${node.data.label.split(' = ').pop()}`;
        }
        // If the node exists in both lists, set color to neutral
        if (existingNode.style) {
            existingNode.style.backgroundColor = 'white';
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
            existingEdge.style.stroke = 'neutral';
        }
    } else {
        uniqueEdges.push(edge);
    }
    return uniqueEdges;
}, []);

return { nodes, edges };
}