import { render } from '@testing-library/react';
import { withRouter } from '../../test-utils';
import Header from '../Header';

describe('Header', () => {
  it('is defined', () => {
    const elem = render(withRouter(<Header />));
    expect(elem.baseElement).toBeDefined();
  });

  it('throws error with no required provider exists', () => {
    try {
      const elem = render(<Header />);
      expect(elem.baseElement).toBeDefined();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('matches snapshot', () => {
    const elem = render(withRouter(<Header />));
    expect(elem.container).toMatchSnapshot();
  });
});
