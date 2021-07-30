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
    clearSelectedNotes: PropTypes.func,
    setSelectedNote: PropTypes.func,
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
    // this.mural.current.addEventListener("keydown", this.handleKeyDown);
    this.mural.current.addEventListener("keyup", this.handleKeyUp);

    if (this.canvas && this.canvas.current) {
      this.canvas.current.focus();
    }
  }

  clearSelectedNotes = (e) => {
    if (e.target.isEqualNode(this.mural.current)) {
      this.props.clearSelectedNotes();
    }
  };

  addNoteToMural = (e) => {
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
      y: y - pixelsToInt(height) / 2,
      date: new Date(),
    };

    addNote(noteToAdd);
  };

  handleKeyDown = (e) => {
    if (e.key === "Shift") {
      this.props.enableMultipleSelection();
    }

    if (e.key === "t" && e.ctrlKey) {
      if (this.toolbar && this.toolbar.current) {
        this.toolbar.current.focus();
      }
    }

    if (e.key === "ArrowDown" || (e.key === "j" && e.ctrlKey)) {
      const notes = Object.values(this.props.notes);
      const selectedNotes = Object.values(this.props.selectedNotes);

      if (notes.length === 0) return;

      if (selectedNotes.length === 0) {
        this.props.setSelectedNote(notes[0].id);
      } else {
        const selectedNoteIndex = notes.findIndex((note) => {
          return note.id === selectedNotes[0].note_id;
        });

        if (selectedNoteIndex === notes.length - 1) {
          return this.props.setSelectedNote(notes[0].id);
        }

        this.props.setSelectedNote(notes[selectedNoteIndex + 1].id);
      }
    }

    if (e.key === "ArrowUp" || (e.key === "k" && e.ctrlKey)) {
      const notes = Object.values(this.props.notes);
      const selectedNotes = Object.values(this.props.selectedNotes);

      if (notes.length === 0) return;

      if (selectedNotes.length === 0) {
        this.props.setSelectedNote(notes[0].id);
      } else {
        const selectedNoteIndex = notes.findIndex((note) => {
          return note.id === selectedNotes[0].note_id;
        });

        if (selectedNoteIndex === 0) {
          return this.props.setSelectedNote(notes[notes.length - 1].id);
        }

        this.props.setSelectedNote(notes[selectedNoteIndex - 1].id);
      }
    }

    if (e.key === "c" && e.ctrlKey) {
      const notes = Object.values(this.props.notes);
      let x, y;
      if (notes.length > 0) {
        const sortedNotes = Object.values(notes).sort(
          (a, b) => b.date - a.date
        );
        const lastNote = sortedNotes[0];
        x = lastNote.x + 140 + 10;
        y = lastNote.y + 140 + 10;
      } else {
        x = 400;
        y = 500;
      }
      const { currentColor, addNote } = this.props;
      const width = NOTE_DEFAULT_HEIGHT;
      const height = NOTE_DEFAULT_WIDTH;

      const noteToAdd = {
        text: "",
        color: currentColor,
        width,
        height,
        x: x - pixelsToInt(width) / 2,
        y: y - pixelsToInt(height) / 2,
        date: new Date(),
      };
      addNote(noteToAdd);
    }
  };

  handleKeyUp = (e) => {
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
            tabIndex={selected ? 0 : -1}
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
