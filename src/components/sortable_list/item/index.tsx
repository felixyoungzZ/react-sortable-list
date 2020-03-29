import * as React from 'react';

import { HandleIcon } from '../../icon';
import './style.scss';

const { useState, useRef } = React;

interface SortableItemProps {
  index:number;
  value:string;
}

export const SortableItem = (props:SortableItemProps) => {
  const { index, value } = props;
  const [y, set_y] = useState(0);
  const [start_y, set_start_y] = useState(0);
  const [is_moving, set_moving] = useState(false);
  const item_ref = useRef<HTMLLIElement>(null);

  const handle_touch_start = (e:React.TouchEvent) => {
    set_moving(true);

    if (!item_ref) {
      return;
    }

    const current_delta_y = e.touches[0].pageY;
    set_start_y(current_delta_y);
  }

  const handle_touch_move = (e:React.TouchEvent) => {
    const current_y = e.touches[0].pageY - start_y;
    set_y(current_y);
  }

  const handle_touch_end = (e:React.TouchEvent) => {
    set_moving(false);
    set_start_y(0);
  }

  const handle_context_menu = (e:any) => {
    e.preventDefault();
  }

  return (
    <li
        className={`item ${is_moving ? 'moving' : ''}`}
        style={
          is_moving ?
          {
            transform: `translate3d(0, ${y}px, 0)`,
          } :
          {}
        }
        ref={item_ref}
        onTouchStart={handle_touch_start}
        onTouchMove={is_moving ? handle_touch_move : void(0)}
        onTouchEnd={handle_touch_end}
        onContextMenu={handle_context_menu}
    >
      <div className="item-property">
        <div className="no-wrapper">
          <div className="prefix-no">{index}</div>
        </div>
        <div className="item-value">{value}</div>
      </div>
      <div className="item-icon">
        <HandleIcon is_moving={is_moving} />
      </div>
    </li>
  );
};
