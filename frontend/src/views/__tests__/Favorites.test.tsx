import { fireEvent, render, screen } from '@testing-library/react';
import usePhotoContext from 'context/useImageContext';
import { withRouter } from 'test-utils';
import Favorites from '../Favotites';
import PHOTOS from './__mocks__/photo';

jest.mock('context/useImageContext');

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockUseNavigate,
}));

const mockUsePhotoContext = usePhotoContext as jest.MockedFunction<typeof usePhotoContext>;

describe('Favorites', () => {
  beforeEach(() => jest.clearAllMocks());

  it('is defined', () => {
    mockUsePhotoContext.mockReturnValue({
      photos: [],
      fetchNext: () => null,
      loading: false,
      addToFavorite: () => null,
      removeFromFavorite: () => null,
      favorites: [],
    });
    const elem = render(withRouter(<Favorites />));
    expect(elem.baseElement).toBeDefined();
  });

  it('matches snapshot with photos', () => {
    mockUsePhotoContext.mockReturnValue({
      photos: PHOTOS,
      fetchNext: () => null,
      loading: false,
      addToFavorite: () => null,
      removeFromFavorite: () => null,
      favorites: PHOTOS.slice(0, 4),
    });
    const elem = render(withRouter(<Favorites />));
    expect(elem.container).toMatchSnapshot();
  });

  it('matches snapshot without photos', () => {
    mockUsePhotoContext.mockReturnValue({
      photos: [],
      fetchNext: () => null,
      loading: false,
      addToFavorite: () => null,
      removeFromFavorite: () => null,
      favorites: [],
    });
    const elem = render(withRouter(<Favorites />));
    expect(elem.container).toMatchSnapshot();
  });

  it('handles click on photo', () => {
    mockUsePhotoContext.mockReturnValue({
      photos: PHOTOS,
      fetchNext: () => null,
      loading: false,
      addToFavorite: () => null,
      removeFromFavorite: () => null,
      favorites: PHOTOS.slice(0, 4),
    });
    render(withRouter(<Favorites />));

    const image = screen.queryByAltText(PHOTOS[0].url);

    if (!image) throw Error();

    fireEvent.click(image);

    expect(mockUseNavigate).toBeCalledTimes(1);
  });
});
