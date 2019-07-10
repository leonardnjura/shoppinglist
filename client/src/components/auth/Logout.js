import React, { Component, Fragment } from 'react';
import { NavLink, Tooltip } from 'reactstrap';
import { FaSignOutAlt } from 'react-icons/fa';

import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };
  
  state = {
    tooltipOpen: false
  };

  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.props.logout} href="#">
           <FaSignOutAlt id="logoutIcon"/>
           <Tooltip placement="left" isOpen={this.state.tooltipOpen} target="logoutIcon" toggle={this.toggle}>
          Sign out
        </Tooltip>
        </NavLink>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { logout }
)(Logout);
