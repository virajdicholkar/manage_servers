import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

import FirstPage from "./first-page/first-page";
import rootReducer from "./reducers/index";
import { initialState } from "./reducers/server";

class App extends Component {
  render() {
    const store = createStore(rootReducer, initialState, applyMiddleware(thunk))
    return (
      <Provider store={store}>
        <BrowserRouter>
          <FirstPage />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
