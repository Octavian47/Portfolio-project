import React from 'react';
import { render, fireEvent, act } from '@testing-library/react'; // Import act to handle state updates
import Sidebar from './Sidebar';
import { BrowserRouter as Router } from 'react-router-dom'; // Router is needed to render links properly

describe('Sidebar Component', () => {
  // Test case: Ensure the Sidebar renders with all the expected links
  it('renders the Sidebar with all the expected links', () => {
    // Render the Sidebar component wrapped in a Router
    const { getByText } = render(
      <Router>
        <Sidebar className="open" onClose={jest.fn()} /> {/* Mock onClose for this test */}
      </Router>
    );

    // Assert that all expected links are in the document
    expect(getByText('List of Portfolio Items')).toBeInTheDocument();
    expect(getByText('Add Portfolio Item')).toBeInTheDocument();
    expect(getByText('Live Portfolio')).toBeInTheDocument();
  });

  // Test case: Ensure the onClose handler is called when the close button is clicked
  it('calls the onClose handler when the close button is clicked', () => {
    const handleClose = jest.fn(); // Create a mock function for onClose

    // Render the Sidebar with the mock onClose handler
    const { getByText } = render(
      <Router>
        <Sidebar className="open" onClose={handleClose} />
      </Router>
    );

    // Use act to ensure that any updates caused by the event are handled correctly
    act(() => {
      fireEvent.click(getByText('×')); // Simulate a click on the close button
    });

    // Assert that the mock function was called exactly once
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  // Snapshot test: Ensure the Sidebar component renders consistently
  it('matches the snapshot', () => {
    // Render the Sidebar and create a snapshot
    const { asFragment } = render(
      <Router>
        <Sidebar className="open" onClose={jest.fn()} />
      </Router>
    );

    // Match the rendered output with the snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
