import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ItemService from "../dashboard/ItemService";

export class UpdateItemForm extends Component {
  constructor(props) {
    super(props);

    this.state = { type: "", name: "", price: "", size: "", amount: "1" };
    this.addItemFormSubmit = this.addItemFormSubmit.bind(this);
    this.onChangeFormInput = this.onChangeFormInput.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentDidMount() {
    if (this.props.item_attributes.price) {
      this.setState({
        price: this.props.item_attributes.price,
      });
    }
    if (this.props.item_attributes.size) {
      this.setState({
        size: this.props.item_attributes.size,
      });
    }
    this.setState({
      type: this.props.type,
      name: this.props.name,
      amount: this.props.item_attributes.amount,
    });
  }
  async addItemFormSubmit() {
    const attributes = { amount: this.state.amount };
    if (this.state.price) attributes["price"] = this.state.price;
    if (this.state.size) attributes["size"] = this.state.size;

    const item_details = {
      type: this.state.type,
      name: this.state.name,
      active: "true",
      completed: "false",
      item_attributes: attributes,
    };

    const response = await ItemService.updateSingleItem(
      this.props.user_name,
      this.props.user_email,
      this.props.shopping_list_id,
      this.state.name,
      item_details
    );

    await this.props.getAllItems();
    this.props.closeDialog();
  }

  resetForm() {
    this.setState({ type: "", name: "", price: "", size: "", amount: "1" });
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
          <CCardHeader>Update Item</CCardHeader>
          <CCardBody>
            <CCol md="12" style={{ paddingTop: "5px" }}>
              <CInputGroup>
                <CInput
                  key="name"
                  id="input1-group1"
                  name="name"
                  placeholder="Item Name"
                  value={this.state.name}
                  onChange={this.onChangeFormInput}
                  required
                />
              </CInputGroup>
            </CCol>
            <CCol md="12" style={{ paddingTop: "5px" }}>
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
            </CCol>
            <CCol md="12" style={{ paddingTop: "5px" }}>
              <CInputGroup>
                <CInput
                  key="price"
                  id="input1-group1"
                  name="price"
                  placeholder="Item Price"
                  value={this.state.price}
                  onChange={this.onChangeFormInput}
                />
              </CInputGroup>
            </CCol>
            <CCol md="12" style={{ paddingTop: "5px" }}>
              <CInputGroup>
                <CInput
                  key="size"
                  id="input1-group1"
                  name="size"
                  placeholder="Item Size"
                  value={this.state.size}
                  onChange={this.onChangeFormInput}
                />
              </CInputGroup>
            </CCol>
            <CCol md="12" style={{ paddingTop: "5px" }}>
              <CInputGroup>
                <CInput
                  key="amount"
                  id="input1-group1"
                  name="amount"
                  placeholder="Item Amount"
                  value={this.state.amount}
                  onChange={this.onChangeFormInput}
                  required
                />
              </CInputGroup>
            </CCol>
            <h6>{this.state.isFriendExistsMessage}</h6>
          </CCardBody>
          <CCardFooter className="footer_contract_list_element align_center">
            <CButton
              type="submit"
              size="sm"
              color="success"
              className="buttons_inside_contract_list"
              onClick={this.addItemFormSubmit}
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

export default UpdateItemForm;
