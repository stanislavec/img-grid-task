import React from 'react';
import scss from './Loader.module.scss';

function Loader() {
  return (
    <div className={scss.row}>
      <div className={scss.loader}></div>
    </div>
  );
}

export default Loader;
