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

/*
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecatedå',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillUpdate is deprecated and will be removed in the next major version. Use componentDidUpdate instead. As a temporary workaround, you can rename to UNSAFE_componentWillUpdate.',
  'Warning: componentWillMount is deprecated and will be removed in the next major version. Use componentDidMount instead. As a temporary workaround, you can rename to UNSAFE_componentWillMount.',
  'Warning: componentWillMount is deprecated and will be removed in the next major version. Use componentDidMount instead. As a temporary workaround, you can rename to UNSAFE_componentWillMount.',
  'Warning: componentWillReceiveProps is deprecated and will be removed in the next major version. Use static getDerivedStateFromProps instead.',
]);
*/
YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
