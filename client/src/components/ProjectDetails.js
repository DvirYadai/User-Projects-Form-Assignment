import React, { useRef, useState } from "react";
import { useProjects } from "../context/ProjectsContext";

const ProjectDetails = ({ item }) => {
  const { projectsName, removeProjectDetailsCount } = useProjects();
  const [nameSelectError, setNameSelectError] = useState("");
  const [textareaError, setTextareaError] = useState("");
  const [numberInputError, setNumberInputError] = useState("");
  const [durationSelectError, setDurationSelectError] = useState("");
  const nameSelectRef = useRef("");
  const textareaRef = useRef("");
  const numberInputRef = useRef("");
  const durationSelectRef = useRef("");

  const onBlurEvent = (e) => {
    if (e.target.value === "" || e.target.value === "default") {
      switch (e.target.name) {
        case "name-select":
          setNameSelectError("required");
          break;
        case "textarea":
          setTextareaError("required");
          break;
        case "number-input":
          setNumberInputError("required");
          break;
        case "duration-select":
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
        case "number-input":
          setNumberInputError("");
          break;
        case "duration-select":
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
          className="project-details-remove"
          onClick={() => removeProjectDetailsCount(item)}
        >
          x
        </button>
        <div>
          <label>Project: </label>
          <select
            defaultValue="default"
            onBlur={(e) => onBlurEvent(e)}
            name="name-select"
            ref={nameSelectRef}
          >
            <option value="default" key="default"></option>
            {projectsName.map((name, i) => (
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
            ref={textareaRef}
            onBlur={(e) => onBlurEvent(e)}
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
              name="number-input"
              ref={numberInputRef}
              onBlur={(e) => onBlurEvent(e)}
            />
            <div className="error-div">{numberInputError}</div>
          </div>
          <div>
            <select
              defaultValue="default"
              required
              name="duration-select"
              ref={durationSelectRef}
              onBlur={(e) => onBlurEvent(e)}
            >
              <option value="default" key="default"></option>
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
