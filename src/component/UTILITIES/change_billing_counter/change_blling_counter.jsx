// CounterInfo.js
import React from 'react';
import './change_billing_counter.css';

const CounterInfo = () => {
  return (
    <div className="counter-info">
      <div className="info-text">
        <span className="info-icon">ℹ</span>
        <span className="activated">Activated Counter Information!!</span>
        <span className="counter">Counter</span>
        <span className="opd-counter">OPD-Counter</span>
        <span className="already-activated">Already Activated.</span>
      </div>
      <div className="action-area">
        <span className="change-question">Do You Want To Change The Counter?</span>
        <button className="deactivate-btn">Deactivate Counter</button>
      </div>
    </div>
  );
};

export default CounterInfo;
