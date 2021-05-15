import React, { Component } from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CButton,
  CCard,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import ShoppingListService from "src/views/dashboard/ShoppingListService";
import AddUserToListForm from "src/views/forms/AddUserToListForm";

export class ShoppingListMenuDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open_delete_shopping_list_dialog: false,
      open_add_user_to_list_dialog: false,
    };
    this.closeDeleteShoppingListDialog =
      this.closeDeleteShoppingListDialog.bind(this);
    this.openDeleteShoppingListDialog =
      this.openDeleteShoppingListDialog.bind(this);
    this.confirmDeleteShoppingList = this.confirmDeleteShoppingList.bind(this);
    this.openUserToShoppingListDialog =
      this.openUserToShoppingListDialog.bind(this);
    this.closeUserToShoppingListDialog =
      this.closeUserToShoppingListDialog.bind(this);
  }

  componentDidMount() {
    console.log(this);
  }

  closeDeleteShoppingListDialog() {
    this.setState({
      open_delete_shopping_list_dialog: false,
    });
  }
  openDeleteShoppingListDialog() {
    this.setState({
      open_delete_shopping_list_dialog: true,
    });
  }
  closeUserToShoppingListDialog() {
    this.setState({
      open_add_user_to_list_dialog: false,
    });
  }
  openUserToShoppingListDialog() {
    this.setState({
      open_add_user_to_list_dialog: true,
    });
  }
  async confirmDeleteShoppingList() {
    console.log("deleting");
    await ShoppingListService.deleteSingleShoppingList(
      this.props.name,
      this.props.email,
      this.props.shopping_list_id
    );
    console.log("getting lists");
    await this.props.getAllShoppingListsOfUser();
    this.closeDeleteShoppingListDialog();
  }
  render() {
    return (
      <CDropdown className="c-header-nav-item mx-2">
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <MoreVertIcon />
        </CDropdownToggle>
        <CDropdownMenu placement="bottom-end" className="pt-0">
          <CDropdownItem onClick={this.openUserToShoppingListDialog}>
            <CIcon name="cil-user-follow" className="mr-2 text-success" />
            Add new user
          </CDropdownItem>
          <Dialog
            open={this.state.open_add_user_to_list_dialog}
            onClose={this.closeUserToShoppingListDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <AddUserToListForm
                closeUserToShoppingListDialog={
                  this.closeUserToShoppingListDialog
                }
                shopping_list_id={this.props.shopping_list_id}
              />
            </DialogContent>
          </Dialog>
          <CDropdownItem onClick={this.openDeleteShoppingListDialog}>
            <CIcon name="cil-x" className="mr-2 text-danger" />
            Delete group
          </CDropdownItem>
          <Dialog
            open={this.state.open_delete_shopping_list_dialog}
            onClose={this.closeDeleteShoppingListDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogContent>
              <CCard>
                <CCardHeader>
                  <CRow>
                    <CCol
                      xs="6"
                      style={{ fontSize: "110%", paddingTop: "5px" }}
                    >
                      Delete {this.props.name}?
                    </CCol>
                    <CCol xs="3">
                      <CButton
                        block
                        variant="ghost"
                        color="danger"
                        style={{ textAlign: "center" }}
                        onClick={this.confirmDeleteShoppingList}
                      >
                        V
                      </CButton>
                    </CCol>
                    <CCol xs="3">
                      <CButton
                        block
                        variant="ghost"
                        color="Dark"
                        style={{ textAlign: "center" }}
                        onClick={this.closeDeleteShoppingListDialog}
                      >
                        X
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardHeader>
              </CCard>
            </DialogContent>
          </Dialog>
        </CDropdownMenu>
      </CDropdown>
    );
  }
}

export default ShoppingListMenuDropdown;
