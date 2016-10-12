'use strict';
// 'they' created it
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// we created it
import store from './myRedux';
import { AppContainer } from './containers/AppContainer';


ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
  document.getElementById('app')
);
