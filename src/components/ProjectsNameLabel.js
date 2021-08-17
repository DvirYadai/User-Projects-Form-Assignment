import React from "react";
import { useProjects } from "../context/ProjectsContext";

const ProjectsNameLabel = ({ name }) => {
  const { removeProjectName } = useProjects();
  return (
    <span className="project-name-span">
      {name}
      <button
        type="button"
        className="project-name-button"
        onClick={(e) => removeProjectName(e)}
      >
        x
      </button>
    </span>
  );
};

export default ProjectsNameLabel;
