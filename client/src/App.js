import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';

//local imports
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import store from './store';
import { loadUser } from './actions/authActions';

//css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
