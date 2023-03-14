import React, { useMemo } from 'react';
import GridContainer from 'components/GridContainer';
import Loader from 'components/Loader';
import usePhotoContext from 'context/useImageContext';
import useBodyScroll from 'hooks/useBodyScroll';
import { IPhoto } from 'types';

import scss from './Home.module.scss';

type IGridContainerItem = {
  photo: IPhoto;
  onClick(): void;
};

function GridContainerItem(props: IGridContainerItem) {
  const { favorites } = usePhotoContext();
  const { onClick, photo } = props;

  const isFavorite = useMemo(
    () => favorites.some((favorite) => favorite.id === photo.id),
    [favorites, photo.id],
  );

  return (
    <div className={scss.gridItem} onClick={onClick}>
      {isFavorite && <div className={scss.favorite}>❤️</div>}
      <img src={photo.download_url} alt={photo.url} />
    </div>
  );
}

function Home() {
  const { photos, fetchNext, loading, addToFavorite } = usePhotoContext();
  useBodyScroll(fetchNext);

  return (
    <>
      <GridContainer
        isCheckedToBeEmpty={!loading}
        items={photos}
        renderItem={(photo) => (
          <GridContainerItem photo={photo} onClick={() => addToFavorite(photo)} />
        )}
        getKey={(photo) => photo.id}
      ></GridContainer>
      {loading && <Loader />}
    </>
  );
}

export default Home;
