import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from "./Drawer.module.css";

const links = [
  {to: "/", label: "Quiz List", exact: true},
  {to: "/auth", label: "Authorization", exact: false},
  {to: "/quiz-creator", label: "Add New Test", exact: false},
];

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks() {
    return links.map((link, idx) => {
      return (
        <li key={idx}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const classesArr = [classes.Drawer];

    if (!this.props.isOpen) {
      classesArr.push(classes.close);
    }
    return (
      <>
        <nav className={classesArr.join(" ")}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    );
  }
}

export default Drawer;
