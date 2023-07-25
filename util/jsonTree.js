import React from 'react';
import { JSONTree } from 'react-json-tree';



const ASTree = ({jsonData}) => (
  <div>
    <JSONTree data={jsonData} />
  </div>
);

export default ASTree;
