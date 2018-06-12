import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components';
import Cart from './components/Cart';
import store from './store';

class App extends Component {
  render() {
    return (
     <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" component={Main} />
            <Route exact path="/cart" component={Cart} />
          </div>
        </Router>
     </Provider>
    );
  }
}

export default App;
