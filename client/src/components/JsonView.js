import React from "react";
import { useProjects } from "../context/ProjectsContext";

const JsonView = ({ jsonView }) => {
  const { projectsDetails, userName } = useProjects();

  const projectsDetailsEntries = Object.entries(projectsDetails);

  const projects = {};

  for (const project of projectsDetailsEntries) {
    projects[project[0]] = {
      details: project[1].details,
      duration: `${project[1].durationValue} ${project[1].durationSelect}`,
    };
  }

  const jsonViewBuild = {
    Name: userName,
    Projects: projects,
  };

  return (
    <div className="form" style={{ display: jsonView ? "block" : "none" }}>
      <pre>{JSON.stringify(jsonViewBuild, null, 2)}</pre>
    </div>
  );
};

export default JsonView;
