import React from 'react';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Users from './components/Users.jsx';
import Contact from './components/Contact.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import './styles/app.css';

const App = () => {
  return (
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
};

export default App;
