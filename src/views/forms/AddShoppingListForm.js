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

export class AddShoppingListForm extends Component {
  constructor(props) {
    super(props);

    this.state = { name: "" };
    this.addShoppingListFormSubmit = this.addShoppingListFormSubmit.bind(this);
    this.onChangeFormInput = this.onChangeFormInput.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  async addShoppingListFormSubmit() {
    const shopping_list_details = {
      name: this.state.name,
      users: [`${this.props.user_name}@@${this.props.user_email}`],
    };

    const response = await ShoppingListService.createShoppingList(
      this.props.user_name,
      this.props.user_email,
      shopping_list_details
    );

    await this.props.getAllShoppingListsOfUser();
    this.props.closeDialog();
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
          <CCardHeader>Add Shopping List</CCardHeader>
          <CCardBody>
            <CCol md="12" style={{ paddingTop: "5px" }}>
              <CInputGroup>
                <CInput
                  key="name"
                  id="input1-group1"
                  name="name"
                  placeholder="Shopping List Name"
                  value={this.state.name}
                  onChange={this.onChangeFormInput}
                  required
                />
              </CInputGroup>
            </CCol>
            {/* <CCol md="12" style={{ paddingTop: "5px" }}>
              <CInputGroup>
                <CInput
                  key="type"
                  id="input1-group1"
                  name="type"
                  placeholder="Item Type"
                  value={this.state.type}
                  onChange={this.onChangeFormInput}
                  required
                />
              </CInputGroup>
            </CCol> */}
          </CCardBody>
          <CCardFooter className="footer_contract_list_element align_center">
            <CButton
              type="submit"
              size="sm"
              color="success"
              className="buttons_inside_contract_list"
              onClick={this.addShoppingListFormSubmit}
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

export default AddShoppingListForm;
