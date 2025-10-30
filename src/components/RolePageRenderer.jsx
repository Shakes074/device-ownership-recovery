import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { rolePageContent } from '../users/pageContent.js';

const RolePageRenderer = ({ pageKey }) => {
  const outletContext = useOutletContext();
  const roleKey = outletContext?.role?.key ?? outletContext?.roleKey;
  const content = rolePageContent[roleKey]?.[pageKey];

  if (!roleKey || !content) {
    return (
      <div className="role-sections">
        <section className="role-section">
          <h3>Content unavailable</h3>
          <p>This view has not been configured yet.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="role-sections">
      {content.intro ? <p className="role-page__intro">{content.intro}</p> : null}
      {content.sections?.map(({ title, body, items }) => (
        <section key={title} className="role-section">
          <h3>{title}</h3>
          <p>{body}</p>
          {items && items.length > 0 ? (
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
};

export default RolePageRenderer;
