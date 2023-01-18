import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Reducer from './_reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import ChatbotPage from './pages/ChatbotPage';

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Main />}></Route>
        <Route path="/chatbot_lab" element={<Main />}></Route>
        <Route path="/chatbot" element={<ChatbotPage />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
