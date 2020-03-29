import * as React from 'react';

import { Header } from '../../components/header';
import { SortableContainer } from '../../components/sortable_list';
import * as U from '../../modules/utils';
import './style.scss';

const {
  useState,
} = React;

type Items = string[];

export const App = () => {
  const [items, set_items] = useState<Items>(['选项A', '选项B', '选项C', '选项D']);

  const on_sorted_end = (sorted_items:Items) => {
    set_items(sorted_items)
  }

  return (
    <div className="container">
      <Header />
      <SortableContainer items={items} on_sorted_end={on_sorted_end} />
    </div>
  )
}