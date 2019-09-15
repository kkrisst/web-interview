import React from 'react';

import './selectable-button.styles.scss';

const SelectableButton = ({ label, selected, handleSelect }) => {
  return (
    <div
      className={`selectable-button ${selected ? 'selected' : ''}`}
      onClick={handleSelect}
    >{label}</div>
  );
};

export default SelectableButton;