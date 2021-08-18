import React, { useState } from "react";
import { useProjects } from "../context/ProjectsContext";
import JsonView from "./JsonView";
import ProjectDetails from "./ProjectDetails";
import ProjectsName from "./ProjectsName";

const Form = () => {
  const {
    addProjectDetailsCount,
    projectDetailsCount,
    updateUserName,
    userName,
    projectsDetails,
  } = useProjects();
  const [nameError, setNameError] = useState("");
  const [jsonView, setJsonView] = useState(false);

  const onBlurNameInput = (e) => {
    if (e.target.value === "") {
      setNameError("required");
    } else {
      setNameError("");
    }
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(projectsDetails);
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
    const projectsArr = Object.entries(jsonViewBuild.Projects);
    console.log(projectsArr);
    if (projectsArr.length === 0) {
      alert("You need to add project name and details before saving");
      return;
    } else {
      for (const project of projectsArr) {
        if (
          project[1].details === "" ||
          project[1].duration.split(" ")[0] === "" ||
          project[1].duration.split(" ")[1] === ""
        ) {
          alert(
            "You have to add details and duration for all the projects details"
          );
          return;
        }
      }
    }
    try {
      // Fake http call to the server:
      // const res = axios.post("fake address", jsonViewBuild);
      // if (res.status === 200) {
      alert("Form saved successfully");
      // }
    } catch (error) {
      // If an error responded from the server
      alert("There is a problem in our servers, try again later");
    }
  };

  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <JsonView jsonView={jsonView} />
        <div className="form" style={{ display: jsonView ? "none" : "block" }}>
          <label className="label-block">Name: </label>
          <input
            className="name-inpu"
            type="text"
            required
            placeholder="Enter your name"
            onBlur={(e) => onBlurNameInput(e)}
            onChange={(e) => updateUserName(e.target.value)}
            value={userName}
          />
          <div className="error-div">{nameError}</div>
          <ProjectsName />
          <p>
            Projects details{" "}
            <button
              className="project-details-button"
              type="button"
              onClick={addProjectDetailsCount}
            >
              ➕
            </button>
          </p>
          {projectDetailsCount.map((item) => (
            <ProjectDetails key={item} item={item} />
          ))}
        </div>
        <div className="footer-button-div">
          <p className="json-view-p" onClick={() => setJsonView(!jsonView)}>
            {jsonView ? "Show form" : "View form JSON"}
          </p>
          <div className="form-actions">
            <button type="button">Cancel</button>
            <input type="submit" value="Save" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
