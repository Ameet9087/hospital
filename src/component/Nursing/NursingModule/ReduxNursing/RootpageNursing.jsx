import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import NursingRoute from '../nurseRoute';

ReactDOM.render(
  <Provider store={store}>
    <NursingRoute />
  </Provider>,
  document.getElementById('root')
);
