import React from 'react';
import './Loading.css';
const Loading = () => {
  return (
    <div
      style={{ textAlign: 'center' }}
    >
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
