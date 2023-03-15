import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
type ILayout = {
  children?: ReactNode;
};

function Layout({ children = <></> }: ILayout) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      {children}
    </>
  );
}

export const withLayout = (children: ReactNode = <></>) => <Layout>{children}</Layout>;

export default Layout;
