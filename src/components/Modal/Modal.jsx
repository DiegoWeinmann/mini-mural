import React from "react";
import ReactDOM from "react-dom";
import propTypes from "prop-types";
import { uniqueId } from "lodash";
import "./styles.css";

const FOCUSABLE_ELEMENTS =
  'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex="0"]';

function modalFocusTrap(e, modalRef) {
  if (!modalRef) return;

  const focusableElements =
    modalRef.current.querySelectorAll(FOCUSABLE_ELEMENTS);

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (focusableElements.length === 1) {
    firstElement.focus();
    return e.preventDefault();
  }

  if (!e.shiftKey && document.activeElement === lastElement) {
    firstElement.focus();
    return e.preventDefault();
  }

  if (e.shiftKey && document.activeElement === firstElement) {
    lastElement.focus();
    return e.preventDefault();
  }
}

class Modal extends React.Component {
  static propTypes = {
    title: propTypes.string.isRequired,
    onClose: propTypes.func.isRequired,
    returnFocusRef: propTypes.object.isRequired,
  };

  constructor() {
    super();
    this.modalRef = React.createRef();
    this.closeButtonRef = React.createRef();
  }

  componentDidMount() {
    document.getElementById("root").setAttribute("aria-hidden", "true");

    if (this.modalRef && this.modalRef.current) {
      const firstFocusableElement =
        this.modalRef.current.querySelectorAll(FOCUSABLE_ELEMENTS)[0];
      firstFocusableElement.focus();
    }
  }

  componentWillUnmount() {
    document.getElementById("root").removeAttribute("aria-hidden");

    if (this.props.returnFocusRef && this.props.returnFocusRef.current) {
      this.props.returnFocusRef.current.focus();
    }
  }

  handleKeyDown = (e) => {
    if (e.key === "Escape") {
      this.props.onClose();
    }

    if (e.key === "Tab") {
      modalFocusTrap(e, this.modalRef);
    }
  };

  render() {
    const modalTitleId = uniqueId();

    return ReactDOM.createPortal(
      <React.Fragment>
        <div
          className="Modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          onKeyDown={this.handleKeyDown}
          ref={this.modalRef}
        >
          <div className="Modal__container">
            <h1 className="Modal__title" id={modalTitleId}>
              {this.props.title}
            </h1>
            <div className="Modal__content" role="main">
              {this.props.children}
            </div>
            <div className="Modal__button-container">
              <button ref={this.closeButtonRef} onClick={this.props.onClose}>
                Close
              </button>
            </div>
          </div>
        </div>
        <div
          className="Modal__overlay"
          onClick={this.props.onClose}
          aria-hidden="true"
        />
      </React.Fragment>,
      document.body
    );
  }
}

export default Modal;
