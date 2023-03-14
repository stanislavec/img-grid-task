import React, { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Button from 'components/Button';
import Loader from 'components/Loader';
import usePhotoContext from 'context/useImageContext';
import scss from './Photo.module.scss';

function Photo() {
  const { photos, loading, favorites, removeFromFavorite } = usePhotoContext();

  const { id } = useParams();

  const { state } = useLocation();

  const photo = state?.photo || photos?.find((ph) => ph.id === id);

  const isFavorite = useMemo(
    () => favorites.some((favorite) => favorite.id === id),
    [favorites, id],
  );

  if (loading) return <Loader />;

  if (!photo) return <>Seems, image does not exist</>;

  return (
    <div className={scss.photo}>
      <img src={photo.download_url} alt={photo.url}></img>
      {isFavorite ? (
        <Button onClick={() => removeFromFavorite(photo.id)}>Remove from favorites</Button>
      ) : (
        <>This photo is not the favorite one</>
      )}
    </div>
  );
}

export default Photo;
