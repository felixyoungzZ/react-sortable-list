import * as React from 'react';

import { Header } from '../../components/header';
import { SortableContainer } from '../../components/sortable_list';
import * as U from '../../modules/utils';
import './style.scss';

const {
  useState,
} = React;

export const App = () => {
  const [items, set_items] = useState(['选项A', '选项B', '选项C', '选项D']);

  const on_sorted_end = (new_idx:number, old_idx:number) => {
    set_items((items) => U.swap<string>(new_idx, old_idx, items))
  }

  return (
    <div className="container">
      <Header />
      <SortableContainer items={items} on_sorted_end={on_sorted_end} />
    </div>
  )
}