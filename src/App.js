import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import About from './About';
import Projects from './Projects';
import './css/App.css';
import ThemeContext from './ThemeContext';

function App() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const getInitialTheme = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    return mediaQuery.matches;
  };

  const [initialTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    document.body.classList.toggle('light', !darkMode);

    // Set the status bar style based on the selected theme
    const metaTag = document.querySelector('meta[name="theme-color"]');
    if (metaTag) {
      metaTag.setAttribute('content', darkMode ? '#333' : '#f0f0f0');
    }

  }, [darkMode]);

  useEffect(() => {
    setDarkMode(initialTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      const isDarkMode = mediaQuery.matches;
      setDarkMode(isDarkMode);
    };
    mediaQuery.addListener(handleSystemThemeChange);

    return () => mediaQuery.removeListener(handleSystemThemeChange);
  }, [setDarkMode, initialTheme]);

  const handleToggleTheme = () => {
    setDarkMode(!darkMode);
  };


  return (
    <Router>
      <div className={`App ${darkMode ? 'dark' : ''}`}>
        <header>
          <div className="name-container">
            <h1 className="name">Patrick<br />Johannessen</h1>
          </div>
          <nav>
            <ul className="nav">
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/about">About Me</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/projects">Projects</NavLink>
              </li>
              <li className="nav-item"> 
               <a className="nav-link external-link" href="https://github.com/patrickjoh" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithubSquare} className="navbar-github" style={{color: darkMode ? "#ffffff" : "#7b219f" }} />GitHub</a> 
              </li>
              <li className="nav-item">
                <a className="nav-link external-link" href="https://www.linkedin.com/in/patrick-johannessen/" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} className="navbar-linkedin" style={{ color: darkMode ? "#ffffff" : '#0056d6' }} />LinkedIn
                </a>
              </li>
              <li>
                <button className="toggle-theme" onClick={handleToggleTheme}>Toggle Theme</button>
              </li>
            </ul>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
