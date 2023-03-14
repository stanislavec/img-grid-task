import React, { ReactNode } from 'react';
import Header from './Header';
type ILayout = {
  children?: ReactNode;
};

function Layout({ children = <></> }: ILayout) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export const withLayout = (children: ReactNode = <></>) => <Layout>{children}</Layout>;

export default Layout;
