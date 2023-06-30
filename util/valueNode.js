import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function ValueNode({ data, isConnectable }) 
{
  return (
    
      
      <div className="value-node" style={{backgroundColor: data.backgroundColor, display: 'flex', justifyContent: 'center',}}>
        <label style={{color: data.labelColor}}>{data.label}</label>        
      </div>
      
      
    
  );
};

export default ValueNode;
