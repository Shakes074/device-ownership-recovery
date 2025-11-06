import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QRCodeDisplay from '../QRCodeDisplay';

// Mock qrcode.react
jest.mock('qrcode.react', () => {
  return function DummyQRCode({ value, size }) {
    return (
      <div data-testid="mock-qrcode" data-value={value} data-size={size}>
        QR Code Mock
      </div>
    );
  };
});

describe('QRCodeDisplay', () => {
  const mockValue = 'https://example.com/device/123';
  
  beforeEach(() => {
    // Mock window.open for print tests
    window.open = jest.fn().mockReturnValue({
      document: {
        write: jest.fn(),
        close: jest.fn()
      },
      focus: jest.fn(),
      print: jest.fn()
    });

    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockResolvedValue(undefined)
      }
    });
  });

  it('renders toggle button initially without QR code', () => {
    render(<QRCodeDisplay value={mockValue} />);
    
    expect(screen.getByText('Show QR')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-qrcode')).not.toBeInTheDocument();
  });

  it('shows QR code when toggle is clicked', async () => {
    const user = userEvent.setup();
    render(<QRCodeDisplay value={mockValue} />);
    
    await user.click(screen.getByText('Show QR'));
    
    expect(screen.getByTestId('mock-qrcode')).toBeInTheDocument();
    expect(screen.getByText('Hide QR')).toBeInTheDocument();
  });

  it('copies value to clipboard when copy button clicked', async () => {
    const user = userEvent.setup();
    render(<QRCodeDisplay value={mockValue} />);
    
    await user.click(screen.getByText('Copy'));
    
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockValue);
  });

  it('handles print functionality', async () => {
    const user = userEvent.setup();
    render(<QRCodeDisplay value={mockValue} allowPrint={true} />);
    
    await user.click(screen.getByText('Show QR'));
    await user.click(screen.getByText('Print'));
    
    expect(window.open).toHaveBeenCalled();
    const printWindow = window.open.mock.results[0].value;
    expect(printWindow.focus).toHaveBeenCalled();
    expect(printWindow.print).toHaveBeenCalled();
  });

  it('does not show print button when printing is disabled', () => {
    render(<QRCodeDisplay value={mockValue} allowPrint={false} />);
    
    expect(screen.queryByText('Print')).not.toBeInTheDocument();
  });

  it('respects custom size prop', async () => {
    const user = userEvent.setup();
    const customSize = 240;
    render(<QRCodeDisplay value={mockValue} size={customSize} />);
    
    await user.click(screen.getByText('Show QR'));
    
    const qrCode = screen.getByTestId('mock-qrcode');
    expect(qrCode).toHaveAttribute('data-size', String(customSize));
  });

  it('is accessible', () => {
    const { container } = render(<QRCodeDisplay value={mockValue} />);
    
    // Basic accessibility checks
    expect(container).toHaveNoViolations();
    
    // Verify ARIA attributes
    expect(screen.getByRole('button', { name: /show qr/i }))
      .toHaveAttribute('aria-pressed', 'false');
  });

  it('handles clipboard API errors gracefully', async () => {
    const user = userEvent.setup();
    const clipboardError = new Error('Clipboard access denied');
    navigator.clipboard.writeText.mockRejectedValueOnce(clipboardError);
    
    render(<QRCodeDisplay value={mockValue} />);
    
    // Should not throw when clipboard fails
    await user.click(screen.getByText('Copy'));
  });

  it('creates blob URL for print and revokes it after delay', async () => {
    const user = userEvent.setup();
    jest.useFakeTimers();
    URL.createObjectURL = jest.fn().mockReturnValue('blob:mock-url');
    URL.revokeObjectURL = jest.fn();

    render(<QRCodeDisplay value={mockValue} />);
    
    await user.click(screen.getByText('Show QR'));
    await user.click(screen.getByText('Print'));

    expect(URL.createObjectURL).toHaveBeenCalled();
    
    // Fast-forward timeout
    jest.advanceTimersByTime(2000);
    
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
    
    jest.useRealTimers();
  });
});