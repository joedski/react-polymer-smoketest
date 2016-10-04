
import ReactPolymer from 'react-polymer'; // Must be imported before React.
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './views/App';
import configureStore from './store';

ReactPolymer.registerEvent('selected-key-changed', { onSelectedKeyChanged: true }, { onSelectedKeyChangedCapture: true });

const stubData = {
  apps: [
    { id: '1', name: 'Fancy App', rating: 5, description: 'This is a super fancy app.' },
    { id: '2', name: 'Old App', rating: 1, description: 'This is an old rickety app.' },
    { id: '3', name: 'Another App', rating: 3, description: 'It works, but it could be better.' },
  ],
  user: {
    name: 'Gratia Example',
  },
  selection: {
    selectedAppId: '1',
  },
};

const store = configureStore(stubData);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app-container')
);
