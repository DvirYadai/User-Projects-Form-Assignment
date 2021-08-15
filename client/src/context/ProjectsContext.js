import React, { createContext, useContext, useState } from "react";

const ProjectsContext = createContext();

export const useProjects = () => {
  return useContext(ProjectsContext);
};

export const ProjectsProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [projectsName, setProjectsName] = useState([]);
  const [projectDetailsCount, setProjectDetailsCount] = useState([]);
  const [projectsDetails, setProjectsDetails] = useState([]);
  const [jsonView, setJsonView] = useState(false);

  const addProjectsDetails = (
    nameSelectRef,
    textareaRef,
    numberInputRef,
    durationSelectRef
  ) => {
    // setProjectsDetails((prev) => [...prev]);
    setJsonView(!jsonView);
  };

  const updateUserName = (name) => {
    setUserName(name);
  };

  const addProjectName = (e, name) => {
    if (e.charCode === 13) {
      if (name === "") {
        alert("Project name cant be empty");
        return;
      }
      setProjectsName((prev) => [...prev, name]);
      e.target.value = "";
    }
  };

  const removeProjectName = (e) => {
    const projectName = e.target.parentNode.innerText.slice(0, -1);
    const projectNameIndex = projectsName.indexOf(projectName);
    const forms = document.querySelectorAll("#project-details-form");
    forms.forEach((form) => {
      if (form[1].options.selectedIndex === projectNameIndex + 1) form.reset();
    });
    setProjectsName((prev) => [...prev].filter((name) => name !== projectName));
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

  const removeProjectDetailsCount = (item) => {
    setProjectDetailsCount((prev) =>
      [...prev].filter((value) => value !== item)
    );
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
    jsonView,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
