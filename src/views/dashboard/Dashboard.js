import React, { Component } from "react";

import AllShoppingLists from "../shopping_list_related/AllShoppingLists";

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <AllShoppingLists />
      </div>
    );
  }
}

export default Dashboard;
