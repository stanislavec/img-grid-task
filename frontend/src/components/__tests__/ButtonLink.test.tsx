import { render, screen } from '@testing-library/react';
import ButtonLink from '../ButtonLink';
import { withRouter } from '../../test-utils';

describe('ButtonLink', () => {
  it('is defined', () => {
    const elem = render(withRouter(<ButtonLink to="/">Defined link button</ButtonLink>));
    expect(elem.baseElement).toBeDefined();
  });
  it('has active class on current route', () => {
    const text = 'Link btn';
    const { rerender, baseElement } = render(withRouter(<ButtonLink to="/">{text}</ButtonLink>));

    expect(baseElement.querySelector('a')).toHaveClass('active');

    rerender(withRouter(<ButtonLink to="/somepath">{text}</ButtonLink>));

    const link = screen.getByText(text);

    if (!link) throw Error;

    expect(link.classList.contains('active')).toBe(false);
  });
  it('matches snapshot', () => {
    const elem = render(withRouter(<ButtonLink to="/">Link button</ButtonLink>));
    const link = elem.container.querySelector('a');
    expect(link).toMatchSnapshot();
  });
});
