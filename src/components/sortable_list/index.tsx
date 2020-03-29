import * as React from 'react';

import { SortableItem } from './item';
import { MovingItem, ContainerBorder } from './def';
import * as U from '../../modules/utils';
import './style.scss';

const { useState, useRef, useEffect } = React;

interface SortableContainerProps {
  items:string[];
  on_sorted_end:(items:string[]) => void;
}

export const SortableContainer = (props:SortableContainerProps) => {
  const { items, on_sorted_end } = props;
  // 记录是否正在拖拽排序
  const [is_sorting, set_sorting] = useState(false);
  // 储存每一次移动的结果
  const [sorted_items, set_sorted_items] = useState([...items]);
  // 当前正在移动的 item
  const [moving_item, set_moving_item] = useState<MovingItem>(undefined)
  // 容器边界
  const [container_border, set_container_border] = useState<ContainerBorder>(undefined)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (container && container.current) {
      const { top, bottom } = container.current.getBoundingClientRect();

      set_container_border({ top, bottom });
    }
  }, [container])

  const handle_context_menu = (e:any) => {
    e.preventDefault();
  }

  // 每一次的排序结果更新
  const on_sorted = (old_idx:number, new_idx:number) => {
    const new_sorted_items = U.swap(old_idx, new_idx, sorted_items);
    set_sorted_items(new_sorted_items);
  }

  // 拖拽排序完毕更新结果
  const handle_sorted_end = () => {
    on_sorted_end([...sorted_items]);
  }

  return (
    <div
        className="outter-wrapper"
        onContextMenu={handle_context_menu}
        ref={container}
    >
      <ul className="inner-wrapper">
        {
          items.map((item, index) => (
            <SortableItem
                key={`item-${item}`}
                index={index}
                value={item}
                on_sorted={on_sorted}
                handle_sorted_end={handle_sorted_end}
                moving_item={moving_item}
                sorted_items={sorted_items}
                set_moving_item={set_moving_item}
                container_border={container_border}
                is_sorting={is_sorting}
                set_sorting={set_sorting}
            />
          ))
        }
      </ul>
    </div>
  )
}