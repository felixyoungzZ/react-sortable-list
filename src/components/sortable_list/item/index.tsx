import * as React from 'react';

import { HandleIcon } from '../../icon';
import { MovingItem, ContainerBorder } from '../def';
import './style.scss';

const { useState, useRef, useEffect } = React;

interface SortableItemProps {
  index:number;
  value:string;
  on_sorted:(old_idx:number, new_idx:number) => void;
  handle_sorted_end:() => void;
  moving_item?:MovingItem;
  sorted_items:string[];
  set_moving_item:(m_item:MovingItem) => void;
  container_border?:ContainerBorder;
  is_sorting:boolean;
  set_sorting:(is_s:boolean) => void;
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
  const { index, value, on_sorted, handle_sorted_end, moving_item, set_moving_item, container_border, sorted_items, set_sorting, is_sorting } = props;
  const [is_moving, set_moving] = useState(false);
  const [start_y, set_start_y] = useState(0);
  const [delta_y, set_delta_y] = useState(0);
  const [transform_y, set_transform_y] = useState(0);
  const [offset_y, set_offset_y] = useState(0);
  const item_ref = useRef<HTMLLIElement>(null);

  const prev_moving_item = usePrevious<MovingItem>(moving_item);
  const prev_is_sorting = usePrevious<boolean>(is_sorting);

  const is_below_m_item = (m_top:number) => item_ref.current.getBoundingClientRect().top > m_top + ITEM_HEIGHT / 2;
  const is_above_m_item = (m_top:number) => item_ref.current.getBoundingClientRect().bottom < m_top + ITEM_HEIGHT / 2;

  useEffect(() => {
    if (!prev_is_sorting && is_sorting) {
      set_offset_y(0);
    }

    if (is_moving) {
      return;
    }

    if (!item_ref) {
      return;
    }

    if (!moving_item || !prev_moving_item) {
      return;
    }

    // 上一次排序结果
    const idx = sorted_items && sorted_items.indexOf(value);

    // 排序上升
    if (is_below_m_item(prev_moving_item.top) && !is_below_m_item(moving_item.top)) {
      if (idx - 1 < 0) {
        return;
      }
      on_sorted(idx, idx - 1);
    }

    // 排序下降
    if (is_above_m_item(prev_moving_item.top) && !is_above_m_item(moving_item.top)) {
      if (idx + 1 > sorted_items.length - 1) {
        return;
      }
      on_sorted(idx, idx + 1);
    }

  }, [moving_item])

  useEffect(() => {

    const new_idx = sorted_items.indexOf(value);

    let current_offset_y = 0;
    if (new_idx > index) {
      current_offset_y = ITEM_HEIGHT;
    } else if (new_idx < index) {
      current_offset_y = -ITEM_HEIGHT;
    }

    set_offset_y(current_offset_y);
  }, [...sorted_items])

  // 开始拖拽
  const handle_touch_start = (e:React.TouchEvent) => {
    set_moving(true);
    const { pageY } = e.touches[0];
    set_start_y(pageY);

    if (!item_ref || !item_ref.current) {
      return;
    }

    const { top } = item_ref.current.getBoundingClientRect();

    set_delta_y(pageY - top);
    set_moving_item({
      idx: index,
      top,
    });
    set_sorting(true);
  }

  // 拖拽期间
  const handle_touch_move = (e:React.TouchEvent) => {
    const { pageY } = e.touches[0];

    // 处理边界情况
    if (container_border)  {
      const item_top = pageY - delta_y;
      const item_bottom = item_top + ITEM_HEIGHT;

      const { top, bottom } = container_border;
      if (item_top < top ) {
        return;
      }
      if (item_bottom > bottom) {
        return;
      }
    }

    // 移动
    set_transform_y(pageY - start_y);

    const current_top = pageY - delta_y;
    set_moving_item({
      idx: index,
      top: current_top,
    })
  }

  // 拖拽结束
  const handle_touch_end = (e:React.TouchEvent) => {
    set_moving(false);
    set_start_y(0);
    set_delta_y(0);
    set_transform_y(0);
    set_moving_item(undefined);
    set_sorting(false);
    handle_sorted_end();
  }

  // 拖拽期间的位移
  let current_transform_y = 0;
  if (is_moving) {
    current_transform_y = transform_y;
  } else {
    current_transform_y = offset_y;
  }

  return (
    <li
        className={`item ${is_moving ? 'moving' : ''} ${is_sorting ? 'sorting' : ''}`}
        style={
          is_sorting ?
            {
              transform: `translate3d(0, ${current_transform_y}px, 0)`
            } :
            {}         
        }
        onTouchStart={handle_touch_start}
        onTouchMove={handle_touch_move}
        onTouchEnd={handle_touch_end}
        ref={item_ref}
    >
      <div className="item-property">
        <div className="no-wrapper">
          <div className="prefix-no">{sorted_items.indexOf(value)}</div>
        </div>
        <div className="item-value">{value}</div>
      </div>
      <div className="item-icon">
        <HandleIcon is_moving={is_moving} />
      </div>
    </li>
  );
};
