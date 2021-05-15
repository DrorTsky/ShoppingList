import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CInput,
  CInputGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ShoppingListService from "../dashboard/ShoppingListService";

export class AddUserToListForm extends Component {
  constructor(props) {
    super(props);

    this.state = { name: "", email: "" };
    this.addUserFormSubmit = this.addUserFormSubmit.bind(this);
    this.onChangeFormInput = this.onChangeFormInput.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  async addUserFormSubmit() {
    await ShoppingListService.addUserToShoppingList(
      this.state.name,
      this.state.email,
      this.props.shopping_list_id
    );
    this.props.closeUserToShoppingListDialog();
  }

  resetForm() {
    this.setState({ name: "" });
  }

  onChangeFormInput(event) {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <CCard>
          <CCardHeader>Add User To List</CCardHeader>
          <CCardBody>
            <CCol md="12" style={{ paddingTop: "5px" }}>
              <CInputGroup>
                <CInput
                  key="name"
                  id="input1-group1"
                  name="name"
                  placeholder="User Name"
                  value={this.state.name}
                  onChange={this.onChangeFormInput}
                  required
                />
              </CInputGroup>
            </CCol>
            <CCol md="12" style={{ paddingTop: "5px" }}>
              <CInputGroup>
                <CInput
                  key="email"
                  id="input1-group1"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.onChangeFormInput}
                  required
                />
              </CInputGroup>
            </CCol>
          </CCardBody>
          <CCardFooter className="footer_contract_list_element align_center">
            <CButton
              type="submit"
              size="sm"
              color="success"
              className="buttons_inside_contract_list"
              onClick={this.addUserFormSubmit}
            >
              <CIcon name="cil-scrubber" /> Submit
            </CButton>
            <CButton
              type="reset"
              size="sm"
              color="danger"
              className="buttons_inside_contract_list"
              onClick={this.resetForm}
            >
              <CIcon name="cil-ban" /> Reset
            </CButton>
          </CCardFooter>
        </CCard>
      </div>
    );
  }
}

export default AddUserToListForm;
