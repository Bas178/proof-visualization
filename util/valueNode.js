import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function ValueNode({ data, isConnectable }) 
{
  return (
    
      
      <div className="value-node">
        <label>{data.label}</label>        
      </div>
      
      
    
  );
};

export default ValueNode;
