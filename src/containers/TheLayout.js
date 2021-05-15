import React, { Component } from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
import Login from "../views/pages/login/Login";

export class TheLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      user_name: "",
      user_email: "",
    };
    this.isLoggedInCheck = this.isLoggedInCheck.bind(this);
  }

  isLoggedInCheck = (user_name, user_email) => {
    this.setState({
      isLoggedIn: true,
      user_name: user_name,
      user_email: user_email,
    });
  };

  render() {
    var main = [];
    main = this.state.isLoggedIn ? (
      <div className="c-app c-default-layout">
        <TheSidebar />
        <div className="c-wrapper">
          <TheHeader />
          <div className="c-body">
            <TheContent
              user_name={this.state.user_name}
              user_email={this.state.user_email}
            />
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
