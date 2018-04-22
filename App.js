import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { YellowBox } from 'react-native';
import { persistor, store } from './src/store/configureStore';
import LoadingScreen from './src/components/LoadingScreen';
import AppScreenRouter from './AppScreenRouter';

export default () => (
  <Provider store={store}>
    <PersistGate loading={<LoadingScreen />} persistor={persistor}>
      <AppScreenRouter />
    </PersistGate>
  </Provider>
);

console.disableYellowBox = true;

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);
