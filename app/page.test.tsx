import { render, screen } from '../utils/test-utils';

import Home from './page';
import '@testing-library/jest-dom';

describe('Home Page', () => {
  it('renders welcome message', () => {
    render(<Home />);
    expect(
      screen.getByText('Welcome to The Discovery Panel')
    ).toBeInTheDocument();
  });

  it('renders video element', () => {
    render(<Home />);
    const video = document.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('autoPlay');
    expect(video).toHaveAttribute('loop');
  });
});
