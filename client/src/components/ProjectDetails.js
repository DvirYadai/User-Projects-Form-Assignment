import React, { useState } from "react";
import { useProjects } from "../context/ProjectsContext";

const ProjectDetails = ({ item }) => {
  const { projectsName, removeProjectDetailsCount, addProjectsDetails } =
    useProjects();
  const [nameSelectError, setNameSelectError] = useState("");
  const [textareaError, setTextareaError] = useState("");
  const [numberInputError, setNumberInputError] = useState("");
  const [durationSelectError, setDurationSelectError] = useState("");
  const [nameSelect, setNameSelect] = useState("");

  const onBlurEvent = (e) => {
    if (e.target.value === "" || e.target.value === "default-select-value") {
      switch (e.target.name) {
        case "name-select":
          setNameSelectError("Please select a project");
          break;
        case "textarea":
          setTextareaError("required");
          break;
        case "durationValue":
          setNumberInputError("required");
          break;
        case "durationSelect":
          setDurationSelectError("required");
          break;
        default:
          break;
      }
    } else {
      switch (e.target.name) {
        case "name-select":
          setNameSelectError("");
          break;
        case "textarea":
          setTextareaError("");
          break;
        case "durationValue":
          setNumberInputError("");
          break;
        case "durationSelect":
          setDurationSelectError("");
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="project-details-div">
      <form id="project-details-form">
        <button
          type="button"
          className="project-details-remove"
          onClick={() => removeProjectDetailsCount(item, nameSelect)}
        >
          x
        </button>
        <div>
          <label>Project: </label>
          <select
            onChange={(e) => {
              addProjectsDetails(e, "projectName");
              setNameSelect(e.target.value);
            }}
            required
            defaultValue="default-select-value"
            onBlur={(e) => onBlurEvent(e)}
            name="name-select"
          >
            <option value="default-select-value" key="default"></option>
            {projectsName.map((name) => (
              <option value={name} key={name}>
                {name}
              </option>
            ))}
          </select>
          <div className="error-div">{nameSelectError}</div>
        </div>
        <div>
          <label>Details: </label>
          <textarea
            cols="30"
            rows="5"
            required
            name="textarea"
            onBlur={(e) => onBlurEvent(e)}
            onChange={(e) => addProjectsDetails(e, "details", nameSelect)}
          ></textarea>
          <div className="error-div">{textareaError}</div>
        </div>
        <div className="duration-div">
          <div>
            <label>Duration: </label>
          </div>
          <div>
            <input
              type="number"
              required
              name="durationValue"
              onBlur={(e) => onBlurEvent(e)}
              onChange={(e) =>
                addProjectsDetails(e, "durationValue", nameSelect)
              }
            />
            <div className="error-div">{numberInputError}</div>
          </div>
          <div>
            <select
              defaultValue="default-select-value"
              required
              name="durationSelect"
              onBlur={(e) => onBlurEvent(e)}
              onChange={(e) =>
                addProjectsDetails(e, "durationSelect", nameSelect)
              }
            >
              <option value="default-select-value" key="default"></option>
              <option value="days" key="days">
                Days
              </option>
              <option value="weeks" key="weeks">
                Weeks
              </option>
              <option value="months" key="months">
                Months
              </option>
              <option value="years" key="years">
                Years
              </option>
            </select>
            <div className="error-div">{durationSelectError}</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectDetails;
