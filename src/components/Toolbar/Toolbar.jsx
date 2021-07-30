import React from "react";
import ClipboardManager from "../ClipboardManager";
import ColorPicker from "./ColorPicker";
import Modal from "../Modal";
import Instructions from "../Instructions";
import "./styles.css";

class Toolbar extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
    };
    this.openModalButtonRef = React.createRef();
  }

  componentDidMount() {
    this.keydownListener = document.body.addEventListener("keydown", (e) => {
      if (e.key === "?") {
        this.handleModalOpen();
      }
    });
  }

  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.keydownListener);
  }

  handleModalOpen = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  handleModalClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    return (
      <aside className="Toolbar" aria-label="Mini mural toolbar">
        <ColorPicker
          canvasRef={this.props.canvasRef}
          toolbarRef={this.props.toolbarRef}
        />
        <ClipboardManager />
        <button
          onClick={this.handleModalOpen}
          ref={this.openModalButtonRef}
          aria-label="Open Help"
        >
          Help
        </button>
        {this.state.isModalOpen && (
          <Modal
            onClose={this.handleModalClose}
            returnFocusRef={this.openModalButtonRef}
            title="Mini mural instructions"
          >
            <Instructions />
          </Modal>
        )}
      </aside>
    );
  }
}

export default Toolbar;
