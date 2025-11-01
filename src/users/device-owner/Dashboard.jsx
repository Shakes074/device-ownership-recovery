import React from 'react';
import { useNavigate } from 'react-router-dom';
import { rolePageContent } from '../pageContent.js';

const DeviceOwnerDashboard = () => {
  const navigate = useNavigate();
  const dashboardContent = rolePageContent['device-owner'].dashboard;

  return (
    <div className="dashboard-layout">
      {dashboardContent.sections.map(({ id, title, body, items }) => (
        <section key={id} id={id} className="role-section role-section--dashboard">
          <h3>{title}</h3>
          <p>{body}</p>
          {items && items.length > 0 ? (
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {id === 'logout' ? (
            <button
              type="button"
              className="dashboard-logout"
              onClick={() => {
                navigate('/device-owner/', { replace: true });
                window.history.replaceState(null, '', '/device-owner/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Log out and return home
            </button>
          ) : null}
        </section>
      ))}
    </div>
  );
};

export default DeviceOwnerDashboard;
