import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { CCard, CCol, CRow, CLink, CCardHeader, CButton } from "@coreui/react";
import DeleteIcon from "@material-ui/icons/Delete";
import ItemService from "../dashboard/ItemService";
import UpdateItemForm from "../forms/UpdateItemForm";

export class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open_information_dialog: false,
      open_delete_item_dialog: false,
      open_update_item_dialog: false,
    };

    this.openInformationDialog = this.openInformationDialog.bind(this);
    this.closeInformationDialog = this.closeInformationDialog.bind(this);
    this.openDeleteItemDialog = this.openDeleteItemDialog.bind(this);
    this.closeDeleteItemDialog = this.closeDeleteItemDialog.bind(this);
    this.openUpdateItemDialog = this.openUpdateItemDialog.bind(this);
    this.closeUpdateItemDialog = this.closeUpdateItemDialog.bind(this);
    this.changeCompleted = this.changeCompleted.bind(this);
    this.confirmDeleteItem = this.confirmDeleteItem.bind(this);
    this.openUpdateItemForm = this.openUpdateItemForm.bind(this);
  }

  async confirmDeleteItem() {
    console.log(this);
    await ItemService.deleteSingleItem(
      this.props.user_name,
      this.props.user_email,
      this.props.shopping_list_id,
      this.props.name
    );
    try {
      await this.props.getAllItems();
    } catch {
      this.props.goToMain();
      this.closeDeleteItemDialog();
    }
  }

  openUpdateItemForm() {
    this.closeInformationDialog();
    this.openUpdateItemDialog();
  }

  openInformationDialog() {
    this.setState({
      open_information_dialog: true,
    });
  }

  closeInformationDialog() {
    this.setState({
      open_information_dialog: false,
    });
  }

  openUpdateItemDialog() {
    this.setState({
      open_update_item_dialog: true,
    });
  }

  closeUpdateItemDialog() {
    this.setState({
      open_update_item_dialog: false,
    });
  }

  openDeleteItemDialog() {
    this.setState({
      open_delete_item_dialog: true,
    });
  }

  closeDeleteItemDialog() {
    this.setState({
      open_delete_item_dialog: false,
    });
  }

  changeCompleted() {
    var completed = this.props.completed === "true" ? false : true;
    console.log(this);
  }

  render() {
    const attributes = [];
    if (this.props.item_attributes) {
      for (const [index, value] of Object.entries(this.props.item_attributes)) {
        attributes.push(
          <div>
            <Typography
              style={{
                display: "inline",
                wordWrap: "break-word",
              }}
            >
              {index}: {value}
            </Typography>
            <br></br>
          </div>
        );
      }
    }

    return (
      <div>
        <CCard>
          <CCardHeader>
            <CRow>
              <CCol xs="2">
                <Checkbox onChange={this.changeCompleted} />
              </CCol>
              <CCol xs="8">
                <Button
                  style={{ paddingTop: "9px", width: "100%" }}
                  onClick={this.openInformationDialog}
                >
                  {this.props.name}
                </Button>
                <Dialog
                  open={this.state.open_information_dialog}
                  onClose={this.closeInformationDialog}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    {this.props.name}
                    <div
                      className="card-header-actions"
                      style={{ paddingLeft: "4px" }}
                    >
                      <CButton
                        variant="ghost"
                        color="dark"
                        onClick={this.openUpdateItemForm}
                      >
                        update
                      </CButton>
                    </div>
                  </DialogTitle>
                  <DialogContent>{attributes}</DialogContent>
                </Dialog>
                <Dialog
                  open={this.state.open_update_item_dialog}
                  onClose={this.closeUpdateItemDialog}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogContent>
                    <UpdateItemForm
                      {...this.props}
                      closeDialog={this.closeUpdateItemDialog}
                    />
                  </DialogContent>
                </Dialog>
              </CCol>
              <CCol xs="2">
                <div className="card-header-actions">
                  <CLink
                    className="card-header-action"
                    onClick={this.openDeleteItemDialog}
                  >
                    <DeleteIcon style={{ fontSize: 30, paddingTop: "5px" }} />
                  </CLink>
                </div>
                <Dialog
                  open={this.state.open_delete_item_dialog}
                  onClose={this.closeDeleteItemDialog}
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
                              onClick={this.confirmDeleteItem}
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
                              onClick={this.closeDeleteItemDialog}
                            >
                              X
                            </CButton>
                          </CCol>
                        </CRow>
                      </CCardHeader>
                    </CCard>
                  </DialogContent>
                </Dialog>
              </CCol>
            </CRow>
          </CCardHeader>
        </CCard>
      </div>
    );
  }
}

export default Item;

{
  /* <Dialog
  open={openCheckRotation}
  onClose={handleCloseCheckRotation}
  aria-labelledby="form-dialog-title"
>
  <DialogTitle id="form-dialog-title">Choose Rotation</DialogTitle>
  <DialogContent>
    <h1>OPEN</h1>
  </DialogContent>
</Dialog>; */
}
