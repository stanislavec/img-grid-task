import React from 'react';
import ButtonLink from './ButtonLink';
import scss from './Header.module.scss';

function Header() {
  return (
    <header className={scss.header}>
      <ButtonLink to="/">Photos</ButtonLink>
      <ButtonLink to="/favorites">Favorites</ButtonLink>
    </header>
  );
}

export default Header;
