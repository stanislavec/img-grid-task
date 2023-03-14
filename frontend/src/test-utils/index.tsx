import React, { ReactElement } from 'react';
import { createBrowserRouter, createMemoryRouter, RouterProvider } from 'react-router-dom';

export const withRouter = (Component: ReactElement<unknown, any>, path: string = '/') => {
  const router = createBrowserRouter([
    {
      path,
      element: Component,
    },
  ]);

  return <RouterProvider router={router} />;
};

export const withMemotyRouter = (
  Component: ReactElement<unknown, any>,
  { route = '/', path = '/' } = {},
) => {
  const router = createMemoryRouter(
    [
      {
        path,
        element: Component,
      },
    ],
    {
      initialEntries: [route],
    },
  );
  return <RouterProvider router={router} />;
};
