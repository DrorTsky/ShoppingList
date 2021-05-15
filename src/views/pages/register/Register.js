import React, { Component } from "react";
import { Redirect } from "react-router";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CLink,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import UserService from "src/views/dashboard/UserService";

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      user_email: "",
      message: "",
      redirect: false,
    };
    this.onChangeFormInput = this.onChangeFormInput.bind(this);
    this.register = this.register.bind(this);
  }

  onChangeFormInput(event) {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  }

  async register() {
    const user_details = {
      user_name: this.state.user_name,
      email: this.state.user_email,
      role: "USER",
    };
    try {
      let data = await UserService.createUser(user_details);
      this.setState({
        redirect: true,
      });
    } catch {}
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="9" lg="7" xl="6">
              <CCard className="mx-4">
                <CCardBody className="p-4">
                  <CForm>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        name="user_name"
                        placeholder="Username"
                        autoComplete="off"
                        onChange={this.onChangeFormInput}
                        value={this.state.user_name}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>@</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="email"
                        name="user_email"
                        placeholder="Email"
                        autoComplete="off"
                        onChange={this.onChangeFormInput}
                        value={this.state.user_email}
                      />
                    </CInputGroup>

                    <CButton color="success" block onClick={this.register}>
                      Create Account
                    </CButton>
                    <CLink to="/">
                      <CButton
                        color="secondary"
                        block
                        style={{ marginTop: "10px" }}
                      >
                        Already Registered?
                      </CButton>
                    </CLink>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Register;
