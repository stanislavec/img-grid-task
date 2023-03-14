import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { withLayout } from 'components/Layout';
import { PhotoContext } from 'context/useImageContext';
import usePhoto from 'hooks/usePhoto';
import routes from 'routes';
import Favorites from 'views/Favotites';
import Home from 'views/Home';
import Photo from 'views/Photo';

const router = createBrowserRouter([
  {
    path: routes.home,
    element: withLayout(<Home />),
  },
  {
    path: routes.favorites,
    element: withLayout(<Favorites />),
  },
  {
    path: routes.photo,
    element: withLayout(<Photo />),
  },
]);

function RoutedApp() {
  const photoHook = usePhoto();

  return (
    <PhotoContext.Provider value={photoHook}>
      <RouterProvider router={router} />
    </PhotoContext.Provider>
  );
}

export default RoutedApp;
