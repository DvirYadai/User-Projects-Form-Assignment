import React, { createContext, useContext, useState } from "react";

const ProjectsContext = createContext();

export const useProjects = () => {
  return useContext(ProjectsContext);
};

export const ProjectsProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [projectsName, setProjectsName] = useState([]);
  const [projectDetailsCount, setProjectDetailsCount] = useState([]);
  const [projectsDetails, setProjectsDetails] = useState({});

  const addProjectsDetails = (e, detailName, projectName) => {
    const value = e.target.value;
    if (detailName === "projectName") {
      setProjectsDetails((prev) => ({
        ...prev,
        [value]: { details: "", durationValue: "", durationSelect: "" },
      }));
    } else if (detailName === "details") {
      setProjectsDetails((prev) => ({
        ...prev,
        [projectName]: { ...prev[projectName], details: value },
      }));
    } else if (detailName === "durationValue") {
      setProjectsDetails((prev) => ({
        ...prev,
        [projectName]: { ...prev[projectName], durationValue: value },
      }));
    } else if (detailName === "durationSelect") {
      setProjectsDetails((prev) => ({
        ...prev,
        [projectName]: { ...prev[projectName], durationSelect: value },
      }));
    }
  };

  const updateUserName = (name) => {
    setUserName(name);
  };

  const addProjectName = (name) => {
    if (name === "") {
      alert("Project name cant be empty");
      return;
    }
    setProjectsName((prev) => [...prev, name]);
  };

  const removeProjectName = (e) => {
    const projectName = e.target.parentNode.innerText.slice(0, -1);
    const projectNameIndex = projectsName.indexOf(projectName);
    const forms = document.querySelectorAll("#project-details-form");
    forms.forEach((form) => {
      if (form[1].options.selectedIndex === projectNameIndex + 1) form.reset();
    });
    if (projectsDetails.hasOwnProperty(projectName)) {
      const tempObj = Object.assign({}, projectsDetails);
      delete tempObj[projectName];
      setProjectsDetails(tempObj);
    }
    setProjectsName((prev) => [...prev].filter((name) => name !== projectName));
    alert("Project name deleted successfully");
  };

  const addProjectDetailsCount = () => {
    if (projectDetailsCount.length === 0) {
      setProjectDetailsCount([1]);
    } else {
      setProjectDetailsCount((prev) => [
        ...prev,
        projectDetailsCount[projectDetailsCount.length - 1] + 1,
      ]);
    }
  };

  const removeProjectDetailsCount = (item, projectName) => {
    setProjectDetailsCount((prev) =>
      [...prev].filter((value) => value !== item)
    );
    if (
      projectsDetails.hasOwnProperty(projectName) &&
      projectName !== "default-select-value"
    ) {
      const tempObj = Object.assign({}, projectsDetails);
      delete tempObj[projectName];
      setProjectsDetails(tempObj);
    }
  };

  const value = {
    userName,
    updateUserName,
    projectsName,
    addProjectName,
    removeProjectName,
    projectDetailsCount,
    addProjectDetailsCount,
    removeProjectDetailsCount,
    projectsDetails,
    addProjectsDetails,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
