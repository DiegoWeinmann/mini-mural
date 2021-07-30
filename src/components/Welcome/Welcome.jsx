import React from "react";
import { isEmpty } from "lodash";
import logo from "./logo.svg";
import Instructions from "../Instructions";
import "./styles.css";

class Welcome extends React.Component {
  render() {
    const { notes } = this.props;

    if (!isEmpty(notes)) return null;

    return (
      <section className="Welcome">
        <img src={logo} className="logo" alt="mini mural logo" />
        <Instructions />
      </section>
    );
  }
}

export default Welcome;
