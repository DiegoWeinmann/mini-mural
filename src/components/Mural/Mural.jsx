import React from "react";
import PropTypes from "prop-types";
import Toolbar from "../Toolbar";
import StickyNote from "../StickyNote";

import { NOTE_DEFAULT_HEIGHT, NOTE_DEFAULT_WIDTH } from "../../constants";
import { pixelsToInt } from "../../utils";
import "./styles.css";
import Welcome from "../Welcome";

class Mural extends React.Component {
  static propTypes = {
    notes: PropTypes.object,
    selectedNotes: PropTypes.object,
    currentColor: PropTypes.string,
    addNote: PropTypes.func,
    enableMultipleSelection: PropTypes.func,
    disableMultipleSelection: PropTypes.func,
    clearSelectedNotes: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.mural = React.createRef();
    this.toolbar = React.createRef();
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.mural.current.addEventListener("click", this.clearSelectedNotes);
    this.mural.current.addEventListener("dblclick", this.addNoteToMural);
    this.mural.current.addEventListener("keydown", this.handleKeyDown);
    this.mural.current.addEventListener("keyup", this.handleKeyUp);

    if (this.canvas && this.canvas.current) {
      this.canvas.current.focus();
    }
  }

  clearSelectedNotes = e => {
    if (e.target.isEqualNode(this.mural.current)) {
      this.props.clearSelectedNotes();
    }
  };

  addNoteToMural = e => {
    if (e.target.classList.contains("sticky-note-content")) {
      return;
    }

    const { x, y } = e;
    const { currentColor, addNote } = this.props;
    const width = NOTE_DEFAULT_HEIGHT;
    const height = NOTE_DEFAULT_WIDTH;

    const noteToAdd = {
      text: "",
      color: currentColor,
      width,
      height,
      x: x - pixelsToInt(width) / 2,
      y: y - pixelsToInt(height) / 2
    };

    addNote(noteToAdd);
  };

  handleKeyDown = e => {
    if (e.key === "Shift") {
      this.props.enableMultipleSelection();
    }
  };

  handleKeyUp = e => {
    if (e.key === "Shift") {
      this.props.disableMultipleSelection();
    }
  };

  render() {
    const { notes, selectedNotes } = this.props;
    const StickyNotes = Object.values(notes).map(
      ({ id, text, color, width, height, x, y }) => {
        const selected = selectedNotes.hasOwnProperty(id);

        return (
          <StickyNote
            id={id}
            text={text}
            color={color}
            width={width}
            height={height}
            x={x}
            y={y}
            selected={selected}
            key={id}
          />
        );
      }
    );

    return (
      <div id="Mural" className="Mural" ref={this.mural} tabIndex="-1">
        <main tabIndex="0" onKeyDown={this.handleKeyDown} ref={this.canvas}>
          <h1 className="visually-hidden">Mini mural canvas</h1>
          <Welcome />
          {StickyNotes}
        </main>
        <Toolbar toolbarRef={this.toolbar} canvasRef={this.canvas} />
      </div>
    );
  }
}

export default Mural;
