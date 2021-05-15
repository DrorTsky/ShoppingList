import React, { Component } from "react";
import { CLink, CCard, CCardHeader, CCardBody } from "@coreui/react";
import AddIcon from "@material-ui/icons/Add";
import ShoppingListService from "../dashboard/ShoppingListService";
import ShoppingList from "./ShoppingList";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import AddNewItemForm from "../forms/AddNewItemForm";
import AddShoppingListForm from "../forms/AddShoppingListForm";
import ShoppingListInfo from "./ShoppingListInfo";

const TEMP_NAME = "dror";
const TEMP_EMAIL = "dror@gmail.com";

export class AllShoppingLists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopping_lists: [],
      open_add_shopping_list_dialog: false,
      isSelected: false,
      shopping_list_props: {},
    };
    this.getAllShoppingListsOfUser = this.getAllShoppingListsOfUser.bind(this);
    this.closeAddShoppingListDialog =
      this.closeAddShoppingListDialog.bind(this);
    this.openAddShoppingListDialog = this.openAddShoppingListDialog.bind(this);
    this.enterSingleShoppingList = this.enterSingleShoppingList.bind(this);
    this.returnToAllShoppingLists = this.returnToAllShoppingLists.bind(this);
  }

  enterSingleShoppingList(propsFromList) {
    this.setState({
      isSelected: true,
      shopping_list_props: propsFromList,
    });
  }

  returnToAllShoppingLists() {
    this.setState({
      isSelected: false,
    });
  }

  async componentDidMount() {
    this.getAllShoppingListsOfUser();
  }

  closeAddShoppingListDialog() {
    this.setState({
      open_add_shopping_list_dialog: false,
    });
  }
  openAddShoppingListDialog() {
    this.setState({
      open_add_shopping_list_dialog: true,
    });
  }

  // gets items from shopping list
  // async getShoppingListsItems() {
  //   this.state.shopping_lists.forEach(async (list) => {
  //     const all_items_array = (
  //       await ItemService.getAllItemFromShoppingList(
  //         TEMP_NAME,
  //         TEMP_EMAIL,
  //         list
  //       )
  //     ).data;
  //     all_items_array.forEach((item) => {
  //       console.log(item);
  //     });
  //   });
  // }

  // //get single item from shopping list
  // async getSingleItemFromShoppingList() {
  //   const item_name = "milk";
  //   const list = "7d556769-bc93-47fe-be64-79e9f2acf87d";
  //   const item = (
  //     await ItemService.getSingleItemFromShoppingList(
  //       TEMP_NAME,
  //       TEMP_EMAIL,
  //       list,
  //       item_name
  //     )
  //   ).data;
  //   console.log(item);
  // }

  async getAllShoppingListsOfUser() {
    console.log("getting lists");
    try {
      let data = await ShoppingListService.getAllShoppingListsOfUser(
        this.props.user_name,
        this.props.user_email
      );
      console.log(data.data);
      this.setState({
        shopping_lists: data.data,
      });
    } catch {
      this.setState({
        shopping_lists: [],
      });
    }
  }
  render() {
    const all_shopping_lists = [];
    console.log(this.state.shopping_lists);
    this.state.shopping_lists.forEach(async (list) => {
      // console.log(`list: ${list}`);
      all_shopping_lists.push(
        <ShoppingList
          key={list}
          user_name={this.props.user_name}
          email={this.props.user_email}
          shopping_list_id={list}
          getAllShoppingListsOfUser={this.getAllShoppingListsOfUser}
          enterSingleShoppingList={this.enterSingleShoppingList}
        />
      );
    });

    const page_display = [];
    if (!this.state.isSelected) {
      page_display.push(
        <CCard>
          <CCardHeader>
            All Shopping Lists
            <div className="card-header-actions">
              <CLink
                className="card-header-action"
                onClick={this.openAddShoppingListDialog}
              >
                <AddIcon />
              </CLink>
              <Dialog
                open={this.state.open_add_shopping_list_dialog}
                onClose={this.closeAddShoppingListDialog}
                aria-labelledby="form-dialog-title"
              >
                <DialogContent>
                  <AddShoppingListForm
                    user_name={this.props.user_name}
                    user_email={this.props.user_email}
                    getAllShoppingListsOfUser={this.getAllShoppingListsOfUser}
                    closeDialog={this.closeAddShoppingListDialog}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CCardHeader>
          <CCardBody>{all_shopping_lists}</CCardBody>
        </CCard>
      );
    } else {
      page_display.push(
        <ShoppingListInfo
          {...this.state.shopping_list_props}
          goToMain={this.returnToAllShoppingLists}
        />
      );
    }

    return <div>{page_display} </div>;
  }
}

export default AllShoppingLists;
