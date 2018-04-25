import React from 'react';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator, SwitchNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import CategoryListScreen from './src/components/CategoryListScreen';
import CategoryScreen from './src/components/CategoryScreen';
import CartScreen from './src/components/CartScreen';
import ItemScreen from './src/components/ItemScreen';
import SignInScreen from './src/components/SignInScreen';
import SignUpScreen from './src/components/SignUpScreen';
import AccountScreen from './src/components/AccountScreen';
import WelcomeScreen from './src/components/WelcomeScreen';
import CartWidget from './src/components/widgets/CartWidget';
import LogoHeader from './src/components/widgets/LogoHeader';
import CartTitleWidget from './src/components/widgets/CartTitleWidget';

const AuthStack = StackNavigator(
  { WelcomeScreen, SignInScreen, SignUpScreen },
  {
    initialRouteName: 'WelcomeScreen',
    navigationOptions: { header: () => (<LogoHeader />) },
  });

const MenuStack = StackNavigator(
  { CategoryListScreen, CategoryScreen, ItemScreen },
  {
    initialRouteName: 'CategoryListScreen',
    navigationOptions: ({ navigation }) => ({
      headerRight: <CartWidget navigation={navigation} />,
    }),
  },
);

const AppStack = StackNavigator(
  {
    MenuStack,
    CartScreen: {
      screen: CartScreen,
      navigationOptions: {
        header: <CartTitleWidget />,
      },
    },
  },
  { initialRouteName: 'MenuStack', navigationOptions: { header: null, tabBarLabel: 'Menu' } },
);

const SettingsStack = StackNavigator(
  { AccountScreen },
  {
    initialRouteName: 'AccountScreen',
    navigationOptions: ({ navigation }) => ({
      headerRight: <CartWidget navigation={navigation} />,
      tabBarLabel: 'Account',
    }),
  },
);

const TabNavigationStack = TabNavigator(
  { AppStack, SettingsStack },
  {
    initialRouteName: 'AppStack',
    tabBarOptions: { activeTintColor: 'tomato', inactiveTintColor: 'gray' },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animatedEnabled: true,
    swipeEnabled: true,
    navigationOptions: ({ navigation }) => ({
      header: null,
      tabBarIcon: ({ focused, tintColor }) => {
        const iconName = (navigation.state.routeName === 'AppStack') ?
          `ios-book${focused ? '' : '-outline'}` :
          `ios-settings${focused ? '' : '-outline'}`;
        return <Ionicons name={iconName} size={35} color={tintColor} />;
      },
    }),
  });

const chooseRootStack = authTokenExists => SwitchNavigator(
  { AuthStack, TabNavigationStack },
  { initialRouteName: authTokenExists ? 'TabNavigationStack' : 'AuthStack' },
);

const RootStackSwitcher = ({ authTokenExists }) => {
  const RootNode = chooseRootStack(authTokenExists);
  return <RootNode />;
};

export default connect(state => (
  { authTokenExists: state.user.authToken }), null)(RootStackSwitcher);
