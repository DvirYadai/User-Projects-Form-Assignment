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
    console.log(e);
  };

  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <JsonView jsonView={jsonView} />
        <div className="form" style={{ display: jsonView ? "none" : "block" }}>
          <label className="label-block">Name: </label>
          <input
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
          <button type="button">Cancel</button>
          <input type="submit" value="Save" />
        </div>
      </form>
    </div>
  );
};

export default Form;
