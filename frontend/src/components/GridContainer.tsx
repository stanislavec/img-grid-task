import React, { Fragment } from 'react';
import scss from './GridContainer.module.scss';

interface IContainer<T> {
  isCheckedToBeEmpty?: boolean;
  items: T[];
  renderItem(item: T): JSX.Element;
  getKey(item: T): string | number;
}

function GridContainer<T = unknown>(props: IContainer<T>) {
  const { items, renderItem, getKey, isCheckedToBeEmpty = true } = props;

  if (!renderItem || typeof renderItem !== 'function')
    throw Error('Render function is not passed as a prop');

  if (!getKey || typeof getKey !== 'function')
    throw Error('GetKey function is not passed as a prop');

  if (!items.length && isCheckedToBeEmpty) return <div className={scss.empty}>No data...</div>;

  return (
    <div className={scss.container}>
      {items.map((item) => (
        <Fragment key={getKey(item)}>{renderItem(item)}</Fragment>
      ))}
    </div>
  );
}

export default GridContainer;
