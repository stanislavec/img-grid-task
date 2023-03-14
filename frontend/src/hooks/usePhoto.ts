import { useRef, useState, useCallback, useEffect } from 'react';
import { getPhotos } from 'api';
import { IPhotoContext, IPhoto } from 'types';

const FAVORITES_LS_KEY = 'favorites_photos';

const saveToLS = (data: IPhoto[]) => localStorage.setItem(FAVORITES_LS_KEY, JSON.stringify(data));

const getFromLS = () => {
  const retreived = localStorage.getItem(FAVORITES_LS_KEY);
  if (!retreived) return [];

  try {
    return JSON.parse(retreived);
  } catch (e) {
    return [];
  }
};

function usePhoto(): IPhotoContext {
  const isInited = useRef(false);
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [favorites, setFavorites] = useState<IPhoto[]>(getFromLS());
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNext = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      const fetchedPhotos = await getPhotos(page);

      setPage((current) => current + 1);
      setPhotos((prevPhotos) => [...prevPhotos, ...fetchedPhotos]);
    } finally {
      setLoading(false);
    }
  }, [loading, page]);

  const addToFavorite = useCallback(
    (item: IPhoto) =>
      setFavorites((prevPhotos) => {
        if (prevPhotos.some((photo) => photo.id === item.id)) return prevPhotos;
        const newdata = [item, ...prevPhotos];
        saveToLS(newdata);
        return newdata;
      }),
    [],
  );

  const removeFromFavorite = useCallback(
    (id: string) =>
      setFavorites((prevPhotos) => {
        const newdata = prevPhotos.filter((photo) => photo.id !== id);
        saveToLS(newdata);
        return newdata;
      }),
    [],
  );

  useEffect(() => {
    if (isInited.current) return;
    isInited.current = true;
    fetchNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    photos,
    favorites,
    loading,
    fetchNext,
    addToFavorite,
    removeFromFavorite,
  };
}

export default usePhoto;
