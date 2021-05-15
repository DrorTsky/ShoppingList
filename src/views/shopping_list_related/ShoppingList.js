import {
  CCard,
  CCardBody,
  CLink,
  CCol,
  CRow,
  CCardLink,
  CPopover,
  CButton,
} from "@coreui/react";
import React, { Component } from "react";
import ShoppingListService from "../dashboard/ShoppingListService";
import CancelIcon from "@material-ui/icons/Cancel";
import ShoppingListMenuDropdown from "src/containers/ShoppingListMenuDropdown";

export class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shopping_list_name: "",
      open_menu: false,
    };
    this.anchorRef = React.createRef(null);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);
    this.handleListKeyDown = this.handleListKeyDown.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.enterSingleShoppingList = this.enterSingleShoppingList.bind(this);
  }
  async componentDidMount() {
    console.log(this);
    const info = (
      await ShoppingListService.getShoppingListInfo(
        this.props.user_name,
        this.props.user_email,
        this.props.shopping_list_id
      )
    ).data;
    this.setState({
      shopping_list_name: info.name,
    });
  }

  enterSingleShoppingList() {
    this.props.enterSingleShoppingList(this.props);
  }

  handleToggle() {
    this.setState((prevState) => ({
      open_menu: !prevState.open_menu,
    }));
  }

  handleCloseMenu(event) {
    if (
      this.anchorRef.current &&
      this.anchorRef.current.contains(event.target)
    ) {
      return;
    }

    this.setState({
      open_menu: false,
    });
  }

  handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      this.setState({
        open_menu: false,
      });
    }
  }

  render() {
    return (
      <div>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol xs="9">
                <CButton
                  variant="ghost"
                  color="dark"
                  onClick={this.enterSingleShoppingList}
                >
                  {this.state.shopping_list_name}
                </CButton>
              </CCol>
              <CCol xs="3">
                <ShoppingListMenuDropdown
                  {...this.props}
                  name={this.state.shopping_list_name}
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </div>
    );
  }
}

export default ShoppingList;
