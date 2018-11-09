import React from "react";
import { ProjectContainer, StyledLink } from '../Styles.js';

const Projects = props => {
  return (
      <ProjectContainer>
          {props.projects.map(project => (
              <div key={project.id}>
                  <StyledLink to={`/actions/${project.id}`}>{project.name}</StyledLink>
              </div>
          ))}
      </ProjectContainer>
  );
};

export default Projects;