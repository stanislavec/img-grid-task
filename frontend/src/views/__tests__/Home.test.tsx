import { fireEvent, render } from '@testing-library/react';
import usePhotoContext from 'context/useImageContext';
import Home from '../Home';
import PHOTOS from './__mocks__/photo';

jest.mock('context/useImageContext');

const mockUsePhotoContext = usePhotoContext as jest.MockedFunction<typeof usePhotoContext>;

describe('Home', () => {
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
    const elem = render(<Home />);
    expect(elem.baseElement).toBeDefined();
  });

  it('matches snapshot on loading', () => {
    mockUsePhotoContext.mockReturnValue({
      photos: [],
      fetchNext: () => null,
      loading: true,
      addToFavorite: () => null,
      removeFromFavorite: () => null,
      favorites: [],
    });

    const elem = render(<Home />);
    expect(elem.container).toMatchSnapshot();
  });

  it('matches snapshot on loaded with photos', () => {
    mockUsePhotoContext.mockReturnValue({
      photos: PHOTOS,
      fetchNext: () => null,
      loading: false,
      addToFavorite: () => null,
      removeFromFavorite: () => null,
      favorites: [],
    });

    const elem = render(<Home />);
    expect(elem.container).toMatchSnapshot();
  });

  it('matches snapshot on empty photos collection', () => {
    mockUsePhotoContext.mockReturnValue({
      photos: [],
      fetchNext: () => null,
      loading: false,
      addToFavorite: () => null,
      removeFromFavorite: () => null,
      favorites: [],
    });

    const elem = render(<Home />);
    expect(elem.container).toMatchSnapshot();
  });

  it('handles click to photo', () => {
    const addToFavorite = jest.fn();
    mockUsePhotoContext.mockReturnValue({
      photos: PHOTOS,
      fetchNext: () => null,
      loading: false,
      addToFavorite,
      removeFromFavorite: () => null,
      favorites: [],
    });

    const elem = render(<Home />);
    const image = elem.container.querySelector('img');

    if (!image) throw Error();

    fireEvent.click(image);
    expect(addToFavorite).toBeCalledTimes(1);
  });

  it('matches snapshot with favorites', () => {
    mockUsePhotoContext.mockReturnValue({
      photos: PHOTOS,
      fetchNext: () => null,
      loading: false,
      addToFavorite: () => null,
      removeFromFavorite: () => null,
      favorites: PHOTOS.slice(0, 2),
    });

    const elem = render(<Home />);

    expect(elem.container).toMatchSnapshot();
  });

  it('fires fetch photos on scroll down reached', () => {
    const fetchNext = jest.fn();
    mockUsePhotoContext.mockReturnValue({
      photos: PHOTOS,
      fetchNext,
      loading: false,
      addToFavorite: () => null,
      removeFromFavorite: () => null,
      favorites: [],
    });

    render(<Home />);

    expect(fetchNext).toBeCalledTimes(0);

    fireEvent.scroll(document, { target: { scrollY: 10000 } });

    expect(fetchNext).toBeCalledTimes(1);

    fireEvent.scroll(document, { target: { scrollY: 20000 } });

    expect(fetchNext).toBeCalledTimes(2);
  });
});
