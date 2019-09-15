import React from 'react';

import './selectable-button.styles.scss';

const SelectableButton = ({ label, handleSelect }) => {
  return (
    <div
      className='selectable-button'
      onClick={handleSelect}
    >{label}</div>
  );
};

export default SelectableButton;