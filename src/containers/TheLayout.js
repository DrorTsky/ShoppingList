import React, { Component } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import Login from "../views/pages/login/Login";

export class TheLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: true,
    };
    this.isLoggedInCheck = this.isLoggedInCheck.bind(this);
  }

  isLoggedInCheck = async (phoneNumber) => {
    console.log("checking user");
  };

  render() {
    var main = [];
    main = this.state.isLoggedIn ? (
      <div className="c-app c-default-layout">
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <TheContent />
          </div>
          <TheFooter />
        </div>
      </div>
    ) : (
      <Login isLoggedInCheck={this.isLoggedInCheck} />
    );
    return <div>{main}</div>;
  }
}

export default TheLayout;
