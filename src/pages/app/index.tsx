import * as React from 'react';

import { Header } from '../../components/header';
import { SortableContainer } from '../../components/sortable_list';
import './style.scss';

const {
  useState,
} = React;

export const App = () => {
  const [items, set_items] = useState(['选项A', '选项B', '选项C', '选项D']);

  return (
    <div className="container">
      <Header />
      <SortableContainer items={items} />
    </div>
  )
}