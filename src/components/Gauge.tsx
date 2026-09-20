import React from 'react';

interface GaugeProps {
  label: string;
  value: number;
  unit: string;
  type: 'temperature' | 'humidity';
}

const Gauge: React.FC<GaugeProps> = ({ label, value, unit, type }) => {
  return (
    <div className="gauge-container">
      {/* Decorative Screws */}
      <div className="screw tl"></div>
      <div className="screw tr"></div>
      <div className="screw bl"></div>
      <div className="screw br"></div>

      <div className={`gauge-ring ${type}`}></div>
      
      <div className="gauge-inner">
        <div className="gauge-value">
          {value.toFixed(1)}<span style={{ fontSize: '1.2rem', marginLeft: '2px' }}>{unit}</span>
        </div>
        <div className="gauge-label">{label}</div>
      </div>
    </div>
  );
};

export default Gauge;
