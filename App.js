import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { YellowBox } from 'react-native';
import { persistor, store } from './src/store/configureStore';
import LoadingScreen from './src/components/screens/LoadingScreen';
import AppStart from './src/components/AppStart';

export default () => (
  <Provider store={store}>
    <PersistGate loading={<LoadingScreen />} persistor={persistor}>
      <AppStart />
    </PersistGate>
  </Provider>
);

console.disableYellowBox = true;

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);
