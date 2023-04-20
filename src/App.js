import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import About from './About';
import Projects from './Projects';
import './css/App.css';
import ThemeContext from './ThemeContext';

function App() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [userToggledTheme, setUserToggledTheme] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    document.body.classList.toggle('light', !darkMode);
  }, [darkMode]);

  useEffect(() => {
  if (!userToggledTheme) {
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode !== null) {
      toggleDarkMode(JSON.parse(savedMode));
    } else {
      // Check if the system default theme is dark
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

      // Set the theme based on the system default
      if (isDarkMode) {
        toggleDarkMode(true);
      } else {
        toggleDarkMode(false);
      }
    }
  }
    
    // Listen for changes in the system default theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (!userToggledTheme) {
        if (mediaQuery.matches) {
          toggleDarkMode(true);
        } else {
          toggleDarkMode(false);
        }
      }
    };
    mediaQuery.addListener(handleSystemThemeChange);
    return () => mediaQuery.removeListener(handleSystemThemeChange);
  }, [toggleDarkMode, userToggledTheme]);

  const handleToggleTheme = () => {
    setUserToggledTheme(true);
    toggleDarkMode(!darkMode);
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
                <a className="nav-link" href="https://github.com/patrickjoh" target="_blank" rel="noopener noreferrer">GitHub</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://www.linkedin.com/in/patrick-johannessen/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
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
