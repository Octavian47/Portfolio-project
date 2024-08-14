import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ToggleSwitch from './ToggleSwitch';

describe('ToggleSwitch Component', () => {
  it('renders the ToggleSwitch with the correct label', () => {
    const { getByText } = render(
      <ToggleSwitch isOn={false} handleToggle={jest.fn()} id="test" />
    );

    expect(getByText('Display in Portfolio')).toBeInTheDocument();
  });

  it('renders the ToggleSwitch in the "off" state', () => {
    const { getByRole } = render(
      <ToggleSwitch isOn={false} handleToggle={jest.fn()} id="test" />
    );

    expect(getByRole('checkbox')).not.toBeChecked();
  });

  it('renders the ToggleSwitch in the "on" state', () => {
    const { getByRole } = render(
      <ToggleSwitch isOn={true} handleToggle={jest.fn()} id="test" />
    );

    expect(getByRole('checkbox')).toBeChecked();
  });

  it('calls the handleToggle function when clicked', () => {
    const handleToggle = jest.fn();
    const { getByRole } = render(
      <ToggleSwitch isOn={false} handleToggle={handleToggle} id="test" />
    );

    fireEvent.click(getByRole('checkbox'));

    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('assigns the correct ID to the input and label elements', () => {
    const { getByLabelText, container } = render(
      <ToggleSwitch isOn={false} handleToggle={jest.fn()} id="unique-id" />
    );

    // Check if the input element has the correct ID
    const input = container.querySelector('#toggle-switch-unique-id');
    expect(input).toBeInTheDocument();

    // Check if the label is associated with the correct input by ID
    const label = container.querySelector('label[for="toggle-switch-unique-id"]');
    expect(label).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(
      <ToggleSwitch isOn={false} handleToggle={jest.fn()} id="test" />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
