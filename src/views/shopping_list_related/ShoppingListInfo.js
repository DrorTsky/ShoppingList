import {
  CCardBody,
  CCardHeader,
  CCard,
  CLink,
  CRow,
  CCol,
} from "@coreui/react";
import React, { Component } from "react";
import Item from "../items_related/Item";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ItemService from "../dashboard/ItemService";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import AddNewItemForm from "../forms/AddNewItemForm";

export class ShoppingListInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopping_list_id: "",
      user_name: "",
      user_email: "",
      all_items: [],
      open_add_item_dialog: false,
    };
    this.openAddItemDialog = this.openAddItemDialog.bind(this);
    this.closeAddItemDialog = this.closeAddItemDialog.bind(this);
    this.getAllItems = this.getAllItems.bind(this);
  }

  async componentDidMount() {
    console.log(this);
    if (this.props !== undefined) {
      await this.setState({
        shopping_list_id: this.props.shopping_list_id,
        user_name: this.props.user_name,
        user_email: this.props.email,
      });
      console.log(this.state);
      console.log(ItemService);
      this.getAllItems();
      console.log(this.state.all_items);
    } else {
      this.props.goToMain();
    }
  }

  async getAllItems() {
    const all_items = (
      await ItemService.getAllItemFromShoppingList(
        this.state.user_name,
        this.state.user_email,
        this.state.shopping_list_id
      )
    ).data;
    this.setState({
      all_items: all_items,
    });
  }
  openAddItemDialog() {
    this.setState({
      open_add_item_dialog: true,
    });
  }

  closeAddItemDialog() {
    this.setState({
      open_add_item_dialog: false,
    });
  }

  render() {
    const items = [];
    if (this.state.all_items.length) {
      this.state.all_items.forEach((item) => {
        items.push(
          <Item
            key={item.id}
            {...item}
            user_name={this.state.user_name}
            user_email={this.state.user_email}
            shopping_list_id={this.state.shopping_list_id}
            getAllItems={this.getAllItems}
            goToMain={this.props.goToMain}
          />
        );
      });
    }
    return (
      <div>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol xs="2">
                <div className="card-header-actions">
                  <CLink
                    className="card-header-action"
                    onClick={this.props.goToMain}
                  >
                    <ArrowBackIcon />
                  </CLink>
                </div>
              </CCol>
              <CCol xs="8" style={{ fontSize: "120%" }}>
                All Items
              </CCol>
              <CCol xs="2">
                <div className="card-header-actions">
                  <CLink
                    className="card-header-action"
                    onClick={this.openAddItemDialog}
                  >
                    <AddIcon />
                  </CLink>
                </div>
                <Dialog
                  open={this.state.open_add_item_dialog}
                  onClose={this.closeAddItemDialog}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogContent>
                    <AddNewItemForm
                      user_name={this.state.user_name}
                      user_email={this.state.user_email}
                      shopping_list_id={this.state.shopping_list_id}
                      getAllItems={this.getAllItems}
                      closeDialog={this.closeAddItemDialog}
                    />
                  </DialogContent>
                </Dialog>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>{items}</CCardBody>
        </CCard>
      </div>
    );
  }
}

export default ShoppingListInfo;
