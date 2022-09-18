import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders learn react link', () => {
  render(<App />);
  const titleElement = screen.getByText(/surreal estate/i);
  expect(titleElement).toBeInTheDocument();
});
