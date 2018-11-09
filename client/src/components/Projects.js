import React from "react";
import { Link } from "react-router-dom";
import { ProjectContainer } from '../Styles.js';

const Projects = props => {
  return (
      <ProjectContainer>
          {props.projects.map(project => (
              <div key={project.id}>
                  <Link to={`/actions/${project.id}`}>{project.name}</Link>
              </div>
          ))}
      </ProjectContainer>
  );
};

export default Projects;