import * as React from 'react';

import './style.scss';

interface HandleIconProps {
  is_moving?:boolean;
}

export const HandleIcon = (props:HandleIconProps) => {
  const { is_moving } = props;

  return (
    <div className={`handle-icon ${is_moving ? 'moving' : ''}`}>
      <div className="line" />
      <div className="line" />
      <div className="line" />
    </div>
  )
}
