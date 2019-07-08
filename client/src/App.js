import React from 'react';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import store from './store';

//stylz
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//local importz
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';

function App() {
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

export default App;
