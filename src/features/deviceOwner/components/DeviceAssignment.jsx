import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ChildrenContext } from '../contexts/ChildrenContext';
import { DevicesContext } from '../contexts/DevicesContext';
import '../styles/device-assignment.css';

const DeviceAssignment = ({ device, onAssigned }) => {
  const { children, addChild } = useContext(ChildrenContext);
  const { updateDevice } = useContext(DevicesContext);

  const [assignee, setAssignee] = useState(device.assignedTo || 'owner');
  const [addingChild, setAddingChild] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAssignee(device.assignedTo || 'owner');
  }, [device.assignedTo]);

  const handleAssign = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Optimistic UI: update local state immediately
    try {
      const updates = { assignedTo: assignee === 'owner' ? 'owner' : assignee };
      // Call DevicesContext to persist
      await updateDevice(device.id, updates);
      onAssigned?.(updates);
    } catch (err) {
      setError(err.message || 'Failed to assign device');
    } finally {
      setLoading(false);
    }
  };

  const handleAddChild = (e) => {
    e.preventDefault();
    if (!newChildName.trim()) return;

    // Attempt to add child via ChildrenContext
    try {
      const created = addChild({ name: newChildName.trim() });
      // After adding, auto-select that child
      setAssignee(created.id);
      setAddingChild(false);
      setNewChildName('');
    } catch (err) {
      setError(err.message || 'Failed to add child');
    }
  };

  return (
    <form className="device-assignment" onSubmit={handleAssign} aria-label="Assign device">
      <fieldset className="device-assignment__fieldset">
        <legend className="device-assignment__legend">Assign device</legend>

        <div className="device-assignment__options">
          <label className="device-assignment__option">
            <input
              type="radio"
              name={`assignee-${device.id}`}
              value="owner"
              checked={assignee === 'owner'}
              onChange={() => setAssignee('owner')}
              disabled={loading}
            />
            <span className="device-assignment__option-label">Owner</span>
          </label>

          {children.length === 0 ? (
            <div className="device-assignment__no-children">
              <button
                type="button"
                className="device-assignment__add-child"
                onClick={() => setAddingChild(true)}
                disabled={loading}
              >
                Add child
              </button>
              <p className="device-assignment__hint">You can add up to 2 children.</p>
            </div>
          ) : (
            <div className="device-assignment__children-list">
              {children.map((c) => (
                <label key={c.id} className="device-assignment__option">
                  <input
                    type="radio"
                    name={`assignee-${device.id}`}
                    value={c.id}
                    checked={assignee === c.id}
                    onChange={() => setAssignee(c.id)}
                    disabled={loading}
                  />
                  <span className="device-assignment__option-label">{c.name}</span>
                </label>
              ))}

              {children.length < 2 && (
                <button
                  type="button"
                  className="device-assignment__add-child-small"
                  onClick={() => setAddingChild(true)}
                  disabled={loading}
                >
                  + Add child
                </button>
              )}
            </div>
          )}
        </div>

        {addingChild && (
          <div className="device-assignment__add-form">
            <label htmlFor={`new-child-${device.id}`} className="device-assignment__label">
              Child name
            </label>
            <div className="device-assignment__add-form-row">
              <input
                id={`new-child-${device.id}`}
                type="text"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                className="device-assignment__input"
                disabled={loading}
                required
              />
              <button
                type="button"
                className="device-assignment__add-form-button"
                onClick={handleAddChild}
                disabled={loading}
              >
                Add
              </button>
            </div>
          </div>
        )}

        {error && (
          <p className="device-assignment__error" role="alert">{error}</p>
        )}

        <div className="device-assignment__actions">
          <button
            type="submit"
            className="device-assignment__assign-button"
            disabled={loading}
          >
            {loading ? 'Assigning...' : 'Assign'}
          </button>
        </div>
      </fieldset>
    </form>
  );
};

DeviceAssignment.propTypes = {
  device: PropTypes.shape({
    id: PropTypes.string.isRequired,
    assignedTo: PropTypes.string
  }).isRequired,
  onAssigned: PropTypes.func
};

export default DeviceAssignment;
