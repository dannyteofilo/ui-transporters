import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import "./styles.css";

class NavComponent extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleRedirect() {
    return <Link to="/profile" className="nav-link" />;
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <Navbar color="info" dark expand="md">
          <Link to="/home" className="navbar-brand">
            Home
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem onClick={this.toggle}>
                <Link to="/vehicles" className="nav-link">
                  Vehicles
                </Link>
              </NavItem>
              <NavItem>
              <Link to="/drivers" className="nav-link">
                  Drivers
                </Link>
              </NavItem>
              <NavItem>
              <Link to="/travels" className="nav-link">
                  Travels
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {user ? user.name : "User"}
                </DropdownToggle>
                <DropdownMenu right>
                  <Link to="/profile" className="nav-link">
                    <DropdownItem>Profile</DropdownItem>
                  </Link>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.props.logout}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = store => {
  const { data } = store.login;
  return {
    user: data.user ? data.user : ""
  };
};

export default connect(mapStateToProps)(NavComponent);
