// prog2053.js
import React, { useEffect } from 'react';

const Project1Site = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '/projects/prog2053/script.js'; // Replace this with the path to your JavaScript file
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h2>NTNU - PROG2053</h2>
      <iframe
        src="/projects/prog2053/prog2053.html" 
        title="NTNU - PROG2053"
        style={{
          width: '100%',
          height: '80vh',
          border: 'none',
        }}
      />
    </div>
  );
};

export default Project1Site;
