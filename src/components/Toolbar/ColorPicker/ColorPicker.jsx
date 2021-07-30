import React from "react";
import PropTypes from "prop-types";
import { uniqueId } from "lodash";
import ColorBox from "./ColorBox";
import { COLOR_PICKER_DEFAULT } from "../../../constants";
import "./styles.css";

class ColorPicker extends React.Component {
  static propTypes = {
    setColor: PropTypes.func,
  };

  constructor() {
    super();
    this.colorBoxesRef = COLOR_PICKER_DEFAULT.map((_color) => {
      return React.createRef();
    });
    this.state = {
      colorBoxIndex: 0,
    };
  }

  componentDidMount() {
    this.colorBoxesRef[0].current.focus();
  }

  pickColor = (color) => {
    this.props.setColor(color);
  };

  componentDidUpdate(_prevProps, prevState) {
    if (prevState.colorBoxIndex !== this.state.colorBoxIndex) {
      this.colorBoxesRef[this.state.colorBoxIndex].current.focus();
    }
  }

  handleKeyDown = (e) => {
    let nextIndex;

    if (e.key === "ArrowDown" || e.key === "j") {
      nextIndex = (this.state.colorBoxIndex + 1) % this.colorBoxesRef.length;
      this.setState({
        colorBoxIndex: nextIndex,
      });
      this.pickColor(COLOR_PICKER_DEFAULT[nextIndex].color);
    }

    if (e.key === "ArrowUp" || e.key === "k") {
      if (this.state.colorBoxIndex === 0) {
        nextIndex = this.colorBoxesRef.length - 1;
      } else {
        nextIndex = (this.state.colorBoxIndex - 1) % this.colorBoxesRef.length;
      }
      this.setState({
        colorBoxIndex: nextIndex,
      });
      this.pickColor(COLOR_PICKER_DEFAULT[nextIndex].color);
    }

    if (e.key === "f" && e.ctrlKey) {
      console.log(this.props.canvasRef);
      this.props.canvasRef.current.focus();
    }
  };

  render() {
    const { currentColor } = this.props;
    const colorBoxes = COLOR_PICKER_DEFAULT.map(
      ({ color, colorName }, index) => (
        <ColorBox
          color={color}
          colorName={colorName}
          onClick={this.pickColor}
          active={currentColor === color}
          key={uniqueId()}
          colorBoxRef={this.colorBoxesRef[index]}
          tabIndex={index === this.state.colorBoxIndex ? 0 : -1}
        />
      )
    );

    return (
      <div
        className="ColorPicker"
        tabIndex="0"
        onKeyDown={this.handleKeyDown}
        ref={this.props.toolbarRef}
        aria-label="Color picker"
        role="list"
      >
        {colorBoxes}
      </div>
    );
  }
}

export default ColorPicker;
