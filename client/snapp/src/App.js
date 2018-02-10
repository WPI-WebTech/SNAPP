import React, { Component } from 'react';
import './App.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reducers from './reducers';
import Header from './components/Header';
import Main from './components/Main';
import { init as initFirebase } from './services/FirebaseService'
/**
 * The main component of the app
 */
class App extends Component {

  constructor(props) {
    super(props);
    const middleware = [];

    // connect react-router location state with redux
    this.history = createHistory();
    const reduxRouterMiddleware = routerMiddleware(this.history);
    middleware.push(reduxRouterMiddleware);

    // log redux actions in development mode
    if (process.env.NODE_ENV === 'development') {
      middleware.push(logger);
    }

    this.store = createStore(reducers, applyMiddleware(...middleware));

    initFirebase()
  }

  render() {
    return (
      <Provider store={this.store}>
        <ConnectedRouter history={this.history}>
          <MuiThemeProvider>
            <div className="App">
              <Header />
              <Main />
            </div>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
