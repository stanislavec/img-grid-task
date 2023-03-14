import { fireEvent, render, screen } from '@testing-library/react';
import usePhotoContext from 'context/useImageContext';
import { withMemotyRouter } from 'test-utils';
import Photo from '../Photo';
import PHOTOS from './__mocks__/photo';

jest.mock('context/useImageContext');

const mockUseNavigate = jest.fn();

const mockUsePhotoContext = usePhotoContext as jest.MockedFunction<typeof usePhotoContext>;

describe('Photo', () => {
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
    const elem = render(withMemotyRouter(<Photo />, { route: '/photo/5', path: '/photo/:id' }));
    expect(elem.baseElement).toBeDefined();
  });

  it('matches snapshot if photo exists', () => {
    mockUsePhotoContext.mockReturnValue({
      photos: PHOTOS,
      fetchNext: () => null,
      loading: false,
      addToFavorite: () => null,
      removeFromFavorite: () => null,
      favorites: PHOTOS.slice(0, 10),
    });
    const elem = render(withMemotyRouter(<Photo />, { route: '/photo/5', path: '/photo/:id' }));
    expect(elem.container).toMatchSnapshot();
  });

  it('matches snapshot if photo does not exists', () => {
    mockUsePhotoContext.mockReturnValue({
      photos: [],
      fetchNext: () => null,
      loading: false,
      addToFavorite: () => null,
      removeFromFavorite: () => null,
      favorites: [],
    });
    const elem = render(withMemotyRouter(<Photo />, { route: '/photo/5', path: '/photo/:id' }));
    expect(elem.container).toMatchSnapshot();
  });

  it('matches snapshot if photo exists but not favorite', () => {
    mockUsePhotoContext.mockReturnValue({
      photos: PHOTOS,
      fetchNext: () => null,
      loading: false,
      addToFavorite: () => null,
      removeFromFavorite: () => null,
      favorites: [],
    });
    const elem = render(withMemotyRouter(<Photo />, { route: '/photo/5', path: '/photo/:id' }));
    expect(elem.container).toMatchSnapshot();
  });

  it('handles remove from favorites button click', () => {
    const removeFromFavorite = jest.fn();
    mockUsePhotoContext.mockReturnValue({
      photos: PHOTOS,
      fetchNext: () => null,
      loading: false,
      addToFavorite: () => null,
      removeFromFavorite,
      favorites: PHOTOS.slice(0, 10),
    });

    render(withMemotyRouter(<Photo />, { route: '/photo/5', path: '/photo/:id' }));

    const button = screen.queryByText('Remove from favorites');

    if (!button) throw Error();

    fireEvent.click(button);

    expect(removeFromFavorite).toBeCalledTimes(1);
  });
});
