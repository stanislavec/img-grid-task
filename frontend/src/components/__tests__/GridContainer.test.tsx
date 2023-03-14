import { render } from '@testing-library/react';
import GridContainer from '../GridContainer';

const items = [1, 2, 3, 4];

describe('GridContainer', () => {
  it('is defined', () => {
    const elem = render(
      <GridContainer items={items} renderItem={(item) => <p>{item}</p>} getKey={(item) => item} />,
    );
    expect(elem.baseElement).toBeDefined();
  });

  it('is throws error without required props', () => {
    try {
      // @ts-ignore
      render(<GridContainer items={items} />);
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Render function is not passed as a prop');
    }

    try {
      // @ts-ignore
      render(<GridContainer items={items} renderItem={() => null} />);
    } catch (error: any) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('GetKey function is not passed as a prop');
    }
  });

  it('renders correctly with empty items object', () => {
    const elem = render(
      <GridContainer items={[]} renderItem={(item) => <p>{item}</p>} getKey={(item) => item} />,
    );
    expect(elem.baseElement).toHaveTextContent('No data...');
  });

  it('is matches snapshot with empty result', () => {
    const elem = render(
      <GridContainer items={[]} renderItem={(item) => <p>{item}</p>} getKey={(item) => item} />,
    );
    expect(elem.container).toMatchSnapshot();
  });

  it('is matches snapshot', () => {
    const elem = render(
      <GridContainer items={items} renderItem={(item) => <p>{item}</p>} getKey={(item) => item} />,
    );
    expect(elem.container).toMatchSnapshot();
  });
});
