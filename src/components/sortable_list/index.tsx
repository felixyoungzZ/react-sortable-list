import * as React from 'react';

import { SortableItem } from './item';
import './style.scss';

interface SortableContainerProps {
  items:string[];
}

export const SortableContainer = (props:SortableContainerProps) => {
  const { items } = props;

  return (
    <div className="outter-wrapper">
      <ul className="inner-wrapper">
        {
          items.map((item, index) => <SortableItem key={`item-${item}`} index={index} value={item} />)
        }
      </ul>
    </div>
  )
}