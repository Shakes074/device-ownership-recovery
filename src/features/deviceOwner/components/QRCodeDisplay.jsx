import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import '../styles/qrcode-display.css';

const QRCodeDisplay = ({ value, size = 180, allowPrint = true }) => {
  const [visible, setVisible] = useState(false);
  const canvasRef = useRef(null);

  const handleToggle = () => {
    setVisible((v) => !v);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      // minimal feedback could be added
    } catch (err) {
      // ignore clipboard errors in environments that don't support it
    }
  };

  const handlePrint = () => {
    if (!allowPrint) return;
    // Open a new window with the canvas image for printing
    const svg = document.getElementById('qrcode-svg');
    if (!svg) return;
    const serialized = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([serialized], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`<!doctype html><html><head><title>Print QR</title></head><body style="display:flex;justify-content:center;align-items:center;height:100vh">`);
    printWindow.document.write(`<img src="${url}" alt="QR code" />`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    // Revoke URL after a delay
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  return (
    <div className="qrcode-display">
      <div className="qrcode-display__controls">
        <button
          type="button"
          className="qrcode-display__toggle"
          onClick={handleToggle}
          aria-pressed={visible}
        >
          {visible ? 'Hide QR' : 'Show QR'}
        </button>

        <button
          type="button"
          className="qrcode-display__copy"
          onClick={handleCopy}
          aria-label="Copy QR value"
        >
          Copy
        </button>

        {allowPrint && (
          <button
            type="button"
            className="qrcode-display__print"
            onClick={handlePrint}
          >
            Print
          </button>
        )}
      </div>

      {visible && (
        <div className="qrcode-display__box" role="img" aria-label="Device QR code">
          {/* Using qrcode.react which renders an SVG by default */}
          <QRCode id="qrcode-svg" value={value} size={size} includeMargin={true} />
        </div>
      )}
    </div>
  );
};

QRCodeDisplay.propTypes = {
  value: PropTypes.string.isRequired,
  size: PropTypes.number,
  allowPrint: PropTypes.bool
};

export default QRCodeDisplay;
