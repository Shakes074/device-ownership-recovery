import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChildrenContext, DevicesContext } from '../../contexts';
import DeviceAssignment from '../DeviceAssignment';

// Mock contexts
const mockUpdateDevice = jest.fn();
const mockAddChild = jest.fn();

// No need to create mock contexts - importing from context file

const mockContextValues = {
  children: [
    { id: 'child1', name: 'Alice' },
    { id: 'child2', name: 'Bob' }
  ],
  addChild: mockAddChild
};

const mockDevice = {
  id: 'device1',
  assignedTo: 'owner'
};

const renderWithContexts = (ui, { childrenContextValue, devicesContextValue } = {}) => {
  return render(
    <DevicesContext.Provider value={devicesContextValue || { updateDevice: mockUpdateDevice }}>
      <ChildrenContext.Provider value={childrenContextValue || mockContextValues}>
        {ui}
      </ChildrenContext.Provider>
    </DevicesContext.Provider>
  );
};

describe('DeviceAssignment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with owner selected by default', () => {
    renderWithContexts(<DeviceAssignment device={mockDevice} />);
    
    const ownerRadio = screen.getByLabelText('Owner');
    expect(ownerRadio).toBeChecked();
  });

  it('shows "Add child" button when no children exist', () => {
    renderWithContexts(
      <DeviceAssignment device={mockDevice} />,
      { childrenContextValue: { ...mockContextValues, children: [] }}
    );

    expect(screen.getByText('Add child')).toBeInTheDocument();
    expect(screen.getByText('You can add up to 2 children.')).toBeInTheDocument();
  });

  it('shows existing children as radio options', () => {
    renderWithContexts(<DeviceAssignment device={mockDevice} />);

    expect(screen.getByLabelText('Alice')).toBeInTheDocument();
    expect(screen.getByLabelText('Bob')).toBeInTheDocument();
  });

  it('allows adding a new child when limit not reached', async () => {
    const user = userEvent.setup();
    mockAddChild.mockReturnValue({ id: 'child3', name: 'Charlie' });

    renderWithContexts(
      <DeviceAssignment device={mockDevice} />,
      { childrenContextValue: { ...mockContextValues, children: [mockContextValues.children[0]] }}
    );

    // Click add child button
    await user.click(screen.getByText('+ Add child'));
    
    // Type name and submit
    await user.type(screen.getByLabelText('Child name'), 'Charlie');
    await user.click(screen.getByText('Add'));

    expect(mockAddChild).toHaveBeenCalledWith({ name: 'Charlie' });
  });

  it('prevents adding children when limit reached', () => {
    renderWithContexts(<DeviceAssignment device={mockDevice} />);
    
    // With 2 children already present, shouldn't show add button
    expect(screen.queryByText('+ Add child')).not.toBeInTheDocument();
  });

  it('assigns device to selected child', async () => {
    const onAssigned = jest.fn();
    const user = userEvent.setup();

    renderWithContexts(
      <DeviceAssignment 
        device={mockDevice}
        onAssigned={onAssigned}
      />
    );

    // Select child and submit
    await user.click(screen.getByLabelText('Alice'));
    await user.click(screen.getByText('Assign'));

    expect(mockUpdateDevice).toHaveBeenCalledWith('device1', { assignedTo: 'child1' });
    await waitFor(() => {
      expect(onAssigned).toHaveBeenCalledWith({ assignedTo: 'child1' });
    });
  });

  it('shows error state when assignment fails', async () => {
    const error = new Error('Failed to assign device');
    mockUpdateDevice.mockRejectedValueOnce(error);
    const user = userEvent.setup();

    renderWithContexts(<DeviceAssignment device={mockDevice} />);

    await user.click(screen.getByLabelText('Alice'));
    await user.click(screen.getByText('Assign'));

    expect(await screen.findByText('Failed to assign device')).toBeInTheDocument();
  });

  it('is accessible', async () => {
    const { container } = renderWithContexts(<DeviceAssignment device={mockDevice} />);
    
    // Basic accessibility checks
    expect(container).toHaveNoViolations();
    
    // Verify form controls are properly labeled
    expect(screen.getByRole('radio', { name: 'Owner' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Alice' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Bob' })).toBeInTheDocument();
  });
});