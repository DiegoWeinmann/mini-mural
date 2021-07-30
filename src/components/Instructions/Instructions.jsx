import React from "react";
import "./styles.css";

function Instructions() {
  return (
    <div>
      <div className="visually-hidden" tabIndex="0"></div>
      <h2 id="keyboard_shortcuts">Keyboard shortcuts</h2>
      <ul className="instructions" aria-labelledby="keyboard_shortcuts">
        <li>
          Focus Canvas:
          <span className="key">Ctrl</span> + <span className="key">f</span>
        </li>
        <li>
          Focus Toolbar: <span className="key">Ctrl</span> +{" "}
          <span className="key">t</span>
        </li>
        <li>
          Create Sticky Note: <span className="key">Ctrl</span> +{" "}
          <span className="key">c</span>
        </li>
        <li>
          Delete Sticky Note: <span className="key">Ctrl</span> +{" "}
          <span className="key">d</span>
        </li>
        <li>
          Move to next Sticky Note: <span className="key">Ctrl</span> +{" "}
          <span className="key">j</span>
        </li>
        <li>
          Move to previous Sticky Note: <span className="key">Ctrl</span> +{" "}
          <span className="key">k</span>
        </li>
        <li>
          Move Sticky Note left: <span className="key">Shift</span> +{" "}
          <span className="key">H</span>
        </li>
        <li>
          Move Sticky Note right: <span className="key">Shift</span> +{" "}
          <span className="key">L</span>
        </li>
        <li>
          Move Sticky Note down: <span className="key">Shift</span> +{" "}
          <span className="key">J</span>
        </li>
        <li>
          Move Sticky Note down: <span className="key">Shift</span> +{" "}
          <span className="key">K</span>
        </li>
        <li>
          Open Help:
          <span className="key" aria-label="question mark">
            ?
          </span>
        </li>
      </ul>
      <h2 id="mouse_actions" aria-hidden="true">
        Mouse actions
      </h2>
      <ul
        className="instructions"
        aria-labelledby="mouse_actions"
        aria-hidden="true"
      >
        <li>
          Add Note: <span className="key">Double Click</span>
        </li>
        <li>
          Edit Note: <span className="key">Click</span>
        </li>
        <li>
          Multiple Selection: <span className="key">Shift</span> +{" "}
          <span className="key">V</span>
        </li>
        <li>
          Copy Notes: <span className="key">Ctrl</span> +{" "}
          <span className="key">C</span>
        </li>
        <li>
          Paste Notes: <span className="key">Ctrl</span> +{" "}
          <span className="key">V</span>
        </li>
      </ul>
    </div>
  );
}

export default Instructions;
