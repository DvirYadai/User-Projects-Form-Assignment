import React from "react";
import { useProjects } from "../context/ProjectsContext";

const JsonView = () => {
  const { projectsDetails } = useProjects();
  return <div className="form">{projectsDetails}</div>;
};

export default JsonView;
