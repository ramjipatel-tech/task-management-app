import React from 'react';
import './StatCard.css';

const StatCard = ({ label, value, icon, color = 'primary' }) => {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h4>{label}</h4>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
