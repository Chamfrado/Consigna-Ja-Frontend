import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ClientPage } from '../pages/ClientPage';
import { ProductPage } from '../pages/ProductPage';
import { ConsignedPage } from '../pages/ConsignedPage';
import Header from '../components/Header';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

const AppStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title='Client' />
    <BottomNavigationTab title='Product' />
    <BottomNavigationTab title='Consigned' />
  </BottomNavigation>
);

export const TabNavigator = () => (
  <Tab.Navigator tabBar={props => <BottomTabBar {...props} />} screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Client" component={ClientPage} />
    <Tab.Screen name="Product" component={ProductPage} />
    <Tab.Screen name="Consigned" component={ConsignedPage} />
  </Tab.Navigator>
);

const AppRoutes = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="Main" component={TabNavigator} options={{ header: () => <Header title="Main" /> }} />
  </AppStack.Navigator>
);

export default AppRoutes;
