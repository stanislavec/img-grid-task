import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('is defined', () => {
    const elem = render(<Button>Defined button</Button>);
    expect(elem.baseElement).toBeDefined();
  });
  it('contains correct text', () => {
    const text = 'Some text inside button';
    const elem = render(<Button>{text}</Button>);
    expect(elem.baseElement).toHaveTextContent(text);
  });
  it('renders with props correctly', () => {
    const text = 'Some text inside button';
    const elem = render(<Button disabled>{text}</Button>);
    const btn = elem.container.querySelector('button');
    expect(btn).toBeDisabled();
  });
  it('handles click event correctly', async () => {
    let disabled = true;
    let btn;
    const text: string = 'Click me!';
    const onClick = jest.fn();
    const { rerender } = render(
      <Button onClick={onClick} disabled={disabled}>
        {text}
      </Button>,
    );
    btn = screen.getByText(text);
    if (!btn) throw Error;

    fireEvent.click(btn);
    expect(onClick).toBeCalledTimes(0);
    disabled = false;

    rerender(
      <Button onClick={onClick} disabled={disabled}>
        {text}
      </Button>,
    );

    fireEvent.click(btn);

    expect(onClick).toBeCalledTimes(1);
  });
  it('matches snapshot', () => {
    const text: string = 'Some btn!';
    const onClick = jest.fn();
    const elem = render(<Button onClick={onClick}>{text}</Button>);
    expect(elem.container.querySelector('button')).toMatchSnapshot();
  });
});
