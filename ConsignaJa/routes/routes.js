import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/auth-context';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import { enableScreens } from 'react-native-screens';

enableScreens();

export const AppNavigator = () => {
  const { isLogged } = useContext(AuthContext);

  return (
    <>
      <StatusBar hidden />
      <NavigationContainer>
        {isLogged() ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </>
  );
};
