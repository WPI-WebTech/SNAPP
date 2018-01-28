import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducers from './reducers';
import Header from './components/Header';
import Main from './components/Main';

/**
 * The main component of the app
 */
class App extends Component {

  constructor(props) {
    super(props);
    this.store = createStore(reducers);
  }

  render() {
    return (
      <Provider store={this.store}>
        <MuiThemeProvider>
          <div className="App">
            <Header />
            <Main />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
