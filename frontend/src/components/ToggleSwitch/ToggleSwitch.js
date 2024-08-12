import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ isOn, handleToggle, id }) => {
  return (
    <div className="toggle-switch-container">
      <span className="toggle-label">Display in Portfolio</span>
      <span className="toggle-switch">
        <input
          checked={isOn}
          onChange={handleToggle}
          className="toggle-switch-checkbox"
          id={`toggle-switch-${id}`} // Unique ID for each switch
          type="checkbox"
        />
        <label
          className="toggle-switch-label"
          htmlFor={`toggle-switch-${id}`} // Bind label to the unique ID
        >
          <span className={`toggle-switch-button`} />
        </label>
      </span>
    </div>
  );
};

export default ToggleSwitch;
