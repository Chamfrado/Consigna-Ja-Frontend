import React, { useContext, useEffect, useState } from 'react';
import { Button, Divider, Icon, Layout, Modal, Text } from '@ui-kitten/components';
import { Image, View } from 'react-native';
import { ThemeButton } from './ThemeButton';
import { ThemeContext } from '../context/theme-context';
import { AuthContext } from '../context/auth-context';


const Header = () => {
    const { theme } = useContext(ThemeContext);
    const {logout, isLogged, signIn} = useContext(AuthContext)

    const SettingsIcon = (props) => (
        <Icon name='settings-outline' {...props} />
    );

    const [modalVisible, setModalVisible] = useState(false);
    const [backdropColor, setBackdropColor] = useState(getBackdropColor());

    useEffect(() => {
        setBackdropColor(getBackdropColor());
    }, [theme]);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    function getBackdropColor() {
        return theme === 'dark' ? 'rgba(189, 195, 199, 0.5)' : 'rgba(0, 0, 0, 0.5)';
    }; 108, 122

    return (
        <View>
            <Layout level='2' style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', padding: 15 }}>
                <Text status='primary' category='h2'>Sua Joia</Text>
                <Button accessoryLeft={SettingsIcon} onPress={toggleModal}></Button>
            </Layout>
            <Divider />
            <Modal
            animationType='slide'
                visible={modalVisible}
                backdropStyle={{ backgroundColor: backdropColor }}
                onBackdropPress={toggleModal}>
                <Layout level='1' style={{ padding: 20, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                    <Text category='h3'>Configurações</Text>
                    <Divider />
                    <Text category='h5' style={{ paddingTop: 30 }}>Tema</Text>
                    <ThemeButton />
                    <Divider style={{ paddingBottom: 30 }} />
                    <Button style={{ alignSelf: 'stretch' }} appearance='outline' status='danger' onPress={logout} >LOGOUT</Button>

                </Layout>
            </Modal>
        </View>
    );
};

export default Header;
