import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CLink,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import UserService from "src/views/dashboard/UserService";

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      user_email: "",
      message: "",
    };
    this.onChangeFormInput = this.onChangeFormInput.bind(this);
    this.login = this.login.bind(this);
  }

  onChangeFormInput(event) {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    this.setState({ [name]: value });
  }

  async login() {
    console.log(`${this.state.user_name} ${this.state.user_email}`);
    try {
      let data = (
        await UserService.getSingleUser(
          this.state.user_name,
          this.state.user_email
        )
      ).data;
      this.setState({
        message: "",
        user_name: data.user_name,
        user_email: data.email,
      });
      this.props.isLoggedInCheck(this.state.user_name, this.state.user_email);
    } catch {
      this.setState({
        message: "user not found",
      });
    }
  }

  render() {
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CRow>
                <CCardGroup>
                  <CCol xs="12">
                    <CCard className="p-4">
                      <CCardBody>
                        <CForm>
                          <h1>Login</h1>
                          <p className="text-muted">Sign In to your account</p>
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
                          <CInputGroup className="mb-4">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-envelope-closed" />
                              </CInputGroupText>
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
                          <CRow>
                            <CCol xs="6">
                              <CButton
                                color="primary"
                                className="px-4"
                                onClick={this.login}
                              >
                                Login
                              </CButton>
                            </CCol>
                            <CCol xs="6" className="text-right">
                              <CLink to="/register">
                                <CButton color="link" className="px-0">
                                  Not Registered?
                                </CButton>
                              </CLink>
                            </CCol>
                          </CRow>
                          <CRow>
                            <h7>{this.state.message}</h7>
                          </CRow>
                        </CForm>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CCardGroup>
              </CRow>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Login;
