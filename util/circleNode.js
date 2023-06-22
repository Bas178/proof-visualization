import React from 'react';

function CircleNode({ data }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      height: '20px',
      width: '20px',
      backgroundColor: '#e7e6f0'
    }}>
      {data.label}
    </div>
  );
}

export default CircleNode;
