import React from "react";
import { Link } from "react-router-dom";

const Projects = props => {
  return (
      <div>
          {props.projects.map(project => (
              <div key={project.id}>
                  <Link to={`/api/actions/${project.id}`}>{project.name}</Link>
              </div>
          ))}
      </div>
  );
};

export default Projects;