import * as React from 'react';

import './style.scss';

interface TipsProps {
  text:string;
  type: 'error' | 'info';
}

export const Tips = (props:TipsProps) => {
  const { text, type } = props;

  return (
    <div className={`tips ${type === 'error' ? 'error' : ''}`}>
      {text}
    </div>
  )
}