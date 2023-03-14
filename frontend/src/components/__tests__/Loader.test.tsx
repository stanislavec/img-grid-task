import { render } from '@testing-library/react';
import Loader from '../Loader';

describe('Loader', () => {
  it('is defined', () => {
    const elem = render(<Loader />);
    expect(elem.baseElement).toBeDefined();
  });

  it('matches snapshot', () => {
    const elem = render(<Loader />);
    expect(elem.container).toMatchSnapshot();
  });
});
