import React, { Component } from "react";
import { CLink, CCard, CCardHeader, CCardBody } from "@coreui/react";
import AddIcon from "@material-ui/icons/Add";
import ShoppingListService from "../dashboard/ShoppingListService";
import ItemService from "../dashboard/ItemService";

const TEMP_NAME = "dror";
const TEMP_EMAIL = "dror@gmail.com";

export class AllShoppingLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopping_lists: [],
    };
    this.getAllShoppingListsOfUser = this.getAllShoppingListsOfUser.bind(this);
    this.getShoppingListsInfo = this.getShoppingListsInfo.bind(this);
  }

  async componentDidMount() {
    let data = (
      await ShoppingListService.getAllShoppingListsOfUser(TEMP_NAME, TEMP_EMAIL)
    ).data;
    this.setState({
      shopping_lists: data,
    });
    console.log(this.state.shopping_lists);
  }

  // gets items from shopping list
  async getShoppingListsInfo() {
    this.state.shopping_lists.forEach(async (list) => {
      const all_items_array = (
        await ItemService.getAllItemFromShoppingList(
          TEMP_NAME,
          TEMP_EMAIL,
          list
        )
      ).data;
      all_items_array.forEach((item) => {
        console.log(item);
      });
    });
  }

  //get single item from shopping list
  async getSingleItemFromShoppingList() {
    const item_name = "milk";
    const list = "7d556769-bc93-47fe-be64-79e9f2acf87d";
    const item = (
      await ItemService.getSingleItemFromShoppingList(
        TEMP_NAME,
        TEMP_EMAIL,
        list,
        item_name
      )
    ).data;
    console.log(item);
  }

  async getAllShoppingListsOfUser() {
    console.log(
      (
        await ShoppingListService.getAllShoppingListsOfUser(
          TEMP_NAME,
          TEMP_EMAIL
        )
      ).data
    );
    // console.log((await ShoppingListService.getString()).data);
  }
  render() {
    const all_shopping_lists = [];

    return (
      <div>
        <CCard>
          <CCardHeader>
            All Shopping Lists
            <div className="card-header-actions">
              <CLink
                className="card-header-action"
                onClick={this.getSingleItemFromShoppingList}
              >
                <AddIcon />
              </CLink>
            </div>
          </CCardHeader>
          <CCardBody></CCardBody>
        </CCard>
      </div>
    );
  }
}

export default AllShoppingLists;
