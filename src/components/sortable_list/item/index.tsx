import * as React from 'react';

import { HandleIcon } from '../../icon';
import './style.scss';

const { useState, useRef, useEffect } = React;

interface SortableItemProps {
  index:number;
  value:string;
  moving_item_top:number|null;
  set_moving_item_top:(top:number) => void;
  container:HTMLDivElement|null;
  on_sorted_end:(new_idx:number, old_idx:number) => void;
}

function usePrevious<T>(value:T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const ITEM_HEIGHT = 54;

export const SortableItem = (props:SortableItemProps) => {
  const { index, value, container, moving_item_top, set_moving_item_top, on_sorted_end } = props;
  const [y, set_y] = useState(0);
  const [start_y, set_start_y] = useState(0);
  const [delta_y, set_delta_y] = useState(0);
  const [is_moving, set_moving] = useState(false);
  const item_ref = useRef<HTMLLIElement>(null);
  const prev_moving_item_top = usePrevious<number>(moving_item_top);

  const is_up = (m_top:number) => !is_moving && ((m_top + ITEM_HEIGHT / 2) > (item_ref && item_ref.current.getBoundingClientRect().top));

  const is_down = (m_top:number) => !is_moving && ((m_top + ITEM_HEIGHT / 2) > (item_ref && item_ref.current.getBoundingClientRect().bottom));

  useEffect(() => {
    if (moving_item_top == null || prev_moving_item_top == null) {
      return;
    }

    if (is_up(moving_item_top) && !is_up(prev_moving_item_top)) {
      on_sorted_end(index, index - 1);
    }

    if (is_down(prev_moving_item_top) && !is_down(moving_item_top)) {
      on_sorted_end(index, index + 1);
    }

  }, [moving_item_top]);

  const handle_touch_start = (e:React.TouchEvent) => {
    set_moving(true);

    if (!item_ref) {
      return;
    }

    const { pageY } = e.touches[0];
    set_start_y(pageY);
    set_delta_y(pageY - item_ref.current.getBoundingClientRect().top);
  }

  const handle_touch_move = (e:React.TouchEvent) => {
    const { pageY } = e.touches[0];

    set_y(pageY - start_y);
    set_moving_item_top(pageY - delta_y);
  }

  const handle_touch_end = (e:React.TouchEvent) => {
    set_moving(false);
    set_start_y(0);
    set_delta_y(0);
    set_moving_item_top(null);
  }

  const handle_context_menu = (e:any) => {
    e.preventDefault();
  }

  const transform_y = is_moving ? y : 0;

  return (
    <li
        className={`item ${is_moving ? 'moving' : ''}`}
        style={
          moving_item_top !== null ?
            {
              transform: `translate3d(0, ${transform_y}px, 0)`
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
