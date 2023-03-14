import React from 'react';
import { useNavigate } from 'react-router-dom';
import GridContainer from 'components/GridContainer';
import usePhotoContext from 'context/useImageContext';

import scss from './Favorites.module.scss';

function Favorites() {
  const { favorites } = usePhotoContext();

  const navigate = useNavigate();

  return (
    <>
      <GridContainer
        items={favorites}
        renderItem={(photo) => (
          <div
            className={scss.gridItem}
            onClick={() => navigate(`/photo/${photo.id}`, { state: { photo } })}
          >
            <img src={photo.download_url} alt={photo.url} />
          </div>
        )}
        getKey={(photo) => photo.id}
      ></GridContainer>
    </>
  );
}

export default Favorites;
