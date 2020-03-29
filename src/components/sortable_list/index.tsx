import * as React from 'react';

import { SortableItem } from './item';
import './style.scss';

const { useState, useRef } = React;

interface SortableContainerProps {
  items:string[];
  on_sorted_end:(new_idx:number, old_idx:number) => void;
}

export const SortableContainer = (props:SortableContainerProps) => {
  const { items, on_sorted_end } = props;
  const [moving_item_top, set_moving_item_top] = useState(null);
  const container_el = useRef<HTMLDivElement>(null)

  return (
    <div className="outter-wrapper">
      <ul className="inner-wrapper">
        {
          items.map((item, index) => (
            <SortableItem
                key={`item-${item}`}
                index={index}
                value={item}
                container={container_el.current}
                moving_item_top={moving_item_top}
                set_moving_item_top={set_moving_item_top}
                on_sorted_end={on_sorted_end}
            />
          ))
        }
      </ul>
    </div>
  )
}