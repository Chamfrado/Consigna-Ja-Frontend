import React, { useContext } from "react";
import { Toggle, Icon, Layout, Text, Input, Button } from '@ui-kitten/components';
import { ThemeContext } from "../context/theme-context";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { View } from "react-native";
import { AuthContext } from "../context/auth-context";

export const LoginForm = ({ navigation }) => { // <-- Receive navigation as a prop

    const { signIn } = useContext(AuthContext)



    const navigateDetails = async () => {

        let response = await signIn(email, password)
        if (response) {
            navigation.navigate('Main');
            alert("logado com sucesso!")
        } else {

        }

    };






    //Password input Area
    const [password, setPassword] = React.useState('');
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon
                name={secureTextEntry ? 'eye-off' : 'eye'}
            />
        </TouchableWithoutFeedback>
    );

    const renderCaption = () => {
        return (
            <View >

                <Text category='c2'>
                    Esqueceu a senha?
                </Text>
            </View>
        );
    };


    //Email Input Area
    const [email, setEmail] = React.useState('');

    const renderUserIcon = (
        <Icon name='person-outline' />
    )
    return (
        <Layout level="1">
            <View style={{ paddingTop: 30 }}>
                <Text status='primary' category='h5'>Email</Text>

                <Input
                    value={email}
                    placeholder='Entre com seu email'
                    accessoryRight={renderUserIcon}
                    onChangeText={nextvalue => setEmail(nextvalue)}
                />

            </View>
            <View style={{ paddingTop: 30 }}>
                <Text status='primary' category='h5'>Senha</Text>

                <Input
                    value={password}
                    placeholder='Entre com a sua senha'
                    caption={renderCaption}
                    accessoryRight={renderIcon}
                    secureTextEntry={secureTextEntry}
                    onChangeText={nextvalue => setPassword(nextvalue)}
                />

            </View>
            <View style={{ paddingTop: 30 }}>
                <Button style={{ marginVertical: 4 }} onPress={navigateDetails}>Login</Button>
            </View>
        </Layout>


    );
};
