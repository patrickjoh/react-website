import React, { useState } from 'react';
import projects from './projects/projects.json';
import './css/Projects.css';

const Projects = () => {
  const [listItems] = useState(projects);

  const categories = listItems.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
      acc.push(item.category);
    }
    return acc;
  }, []);

  const groupedItems = categories.map(category => ({
    category,
    items: listItems.filter(item => item.category === category)
  }));

  return (
    <div className="projects-container">
      <div className="projects-list">
        {groupedItems.map(group => (
          <div key={group.category}>
            <h3>{group.category}</h3>
            <ul>
              {group.items.map(item => (
                <li key={item.id}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <div className="item-container">
                      <div className="title-container">
                        <span>{item.title}</span>
                      </div>
                      <div className="tools-container">
                        <span>Tools: </span>
                        <span>{item.tools}</span>
                      </div>
                      {item.disclaimer && <small className="disclaimer">{item.disclaimer}</small>}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
