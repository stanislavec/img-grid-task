import React from 'react';
import cn from 'classnames';
import { Link, LinkProps, useLocation } from 'react-router-dom';

import scss from './ButtonLink.module.scss';

type IButtonLink = LinkProps;

function ButtonLink(props: IButtonLink) {
  const { children, ...rest } = props;
  const { pathname } = useLocation();

  return (
    <Link {...rest} className={cn(scss.button, { [scss.active]: rest.to === pathname })}>
      {children}
    </Link>
  );
}

export default ButtonLink;
