import React, { Component, Fragment } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Tooltip
} from 'reactstrap';
import { connect } from 'react-redux';
import IosPersonOutline from 'react-ionicons/lib/IosPersonOutline';


import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
  state = {
    modal: false,
    name: '',
    tooltipOpen: false
  };
  
  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  toggleTooltip = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name
    };

    // add item via addItem action
    this.props.addItem(newItem);

    // close modal
    this.toggle();
  };

  render() {
    const {isAuthenticated, user} = this.props

    let welcome = '';
    if (isAuthenticated) {
      const name_array = user.name.split(' ');
      welcome = name_array[0];
    }

    return (
      <div>
        {isAuthenticated ? <Fragment><Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={this.toggle}
          id="addItem"
        >
          Add Item
        </Button>
        <div className="float-right">{welcome}<IosPersonOutline fontSize="33px" color="#43853d" /></div>

        <Tooltip
          placement="left"
          isOpen={this.state.tooltipOpen}
          target="addItem"
          toggle={this.toggleTooltip}
        >
          Add item to shopping list
        </Tooltip></Fragment>: <h5 className="mb-3 ml-3">Please login to mange items</h5>}

        

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="theme">Add to Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  name="name" // URI param | match what is in state | { id: uuid(), name: 'Bread' }
                  id="item"
                  placeholder="Enter item"
                  onChange={this.onChange}
                />
                <Button type="submit" style={{ marginTop: '2rem' }} block>
                  Save
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  { addItem }
)(ItemModal);
