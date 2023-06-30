import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function ObjectNode({ data, isConnectable  }) 
{
  
  return (
    
      
      <div className="object-node" style={{backgroundColor: data.backgroundColor, display: 'flex', justifyContent: 'center', border: data.borderStyle,  }}>
        <label style={{color: data.labelColor}}>{data.label}</label>        
      </div>
      
      
    
  );
};

export default ObjectNode;
