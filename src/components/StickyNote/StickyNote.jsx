import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Color from "color";
import FontAwesomeButton from "../FontAwesomeButton";
import "./styles.css";

class StickyNote extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    selected: PropTypes.bool,
    setSelectedNote: PropTypes.func,
    pushSelectedNote: PropTypes.func,
    updateNote: PropTypes.func,
    deleteNote: PropTypes.func,
  };

  static defaultProps = {
    text: "",
    color: "#b1d6d0",
    height: "100px",
    width: "100px",
    x: "0",
    y: "0",
    selected: false,
  };

  constructor(props) {
    super(props);
    this.textarea = React.createRef();
    this.state = { editMode: false, editableText: "" };
  }

  componentDidMount() {
    this.textarea.current.addEventListener("click", this.selectNote);
    this.textarea.current.addEventListener("dblclick", this.editNote);

    if (this.props.text !== "") {
      this.setState({
        editableText: this.props.text,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selected !== this.props.selected) {
      if (this.textarea && this.textarea.current && this.props.selected) {
        this.textarea.current.focus();
      }
    }

    if (prevState.editMode !== this.state.editMode) {
      if (this.textarea && this.textarea.current) {
        this.textarea.current.focus();
      }
    }
  }

  handleChange = (e) => {
    this.setState({
      editableText: e.target.value,
    });
  };

  handleKeyDown = (e) => {
    if (!this.state.editMode && e.key === "e") {
      this.setState({
        editMode: true,
      });
      return e.preventDefault();
    }

    if (this.state.editMode && e.key === "Escape") {
      const text = this.props.text;

      if (text !== this.state.editableText) {
        const { id, color, height, width, x, y, selected } = this.props;
        const updatedNote = {
          id,
          text: this.state.editableText,
          color,
          height,
          width,
          x,
          y,
          selected,
        };
        this.props.updateNote(updatedNote);
      }

      this.setState({
        editMode: false,
      });

      return e.preventDefault();
    }

    if (e.key === "d" && e.ctrlKey) {
      const { id, deleteNote } = this.props;
      deleteNote(id);
    }

    if (!this.state.editMode && e.key === "H" && e.shiftKey) {
      const { id, color, height, width, x, y, selected } = this.props;
      const updatedNote = {
        id,
        text: this.state.editableText,
        color,
        height,
        width,
        x: x - 5,
        y,
        selected,
      };
      this.props.updateNote(updatedNote);
    }

    if (!this.state.editMode && e.key === "L" && e.shiftKey) {
      const { id, color, height, width, x, y, selected } = this.props;
      const updatedNote = {
        id,
        text: this.state.editableText,
        color,
        height,
        width,
        x: x + 5,
        y,
        selected,
      };
      this.props.updateNote(updatedNote);
    }

    if (!this.state.editMode && e.key === "J" && e.shiftKey) {
      const { id, color, height, width, x, y, selected } = this.props;
      const updatedNote = {
        id,
        text: this.state.editableText,
        color,
        height,
        width,
        x,
        y: y + 5,
        selected,
      };
      this.props.updateNote(updatedNote);
    }

    if (!this.state.editMode && e.key === "K" && e.shiftKey) {
      const { id, color, height, width, x, y, selected } = this.props;
      const updatedNote = {
        id,
        text: this.state.editableText,
        color,
        height,
        width,
        x,
        y: y - 5,
        selected,
      };
      this.props.updateNote(updatedNote);
    }
  };

  selectNote = (e) => {
    const { id, setSelectedNote, pushSelectedNote, multipleSelection } =
      this.props;

    if (multipleSelection) {
      pushSelectedNote(id);
    } else {
      setSelectedNote(id);
    }
  };

  editNote = () => {
    this.setState({ editMode: true });
    this.textarea.current.focus();
  };

  handleDelete = () => {
    const { id, deleteNote } = this.props;
    deleteNote(id);
  };

  handleOnBlur = (e) => {
    const text = this.props.text;

    if (text !== this.state.editableText) {
      const { id, color, height, width, x, y, selected } = this.props;
      const updatedNote = {
        id,
        text: this.state.editableText,
        color,
        height,
        width,
        x,
        y,
        selected,
      };
      this.props.updateNote(updatedNote);
    }
    this.setState({
      editMode: false,
    });
  };

  render() {
    const { editMode } = this.state;
    const { id, text, color, height, width, x, y, selected } = this.props;

    const StickyNoteClassnames = classnames("StickyNote", {
      selected: selected,
      "edit-mode": editMode,
    });

    const textColor = Color(color).darken(0.8).desaturate(0.3);
    const boxShadowColor = Color(color).darken(0.1);

    return (
      <div
        className={StickyNoteClassnames}
        style={{
          width,
          height,
          transform: `translate(${x}px,${y}px)`,
          zIndex: selected ? "999999" : 1,
        }}
        onKeyDown={this.handleKeyDown}
      >
        {!editMode && (
          <div className="visually-hidden" aria-live="assertive">
            {!text ? "Empty sticky note" : `Sticky note content: ${text}`}
          </div>
        )}
        <div
          className="container"
          style={{
            background: color,
            boxShadow: `0px 0px 2px ${boxShadowColor}`,
            padding: selected ? "6px" : "8px",
          }}
          id={id}
          data-type="sticky-note"
        >
          {editMode ? (
            <React.Fragment>
              <label className="visually-hidden" htmlFor={id}>
                Edit sticky note
              </label>
              <textarea
                id={id}
                className="sticky-note-content"
                value={this.state.editableText}
                onChange={this.handleChange}
                onBlur={this.handleOnBlur}
                ref={this.textarea}
              ></textarea>
            </React.Fragment>
          ) : (
            <p
              className="sticky-note-content"
              // contentEditable={editMode}
              onBlur={this.handleOnBlur}
              ref={this.textarea}
              style={{
                color: textColor,
                userSelect: editMode ? "text" : "none",
              }}
              onClick={() => this.setState({ editMode: true })}
              // suppressContentEditableWarning="true"
              tabIndex={this.props.selected ? 0 : -1}
              onKeyDown={this.handleKeyDown}
            >
              {text}
            </p>
          )}
        </div>
        {selected && (
          <FontAwesomeButton
            faClass={"fa fa-trash-o"}
            handleOnClick={this.handleDelete}
          />
        )}
      </div>
    );
  }
}

export default StickyNote;
