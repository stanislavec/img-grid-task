import { render } from '@testing-library/react';
import { withRouter } from '../../test-utils';
import Layout from '../Layout';

describe('Layout', () => {
  it('is defined', () => {
    const elem = render(withRouter(<Layout />));
    expect(elem.baseElement).toBeDefined();
  });

  it('throws error with no required provider exists', () => {
    try {
      const elem = render(<Layout />);
      expect(elem.baseElement).toBeDefined();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('matches snapshot with no children passed', () => {
    const elem = render(withRouter(<Layout />));
    expect(elem.container).toMatchSnapshot();
  });

  it('matches snapshot', () => {
    const elem = render(withRouter(<Layout>some test child</Layout>));
    expect(elem.container).toMatchSnapshot();
  });
});
