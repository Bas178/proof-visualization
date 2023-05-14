export const cytoscapeDummyElements = [
    { data: { id: 'main' }, classes: 'function' },
    { data: { id: 'createStack' }, classes: 'function' },
    { data: { id: 'push' }, classes: 'function' },
    { data: { id: 'pop' }, classes: 'function' },
    { data: { id: 'dispose' }, classes: 'function' },
    { data: { id: 'createNode' }, classes: 'function' },
    { data: { id: 'createStackEdge', source: 'main', target: 'createStack' }, classes: 'edge' },
    { data: { id: 'push1', source: 'main', target: 'push' }, classes: 'edge' },
    { data: { id: 'push2', source: 'main', target: 'push' }, classes: 'edge' },
    { data: { id: 'pop1', source: 'main', target: 'pop' }, classes: 'edge' },
    { data: { id: 'pop2', source: 'main', target: 'pop' }, classes: 'edge' },
    { data: { id: 'disposeEdge', source: 'main', target: 'dispose' }, classes: 'edge' },
    { data: { id: 'createNodeCreateStack', source: 'createStack', target: 'createNode' }, classes: 'edge' },
    { data: { id: 'createNodePush', source: 'push', target: 'createNode' }, classes: 'edge' },
];

export const cytoscapeStackMain = [
    { data: { id: 'main' }, classes: 'function' },
    { data: { id: 'createStack' }, classes: 'function' },
    { data: { id: 'push' }, classes: 'function' },
    { data: { id: 'pop' }, classes: 'function' },
    { data: { id: 'dispose' }, classes: 'function' },
    { data: { id: 'createNode' }, classes: 'function' },
    { data: { id: 'createStackEdge', source: 'main', target: 'createStack' }, classes: 'edge' },
    { data: { id: 'push1', source: 'main', target: 'push' }, classes: 'edge' },
    { data: { id: 'push2', source: 'main', target: 'push' }, classes: 'edge' },
    { data: { id: 'pop1', source: 'main', target: 'pop' }, classes: 'edge' },
    { data: { id: 'pop2', source: 'main', target: 'pop' }, classes: 'edge' },
    { data: { id: 'disposeEdge', source: 'main', target: 'dispose' }, classes: 'edge' },
    { data: { id: 'createNodeCreateStack', source: 'createStack', target: 'createNode' }, classes: 'edge' },
    { data: { id: 'createNodePush', source: 'push', target: 'createNode' }, classes: 'edge' },
];

export const cytoscapeStackPush = [
    { data: { id: 'stack', label: 's:stack', variables: '', color: 'orange'  }, classes: 'stack', position: { x: 60, y: 110 } },            
    { data: { id: 'node', label: '?h:node', variables: '', color: 'orange' }, classes: 'node', position: { x: 340, y: 50 } },
    { data: { id: 'node0', label: '?n0:node', variables: 'value=v2', color: 'green'  }, classes: 'node0', position: { x: 120, y: 270 } },
    { data: { id: 'node1', label: '?n:node', variables: 'value=v1', color: 'green'  }, classes: 'node1', position: { x: 340, y: 280 } },            
    { data: { id: 'edge1', source: 'stack', target: 'node', label: 'head', color: 'red' }, classes: 'edge red' },
    { data: { id: 'edge2', source: 'stack', target: 'node0', label: 'head', color: 'green' }, classes: 'edge green' },
    { data: { id: 'edge3', source: 'node0', target: 'node1', label: 'next', color: 'green' }, classes: 'edge green' },
    { data: { id: 'edge4', source: 'node1', target: 'node', label: 'next', color: 'green' }, classes: 'edge green' }
  ];

export const cytoscapeStackPop = [
    { data: { id: 'stack', label: 's:stack', variables: '', color: 'orange'  }, classes: 'stack', position: { x: 60, y: 110 } },            
    { data: { id: 'node', label: '?n:node', variables: '', color: 'orange' }, classes: 'node', position: { x: 340, y: 50 } },
    { data: { id: 'node0', label: '?he:node', variables: 'value=res', color: 'red'  }, classes: 'node0', position: { x: 120, y: 270 } },                     
    { data: { id: 'edge1', source: 'stack', target: 'node', label: 'head', color: 'green' }, classes: 'edge green' },
    { data: { id: 'edge2', source: 'stack', target: 'node0', label: 'head', color: 'red' }, classes: 'edge red' },
    { data: { id: 'edge3', source: 'node0', target: 'node', label: 'next', color: 'red' }, classes: 'edge red' },            
  ];

export const cytoscapeStyles = [
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        label: 'data(id)'
      }
    },
    {
      selector: 'edge',
      style: {
        width: 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
];

export const cytoscapeStackStyles = [
    {
      selector: 'node',
      style: {
        'width': '25px', // Vergrößert die Breite der Rechtecke
        'height': '25px', // Vergrößert die Höhe der Rechtecke
        'shape': 'rectangle',
        'background-color': 'data(color)',
        'color': 'white',
        'padding-top': '35px', // Etwas Platz für den Text oben lassen
        'text-wrap': 'wrap',
        'text-max-width': 40,
        'label': function(ele) {
          return ele.data('label') + '\n------------\n' + ele.data('variables');
        },
        'text-decoration': 'underline',
        'text-valign': 'top',
        'text-halign': 'center',
        'text-outline-color': 'black',
        'text-outline-width': 2, 
        'text-margin-y': '35px', // Verschiebt den Text um 20px nach unten 
        'font-size': '10px', // Verkleinert die Schriftgröße der Labels       
      }
    },      
    {
      selector: 'node[classes="function"]',
      style: {
        'content': 'data(id)',
        'text-wrap': 'wrap',
        'text-max-width': 80,
      }
    },
    {
      selector: 'edge',
      style: {
        'width': 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'label': 'data(label)',
        'color': 'data(color)', // Setzt die Farbe des Textes auf die Farbe des Pfeils.
        'text-outline-color': 'black', // Setzt die Konturfarbe des Textes auf die Farbe des Pfeils.
        'text-outline-width': 1, // Setzt die Konturbreite des Textes.
        'text-valign': 'top', // Setzt die vertikale Ausrichtung des Textes auf 'top', so dass der Text über dem Pfeil angezeigt wird.
        'text-halign': 'center', // Setzt die horizontale Ausrichtung des Textes auf 'center', so dass der Text zentriert über dem Pfeil angezeigt wird.
      }
    },
    {
      selector: 'edge[classes="edge"]',
      style: {
        'label': 'data(id)',
        'text-rotation': 'autorotate'
      }
    },
    {
      selector: '.red',
      style: {
        'line-color': 'red',
        'target-arrow-color': 'red'
      }
    },
    {
      selector: '.green',
      style: {
        'line-color': 'green',
        'target-arrow-color': 'green'
      }
    }
  ];