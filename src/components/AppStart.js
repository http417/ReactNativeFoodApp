import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigator, SwitchNavigator, TabBarBottom, TabNavigator } from 'react-navigation';
import LogoHeader from './widgets/LogoHeader';
import ContainerCatListScreen from './containers/containerCatListScreen';
import ContainerCatScreen from './containers/containerCatScreen';
import ContainerCartScreen from './containers/containerCartScreen';
import ContainerItemScreen from './containers/containerItemScreen';
import ContainerSignInScreen from './containers/containerSignInScreen';
import ContainerSignUpScreen from './containers/containerSignUpScreen';
import AccountScreen from './containers/containerAccountScreen';
import ContainerAuthLoadingScreen from './containers/containerAuthLoadingScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import CartWidget from './widgets/CartWidget';

const MenuStack = StackNavigator({
  CategoryListScreen: {
    screen: ContainerCatListScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Good Uncle Menu',
      header: () => (<LogoHeader signedIn navigation={navigation} />),
    }),
  },
  CategoryScreen: {
    screen: ContainerCatScreen,
  },
  ItemScreen: {
    screen: ContainerItemScreen,
  },
  CartScreen: {
    screen: ContainerCartScreen,
    navigationOptions: {
      title: 'Your Cart',
    },
  },
}, {
  initialRouteName: 'CategoryListScreen',
  navigationOptions: ({ navigation }) => (
    (navigation.state.routeName !== 'CartScreen') ?
      {
        headerRight: <CartWidget navigation={navigation} />,
      } : {}
  ),
});

const AccountStack = StackNavigator({
  Account: {
    screen: AccountScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Account Settings',
      headerRight: <CartWidget navigation={navigation} />,
    }),
  },
});

const AppTabbedStack = TabNavigator({
  Menu: {
    screen: MenuStack,
    navigationOptions: {
      tabBarLabel: 'Menu',
    },
  },
  Account: {
    screen: AccountStack,
  },
}, {
  initialRouteName: 'Menu',
  navigationOptions: ({ navigation }) => ({
    header: null,
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Menu') {
        iconName = `ios-book${focused ? '' : '-outline'}`;
      } else if (routeName === 'Account') {
        iconName = `ios-settings${focused ? '' : '-outline'}`;
      }
      return <Ionicons name={iconName} size={35} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animatedEnabled: true,
  swipeEnabled: true,
});

const AppStack = StackNavigator({
  Home: {
    screen: AppTabbedStack,
  },
  ItemScreen: {
    screen: ContainerItemScreen,
  },
  CategoryScreen: {
    screen: ContainerCatScreen,
  },
});


const AuthStack = StackNavigator({
  Welcome: WelcomeScreen,
  SignIn: ContainerSignInScreen,
  SignUp: ContainerSignUpScreen,
}, {
  initialRouteName: 'Welcome',
});


const RootStack = SwitchNavigator(
  {
    AuthLoading: ContainerAuthLoadingScreen,
    App: {
      screen: AppStack,
    },
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  });

export default RootStack;
