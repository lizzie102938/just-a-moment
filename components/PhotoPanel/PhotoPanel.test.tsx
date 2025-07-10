import { render, screen } from '@/utils/test-utils';
import PhotoPanel from './PhotoPanel';
import '@testing-library/jest-dom';

jest.mock('@/components/Map/Map', () => () => <div data-testid="mock-map" />);

describe('Photo Panel', () => {
  it('renders header info', () => {
    render(
      <PhotoPanel
        location={{ lat: 1, lng: 2 }}
        opened={true}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText('Photos from')).toBeInTheDocument();
  });
});
