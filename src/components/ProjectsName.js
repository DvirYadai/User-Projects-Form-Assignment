import React, { useRef } from "react";
import { useProjects } from "../context/ProjectsContext";
import ProjectsNameLabel from "./ProjectsNameLabel";

const ProjectsName = () => {
  const { projectsName, addProjectName } = useProjects();
  const nameRef = useRef("");

  return (
    <div className="projects-name-div">
      <label className="label-block">Projects</label>
      {projectsName.map((name, i) => (
        <ProjectsNameLabel key={i} name={name} />
      ))}
      <input
        type="text"
        placeholder="Enter your project name"
        ref={nameRef}
        name="projectNameInput"
      />
      <button
        type="button"
        className="add-project-name-button"
        onClick={() => addProjectName(nameRef.current.value)}
      >
        ➕
      </button>
    </div>
  );
};

export default ProjectsName;
