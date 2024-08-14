import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';

// Mock the Header component
jest.mock('./Header', () => () => <div>Mock Header</div>);

describe('Layout Component', () => {
  it('renders the Header when the path is not in hideHeaderPaths', () => {
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Layout>
          <div>Child Component</div>
        </Layout>
      </MemoryRouter>
    );

    expect(queryByText('Mock Header')).toBeInTheDocument();
    expect(queryByText('Child Component')).toBeInTheDocument();
  });

  it('does not render the Header when the path is in hideHeaderPaths', () => {
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Layout>
          <div>Child Component</div>
        </Layout>
      </MemoryRouter>
    );

    // Check that the Header is not rendered
    expect(queryByText('Mock Header')).not.toBeInTheDocument();
    expect(queryByText('Child Component')).toBeInTheDocument();
  });
});
