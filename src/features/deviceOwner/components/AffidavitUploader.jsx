import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import '../styles/affidavit-uploader.css';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];

const AffidavitUploader = ({ onFileSelect, error }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  
  const validateFile = (file) => {
    if (!file) return 'Please select a file';
    if (file.size > MAX_FILE_SIZE) return 'File size must be less than 5MB';
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Only PDF, JPEG, and PNG files are allowed';
    }
    return null;
  };

  const handleFileSelect = (file) => {
    const validationError = validateFile(file);
    if (validationError) {
      onFileSelect(null, validationError);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    onFileSelect(file, null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFileSelect(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="affidavit-uploader">
      <div
        className={`affidavit-uploader__dropzone ${
          isDragging ? 'affidavit-uploader__dropzone--dragging' : ''
        } ${error ? 'affidavit-uploader__dropzone--error' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleButtonClick}
        role="button"
        tabIndex={0}
        aria-label="Upload affidavit"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(',')}
          onChange={handleInputChange}
          className="affidavit-uploader__input"
          aria-hidden="true"
          tabIndex={-1}
        />
        
        <div className="affidavit-uploader__content">
          {selectedFile ? (
            <>
              <div className="affidavit-uploader__file">
                <svg
                  className="affidavit-uploader__file-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                  <polyline points="13 2 13 9 20 9" />
                </svg>
                <div className="affidavit-uploader__file-info">
                  <span className="affidavit-uploader__filename">
                    {selectedFile.name}
                  </span>
                  <span className="affidavit-uploader__filesize">
                    {formatFileSize(selectedFile.size)}
                  </span>
                </div>
              </div>
              <button 
                className="affidavit-uploader__change"
                onClick={(e) => {
                  e.stopPropagation();
                  handleButtonClick();
                }}
              >
                Change file
              </button>
            </>
          ) : (
            <>
              <svg
                className="affidavit-uploader__icon"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <p className="affidavit-uploader__text">
                Drag and drop your affidavit here or click to browse
              </p>
              <p className="affidavit-uploader__hint">
                PDF, JPEG, or PNG (max. 5MB)
              </p>
            </>
          )}
        </div>
      </div>

      {error && (
        <p className="affidavit-uploader__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

AffidavitUploader.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default AffidavitUploader;