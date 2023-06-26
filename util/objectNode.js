import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function ObjectNode({ data, isConnectable }) 
{
  return (
    
      
      <div className="object-node">
        <label>{data.label}</label>        
      </div>
      
      
    
  );
};

export default ObjectNode;
