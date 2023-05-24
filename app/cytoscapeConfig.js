import elementStyle from "./element";
import sbgnsvg from "sbgnStyle/glyph";

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

export const cytoscapeStackCreateStack = [{
  data: { id: "stack", class: "complex", label: '', clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 0.0489105995644, y: 0.9053834474291, w: 254.08954881649527, h: 304.8762412720447 }, color: 'green' },
  position: { x: 0, y: 0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: { id: "stack-name", class: "macromolecule", label: "result:stack", parent: "stack", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 0.7050429901893, y: 0.5935040834514, w: 120, h: 60 }, color: '#f6f6f6' },
  position: { x: 0.0, y: 0.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: {
    id: "stack-var", class: "phenotype", label: "cnt=0", parent: "stack", clonemarker: false,
    stateVariables: [{ id: "stack-nullptr", class: "state variable", state: { variable: "", value: "?nullptr" } }],
    unitsOfInformation: [], bbox: { x: 729.7050429901893, y: 725.5935040834514, w: 120, h: 60 }, color: '#f6f6f6'
  },
  position: { x: 0.0, y: 100.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: false,
  pannable: false,
  classes: ""
},
{
  data: {
    id: "result", class: "complex", label: '', clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 340.0, y: 50.0, w: 250.0, h: 300.0 }, color: '#f6f6f6'
  },
  position: { x: 340, y: 50 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: { id: "result-name", class: "macromolecule", label: "⏊", parent: "result", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 729.7050429901893, y: 725.5935040834514, w: 120, h: 60 }, color: '#f6f6f6' },
  position: { x: 340.0, y: 50.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: {
    id: "stack-result",
    class: "green",
    cardinality: 0,
    source: "stack",
    target: "result",
    bendPointPositions: [],
    portSource: "stack",
    portTarget: "result",
    label: 'head',
    color: 'green'
  },
  position: {
    x: 0,
    y: 0
  },
  group: "edges",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: true,
  classes: ""
},
];

export const cytoscapeStackCreateNode = [{
  data: { id: "node", class: "complex", label: '', clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 0.0489105995644, y: 0.9053834474291, w: 254.08954881649527, h: 304.8762412720447 }, color: 'green' },
  position: { x: 0, y: 0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: { id: "node-name", class: "macromolecule", label: "n:node", parent: "node", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 0.7050429901893, y: 0.5935040834514, w: 120, h: 60 }, color: '#f6f6f6' },
  position: { x: 0.0, y: 0.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: {
    id: "node-var", class: "phenotype", label: "value=v", parent: "node", clonemarker: false,
    stateVariables: [{ id: "stack-nullptr", class: "state variable", state: { variable: "", value: "?nullptr" } }],
    unitsOfInformation: [], bbox: { x: 729.7050429901893, y: 725.5935040834514, w: 120, h: 60 }, color: '#f6f6f6'
  },
  position: { x: 0.0, y: 100.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: false,
  pannable: false,
  classes: ""
},
{
  data: {
    id: "result", class: "complex", label: '', clonemarker: false, stateVariables: [{
      id: "result-nullptr",
      class: "state variable",
      state: {
        variable: "",
        value: "?nullptr"
      }
    }], unitsOfInformation: [], bbox: { x: 340.0, y: 50.0, w: 250.0, h: 300.0 }, color: '#f6f6f6'
  },
  position: { x: 340, y: 50 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: { id: "result-name", class: "macromolecule", label: "result", parent: "result", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 729.7050429901893, y: 725.5935040834514, w: 120, h: 60 }, color: '#f6f6f6' },
  position: { x: 340.0, y: 50.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: {
    id: "node-result",
    class: "green",
    cardinality: 0,
    source: "node",
    target: "result",
    bendPointPositions: [],
    portSource: "node",
    portTarget: "result",
    label: 'next',
    color: 'green'
  },
  position: {
    x: 0,
    y: 0
  },
  group: "edges",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: true,
  classes: ""
},
];

export const cytoscapeStackPush = [{
  data: { id: "constrains", class: "complex", label: '', clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 100.0489105995644, y: 0.9053834474291, w: 254.08954881649527, h: 304.8762412720447 }, color: 'yellow' },
  position: { x: 550, y: -50 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},{
  data: { id: "constrains-name", class: "macromolecule", label: "constrains", parent: "constrains", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 0.7050429901893, y: 0.5935040834514, w: 120, h: 60 }, color: 'yellow' },
  position: { x: 550.0, y: -50.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},{
  data: { id: "constrains-var", class: "phenotype", label: "• c < INT_MAX", parent: "constrains", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 0.7050429901893, y: 0.5935040834514, w: 180, h: 60 }, color: 'yellow' },
  position: { x: 550.0, y: 50.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: true,
  classes: ""
},{
  data: { id: "stack", class: "complex", label: '', clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 0.0489105995644, y: 0.9053834474291, w: 254.08954881649527, h: 304.8762412720447 }, color: '#f6f6f6' },
  position: { x: 0, y: 0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: { id: "stack-name", class: "macromolecule", label: "s:stack", parent: "stack", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 0.7050429901893, y: 0.5935040834514, w: 120, h: 60 }, color: '#f6f6f6' },
  position: { x: 0.0, y: 0.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: {
    id: "stack-var", class: "phenotype", label: "cnt = ?c ~> ?c+1", parent: "stack", clonemarker: false,
    stateVariables: [{ id: "stack-nullptr", class: "state variable", state: { variable: "", value: "?nullptr" } }],
    unitsOfInformation: [], bbox: { x: 729.7050429901893, y: 725.5935040834514, w: 120, h: 60 }, color: 'purple'
  },
  position: { x: 0.0, y: 100.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: false,
  pannable: false,
  classes: ""
},
{
  data: {
    id: "node", class: "complex", label: '', clonemarker: false, stateVariables: [{
      id: "node-nullptr",
      class: "state variable",
      state: {
        variable: "",
        value: "?nullptr"
      }
    }], unitsOfInformation: [], bbox: { x: 340.0, y: 50.0, w: 250.0, h: 300.0 }, color: '#f6f6f6'
  },
  position: { x: 340, y: 50 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: { id: "node-name", class: "macromolecule", label: "?h:node", parent: "node", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 729.7050429901893, y: 725.5935040834514, w: 120, h: 60 }, color: '#f6f6f6' },
  position: { x: 340.0, y: 50.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: { id: "node0", class: "complex", label: '', clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 770.0489105995644, y: 603.9053834474291, w: 254.08954881649527, h: 304.8762412720447 }, color: 'green' },
  position: { x: 10, y: 250 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: { id: "node0-name", class: "macromolecule", label: "?n:node", parent: "node0", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 729.7050429901893, y: 725.5935040834514, w: 120, h: 60 }, color: '#f6f6f6' },
  position: { x: 10.0, y: 250.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: false,
  pannable: false,
  classes: ""
},
{
  data: { id: "node0-var", class: "phenotype", label: "value=v", parent: "node0", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 729.7050429901893, y: 725.5935040834514, w: 120, h: 60 }, color: '#f6f6f6' },
  position: { x: 10.0, y: 350.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: false,
  pannable: false,
  classes: ""
},

{
  data: {
    id: "stack-node",
    class: "red",
    cardinality: 0,
    source: "stack",
    target: "node",
    bendPointPositions: [],
    portSource: "stack",
    portTarget: "node",
    label: 'head',
    color: 'red'
  },
  position: {
    x: 0,
    y: 0
  },
  group: "edges",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: true,
  classes: ""
},
{
  data: {
    id: "stack-node0",
    class: "green",
    cardinality: 0,
    source: "stack",
    target: "node0",
    bendPointPositions: [],
    portSource: "stack",
    portTarget: "node0",
    label: 'head',
    color: 'green'
  },
  position: {
    x: 0,
    y: 0
  },
  group: "edges",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: true,
  classes: ""
},
{
  data: {
    id: "stack-node0",
    class: "green",
    cardinality: 0,
    source: "stack",
    target: "node0",
    bendPointPositions: [],
    portSource: "stack",
    portTarget: "node0"
  },
  position: {
    x: 0,
    y: 0
  },
  group: "edges",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: true,
  classes: "edge green"
},
{
  data: {
    id: "node0-node",
    class: "green",
    cardinality: 0,
    source: "node0",
    target: "node",
    bendPointPositions: [],
    portSource: "node0",
    portTarget: "node",
    label: 'next',
    color: 'green'
  },
  position: {
    x: 0,
    y: 0
  },
  group: "edges",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: true,
  classes: "edge green"
},
];

export const cytoscapeStackPop = [{
  data: { id: "stack", class: "complex", label: '', clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 0.0489105995644, y: 0.9053834474291, w: 254.08954881649527, h: 304.8762412720447 }, color: '#f6f6f6' },
  position: { x: 0, y: 0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: { id: "stack-name", class: "macromolecule", label: "s:stack", parent: "stack", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 0.7050429901893, y: 0.5935040834514, w: 120, h: 60 }, color: '#f6f6f6' },
  position: { x: 0.2473300230395, y: 0.5128559182721 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: {
    id: "stack-var", class: "phenotype", label: "cnt = ?c ~> c-1", parent: "stack", clonemarker: false,
    stateVariables: [{ id: "stack-nullptr", class: "state variable", state: { variable: "", value: "?nullptr" } }],
    unitsOfInformation: [], bbox: { x: 729.7050429901893, y: 725.5935040834514, w: 120, h: 60 }, color: 'purple'
  },
  position: { x: 0.0, y: 100.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: false,
  pannable: false,
  classes: ""
},
{
  data: {
    id: "node", class: "complex", label: '', clonemarker: false, stateVariables: [{
      id: "node-nullptr",
      class: "state variable",
      state: {
        variable: "",
        value: "?nullptr"
      }
    }], unitsOfInformation: [], bbox: { x: 340.0, y: 50.0, w: 250.0, h: 300.0 }, color: '#f6f6f6'
  },
  position: { x: 350, y: 100 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: { id: "node-name", class: "macromolecule", label: "?n:node", parent: "node", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 729.7050429901893, y: 725.5935040834514, w: 120, h: 60 }, color: '#f6f6f6' },
  position: { x: 350.0, y: 100.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
}, {
  data: { id: "node0", class: "complex", label: '', clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 340.0, y: 50.0, w: 250.0, h: 300.0 }, color: 'red' },
  position: { x: 150, y: 350 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: { id: "node0-name", class: "macromolecule", label: "?he:node", parent: "node0", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 729.7050429901893, y: 725.5935040834514, w: 120, h: 60 }, color: '#f6f6f6' },
  position: { x: 150.0, y: 350.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: false,
  pannable: false,
  classes: ""
},
{
  data: { id: "node0-var", class: "phenotype", label: "value=?res", parent: "node0", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 729.7050429901893, y: 725.5935040834514, w: 120, h: 60 }, color: '#f6f6f6' },
  position: { x: 150, y: 450 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: false,
  pannable: false,
  classes: ""
},
//{ data: { id: 'stack', label: 's:stack', variables: '', color: 'orange' }, classes: 'stack', position: { x: 60, y: 110 } },
//{ data: { id: 'node', label: '?n:node', variables: '', color: 'orange' }, classes: 'node', position: { x: 340, y: 50 } },
//{ data: { id: 'node0', label: '?he:node', variables: 'value=res', color: 'red' }, classes: 'node0', position: { x: 120, y: 270 } },
{
  data: { id: "result", class: "compartment", label: 'result', clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 0.0489105995644, y: 0.9053834474291, w: 254.08954881649527, h: 304.8762412720447 }, color: 'purple' },
  position: { x: 600, y: 0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: { id: "result-res", class: "phenotype", label: "?res", parent: "result", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 0.7050429901893, y: 0.5935040834514, w: 120, h: 60 }, color: '#f6f6f6' },
  position: { x: 600, y: 0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
}, {
  data: {
    id: "stack-node",
    class: "green",
    cardinality: 0,
    source: "stack",
    target: "node",
    bendPointPositions: [],
    portSource: "stack",
    portTarget: "node",
    label: 'head',
    color: 'green'
  },
  position: {
    x: 0,
    y: 0
  },
  group: "edges",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: true,
  classes: "edge green"
},
{
  data: {
    id: "stack-node0",
    class: "red",
    cardinality: 0,
    source: "stack",
    target: "node0",
    bendPointPositions: [],
    portSource: "stack",
    portTarget: "node0",
    label: 'head',
    color: 'red'
  },
  position: {
    x: 0,
    y: 0
  },
  group: "edges",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: true,
  classes: "edge red"
},
{
  data: {
    id: "node0-node",
    class: "red",
    cardinality: 0,
    source: "node0",
    target: "node",
    bendPointPositions: [],
    portSource: "node0",
    portTarget: "node",
    label: 'next',
    color: 'red'
  },
  position: {
    x: 0,
    y: 0
  },
  group: "edges",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: true,
  classes: "edge red"
},
  //{ data: { id: 'edge1', source: 'stack', target: 'node', label: 'head', color: 'green' }, classes: 'edge green' },
  //{ data: { id: 'edge2', source: 'stack', target: 'node0', label: 'head', color: 'red' }, classes: 'edge red' },
  //{ data: { id: 'edge3', source: 'node0', target: 'node', label: 'next', color: 'red' }, classes: 'edge red' },
];

export const cytoscapeStackDispose = [{
  data: { id: "stack", class: "complex", label: '', clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 0.0489105995644, y: 0.9053834474291, w: 254.08954881649527, h: 304.8762412720447 }, color: 'red' },
  position: { x: 0, y: 0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: { id: "stack-name", class: "macromolecule", label: "s:stack", parent: "stack", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 0.7050429901893, y: 0.5935040834514, w: 120, h: 60 }, color: '#f6f6f6' },
  position: { x: 0.0, y: 0.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: {
    id: "stack-var", class: "phenotype", label: "cnt=result", parent: "stack", clonemarker: false,
    stateVariables: [{ id: "stack-nullptr", class: "state variable", state: { variable: "", value: "?nullptr" } }],
    unitsOfInformation: [], bbox: { x: 729.7050429901893, y: 725.5935040834514, w: 120, h: 60 }, color: '#f6f6f6'
  },
  position: { x: 0.0, y: 100.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: false,
  pannable: false,
  classes: ""
},
{
  data: {
    id: "result", class: "complex", label: '', clonemarker: false, stateVariables: [{
      id: "result-nullptr",
      class: "state variable",
      state: {
        variable: "",
        value: "?nullptr"
      }
    }], unitsOfInformation: [], bbox: { x: 340.0, y: 50.0, w: 250.0, h: 300.0 }, color: '#f6f6f6'
  },
  position: { x: 340, y: 50 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: { id: "result-name", class: "macromolecule", label: "result", parent: "result", clonemarker: false, stateVariables: [], unitsOfInformation: [], bbox: { x: 729.7050429901893, y: 725.5935040834514, w: 120, h: 60 }, color: '#f6f6f6' },
  position: { x: 340.0, y: 50.0 },
  group: "nodes",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: false,
  classes: ""
},
{
  data: {
    id: "stack-result",
    class: "green",
    cardinality: 0,
    source: "stack",
    target: "result",
    bendPointPositions: [],
    portSource: "stack",
    portTarget: "result",
    label: 'head',
    color: 'green'
  },
  position: {
    x: 0,
    y: 0
  },
  group: "edges",
  removed: false,
  selected: false,
  selectable: true,
  locked: false,
  grabbable: true,
  pannable: true,
  classes: ""
},
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
      'label': function (ele) {
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

export const sbgnStyleSheet = [


  // general node style
  {
    selector: 'node',
    style: {
      'shape': (node) => elementStyle.sbgnShape(node),
      'content': (node) => elementStyle.sbgnContent(node),
      'font-size': 20,
      'width': (node) => elementStyle.width(node),
      'height': (node) => elementStyle.height(node),
      'text-valign': 'center',
      'text-halign': 'center',
      'border-width': 1.5,
      'border-color': '#555',
      //('data(color)' !== '') ? 'data(color)' : '#f6f6f6',
      //'background-color': ('data(color)' !== '') ? 'data(color)' : '#f6f6f6',
      'background-color': ('data(color)' === undefined) ? '#f6f6f6' : 'data(color)',
      //'background-color': 'data(color) ? data(color) : #f6f6f6',
      //'background-color': '#f6f6f6',
      'text-opacity': 1,
      'opacity': 1,
      'text-outline-color': 'white',
      'text-outline-opacity': 1,
      'text-outline-width': 0.75
    }
  },
  {
    selector: 'node:selected',
    style: {
      'background-color': '#d67614',
      'target-arrow-color': '#000',
      'text-outline-color': '#000'
    }
  },
  {
    selector: 'node:active',
    style: {
      'overlay-color': '#d67614',
      'overlay-padding': '14'
    }
  },

  // draw sbgn specific styling (auxiliary items, clonemarker, etc.)
  {
    selector: `
            node[class="unspecified entity"],
            node[class="simple chemical"], node[class="simple chemical multimer"],
            node[class="macromolecule"], node[class="macromolecule multimer"],
            node[class="nucleic acid feature"], node[class="nucleic acid feature multimer"],
            node[class="perturbing agent"],
            node[class="phenotype"],
            node[class="complex"], node[class="complex multimer"], node[class="compartment"]
          `,
    style: {
      'background-image': (node) => sbgnsvg.draw(node).bgImage,
      'background-width': (node) => sbgnsvg.draw(node).bgWidth,
      'background-position-x': (node) => sbgnsvg.draw(node).bgPosX,
      'background-position-y': (node) => sbgnsvg.draw(node).bgPosY,
      'background-fit': (node) => sbgnsvg.draw(node).bgFit,
      'background-clip': (node) => sbgnsvg.draw(node).bgClip,
      'padding': (node) => sbgnsvg.draw(node).padding,
      'border-width': (node) => sbgnsvg.draw(node).borderWidth
    }
  },

  {
    selector: `
            node[class="simple chemical multimer"],
            node[class="macromolecule multimer"],
            node[class="nucleic acid feature multimer"],
            node[class="complex multimer"]
          `,
    style: {
      'ghost': 'yes',
      'ghost-opacity': 1
    }
  },

  {
    selector: `
            node[class="macromolecule multimer"],
            node[class="nucleic acid feature multimer"]
          `,
    style: {
      'ghost-offset-x': 12,
      'ghost-offset-y': 12
    }
  },

  {
    selector: `
            node[class="simple chemical multimer"]
          `,
    style: {
      'ghost-offset-x': 5,
      'ghost-offset-y': 5
    }
  },

  {
    selector: `
            node[class="complex multimer"]
          `,
    style: {
      'ghost-offset-x': 16,
      'ghost-offset-y': 16
    }
  },

  // compound node specific style
  {
    selector: 'node[class="complex"], node[class="complex multimer"], node[class="compartment"]',
    style: {
      'compound-sizing-wrt-labels': 'exclude',
      'text-valign': 'bottom',
      'text-halign': 'center',
    }
  },

  // process node specific style
  {
    selector: 'node[class="association"], node[class="dissociation"]',
    style: {
      'background-opacity': 1
    }
  },
  {
    selector: 'node[class="association"]',
    style: {
      'background-color': '#6B6B6B'
    }
  },

  // source and sink and dissociation are drawn differently because
  // of their unique shape
  {
    selector: 'node[class="source and sink"]',
    style: {
      'background-image': (node) => sbgnsvg.draw(node),
      'background-fit': 'none',
      'background-width': '100%',
      'background-height': '100%',
      'background-clip': 'none',
      'background-repeat': 'no-repeat',
      'border-width': 0,
      'shape-polygon-points': '-0.86, 0.5, -0.75, 0.65, -1, 0.95, -0.95, 1, -0.65, 0.75, -0.5, 0.86, 0, 1, 0.5, 0.86, 0.71, 0.71, 0.86, 0.5, 1, 0, 0.86, -0.5, 0.75, -0.65, 1, -0.95, 0.95, -1, 0.65, -0.75, 0.5, -0.86, 0, -1, -0.5, -0.86, -0.71, -0.71, -0.86, -0.5, -1, 0',
    }
  },

  // source and sink and dissociation are drawn differently because
  // of their unique shape
  {
    selector: 'node[class="dissociation"]',
    style: {
      'background-image': (node) => sbgnsvg.draw(node),
      'background-fit': 'none',
      'background-width': '100%',
      'background-height': '100%',
      'background-clip': 'none',
      'background-repeat': 'no-repeat',
      'border-width': 0,
    }
  },

  // edge styling
  {
    selector: 'edge',
    style: {
      'arrow-scale': 1.75,
      'curve-style': 'bezier',
      'line-color': '#555',
      'target-arrow-fill': 'hollow',
      'source-arrow-fill': 'hollow',
      'width': 1.5,
      'target-arrow-color': '#555',
      'source-arrow-color': '#555',
      'text-border-color': '#555',
      'color': '#555'
    }
  },
  {
    selector: 'edge:selected',
    style: {
      'color': '#d67614',
      'line-color': '#d67614',
      'text-border-color': '#d67614',
      'source-arrow-color': '#d67614',
      'target-arrow-color': '#d67614'
    }
  },
  {
    selector: 'edge:active',
    style: {
      'background-opacity': 0.7, 'overlay-color': '#d67614',
      'overlay-padding': '8'
    }
  },
  {
    selector: 'edge[cardinality > 0]',
    style: {
      'text-background-shape': 'rectangle',
      'text-border-opacity': '1',
      'text-border-width': '1',
      'text-background-color': 'white',
      'text-background-opacity': '1'
    }
  },
  {
    selector: 'edge[class="consumption"][cardinality > 0], edge[class="production"][cardinality > 0]',
    style: {
      'source-label': (edge) => '' + edge.data('cardinality'),
      'source-text-offset': 10
    }
  },
  {
    selector: 'edge[class]',
    style: {
      'target-arrow-shape': (edge) => elementStyle.sbgnArrowShape(edge),
      'source-arrow-shape': 'none'
    }
  },
  {
    selector: 'edge[class="inhibition"]',
    style: {
      'target-arrow-fill': 'filled'
    }
  },
  {
    selector: 'edge[class="production"]',
    style: {
      'target-arrow-fill': 'filled'
    }
  },
  {
    selector: 'edge[class="red"]',
    style: {
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'line-color': 'red',
      'target-arrow-color': 'red',
      'target-arrow-fill': 'filled',
      'text-halign': 'center',
      'text-valign': 'top',
      'label': 'data(label)',
      'color': 'data(color)'
    }
  },
  {
    selector: 'edge[class="green"]',
    style: {
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'line-color': '#0f0',
      'target-arrow-color': '#0f0',
      'target-arrow-fill': 'filled',
      'text-halign': 'center',
      'text-valign': 'top',
      'label': 'data(label)',
      'color': 'data(color)'
    }
  },


  // core
  {
    selector: 'core',
    style: {
      'selection-box-color': '#d67614',
      'selection-box-opacity': '0.2', 'selection-box-border-color': '#d67614'
    }
  }
]