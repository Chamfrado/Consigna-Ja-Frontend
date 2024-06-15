import React, { useContext } from 'react';
import { BottomNavigation, BottomNavigationTab, Button, Card, Divider, Icon, Input, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { ThemeContext } from '../context/theme-context';
import { Container } from '../components/Container';
import { Image, View } from 'react-native';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import LogoImage from '../assets/logo.png'
import { LoginForm } from '../components/LoginForm';


export const LoginScreen = ({ navigation }) => {

  const themeContext = useContext(ThemeContext);

  

  return (
    <Container >
      <Layout level='2' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Card disabled>
          <View  style={{ alignItems: 'center' }}>
            <Image source={LogoImage}/>
          </View>

          <Divider />
          <LoginForm navigation={navigation}/>
          

        </Card>

      </Layout>

    </Container>
  );
};