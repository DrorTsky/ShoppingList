import React, { Component } from "react";

import AllShoppingLists from "../shopping_list_related/AllShoppingLists";

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <AllShoppingLists />
      </div>
    );
  }
}

export default Dashboard;
