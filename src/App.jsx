import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Users from './components/Users.jsx';
import Contact from './components/Contact.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import RoleLayout from './components/RoleLayout.jsx';
import { userRoutes } from './users/routes.js';
import './styles/app.css';

const LandingPage = () => (
  <div className="app">
    <Header />
    <main className="app__main">
      <section id="home" className="section section--light">
        <Home />
      </section>
      <section id="about" className="section section--pattern">
        <About />
      </section>
      <section id="users" className="section section--light">
        <Users />
      </section>
      <section id="contact" className="section section--pattern">
        <Contact />
      </section>
    </main>
    <Footer />
  </div>
);

const NotFoundPage = () => (
  <div className="app app--center">
    <main className="section section--light">
      <div className="panel">
        <h1>Page not found</h1>
        <p>The page you are looking for doesn&apos;t exist yet.</p>
        <Link className="cta" to="/">
          Return to main home
        </Link>
      </div>
    </main>
  </div>
);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {userRoutes.map(({ key, basePath, routes }) => (
        <Route key={key} path={`${basePath}/*`} element={<RoleLayout roleKey={key} />}>
          {routes.map(({ path, Component }) =>
            path ? (
              <Route key={path || 'index'} path={path} element={<Component />} />
            ) : (
              <Route key="index" index element={<Component />} />
            )
          )}
          <Route path="*" element={<Navigate to={basePath} replace />} />
        </Route>
      ))}
      <Route path="/store" element={<Navigate to="/store/admin" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
