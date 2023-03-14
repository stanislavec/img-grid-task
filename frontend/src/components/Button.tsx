import React from 'react';

import scss from './Button.module.scss';

type IButton = JSX.IntrinsicElements['button'];

function Button(props: IButton) {
  const { children, ...rest } = props;
  return (
    <button {...rest} className={scss.button}>
      {children}
    </button>
  );
}

export default Button;
