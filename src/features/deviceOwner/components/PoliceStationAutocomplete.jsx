import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { mockPoliceStations } from '../data/mockPoliceStations';
import { useDebounce } from '../hooks/useDebounce';
import '../styles/police-station-autocomplete.css';

const PoliceStationAutocomplete = ({ onSelect, selectedStation, error }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredStations, setFilteredStations] = useState([]);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef(null);
  const listboxRef = useRef(null);

  // Filter stations based on query
  useEffect(() => {
    if (!debouncedQuery) {
      setFilteredStations([]);
      return;
    }

    const normalized = debouncedQuery.toLowerCase();
    const filtered = mockPoliceStations.filter(station => 
      station.name.toLowerCase().includes(normalized) ||
      station.city.toLowerCase().includes(normalized) ||
      station.province.toLowerCase().includes(normalized)
    );

    setFilteredStations(filtered);
    setHighlightedIndex(filtered.length > 0 ? 0 : -1);
  }, [debouncedQuery]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex === -1 || !isOpen) return;

    const highlightedOption = listboxRef.current?.children[highlightedIndex];
    if (highlightedOption) {
      highlightedOption.scrollIntoView({
        block: 'nearest'
      });
    }
  }, [highlightedIndex, isOpen]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleSelect = (station) => {
    onSelect(station);
    setQuery(station.name);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex(prev => 
            prev < filteredStations.length - 1 ? prev + 1 : prev
          );
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;

      case 'Enter':
        e.preventDefault();
        if (isOpen && highlightedIndex !== -1) {
          handleSelect(filteredStations[highlightedIndex]);
        }
        break;

      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;

      case 'Tab':
        if (isOpen) {
          e.preventDefault();
          if (e.shiftKey) {
            setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
          } else {
            setHighlightedIndex(prev => 
              prev < filteredStations.length - 1 ? prev + 1 : prev
            );
          }
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className="police-station-autocomplete">
      <label 
        className="police-station-autocomplete__label" 
        htmlFor="police-station-input"
      >
        Police Station
      </label>
      
      <div className="police-station-autocomplete__wrapper">
        <input
          id="police-station-input"
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder="Search by name, city, or province"
          aria-expanded={isOpen}
          aria-controls="police-station-listbox"
          aria-activedescendant={
            highlightedIndex !== -1 
              ? `police-station-${filteredStations[highlightedIndex]?.id}` 
              : undefined
          }
          className={`police-station-autocomplete__input ${
            error ? 'police-station-autocomplete__input--error' : ''
          }`}
          role="combobox"
        />

        <button
          type="button"
          className="police-station-autocomplete__clear"
          onClick={() => {
            setQuery('');
            onSelect(null);
            inputRef.current?.focus();
          }}
          aria-label="Clear selection"
          tabIndex={-1}
        >
          ✕
        </button>
      </div>

      {error && (
        <p className="police-station-autocomplete__error" role="alert">
          {error}
        </p>
      )}

      {isOpen && filteredStations.length > 0 && (
        <ul
          id="police-station-listbox"
          ref={listboxRef}
          className="police-station-autocomplete__listbox"
          role="listbox"
        >
          {filteredStations.map((station, index) => (
            <li
              key={station.id}
              id={`police-station-${station.id}`}
              role="option"
              aria-selected={index === highlightedIndex}
              className={`police-station-autocomplete__option ${
                index === highlightedIndex 
                  ? 'police-station-autocomplete__option--highlighted' 
                  : ''
              }`}
              onClick={() => handleSelect(station)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <div className="police-station-autocomplete__station-name">
                {station.name}
              </div>
              <div className="police-station-autocomplete__station-details">
                {station.address}, {station.city}, {station.province}
              </div>
              <div className="police-station-autocomplete__station-phone">
                {station.phone}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

PoliceStationAutocomplete.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedStation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
  }),
  error: PropTypes.string
};

export default PoliceStationAutocomplete;