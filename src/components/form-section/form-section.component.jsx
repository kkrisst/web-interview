import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './form-section.styles.scss';

const FormSection = ({ children, title, iconName }) => {

  return (
    <div className='form-section'>
      <div className='section-header'>
        <div className='icon'>
          <FontAwesomeIcon icon={iconName} />
        </div>
        {title}
      </div>
      {children}
    </div>
  );
};

export default FormSection;