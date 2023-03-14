import { createContext, useContext } from 'react';
import { IPhotoContext } from 'types';

export const PhotoContext = createContext<IPhotoContext>({
  photos: [],
  fetchNext: () => null,
  addToFavorite: () => null,
  removeFromFavorite: () => null,
  favorites: [],
  loading: false,
});

const usePhotoContext = () => useContext(PhotoContext);

export default usePhotoContext;
