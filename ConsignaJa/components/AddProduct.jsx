import { Button, Card, Icon, Input, Layout, Modal, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { CancelAlert } from './CancelAlert';
import { getCNPJData } from '../services/SearchCnpj';

export const AddProduct = ({ onDismiss, add }) => {
    const [visible, setVisible] = useState(false);

    const [item, setItem] = useState({
        name: "",
        codigo: ""
    });

    const [cancelModal, setCancelModal] = useState(false);

    useEffect(() => {
        setVisible(add);
    }, [add]);

    const dismiss = () => {
        setCancelModal(true);
    };

    const changeState = () => {
        setCancelModal(false);
    };

    const renderItemIcon = (props) => (
        <Icon
            {...props}
            name='trash-2-outline'
        />
    );

    

    // Change handlers
    const handleChange = (field, value) => {
        setItem(prevItem => ({ ...prevItem, [field]: value }));

    };

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={dismiss}
            animationType='fade'
            style={{width: "80%"}}
        >
            <Card disabled={true}>
                <Layout style={{ alignItems: 'center' }}>
                    <Text category='h5'>
                        Adicionar Produto
                    </Text>
                </Layout>
                <Layout style={{ padding: 15 }}>
                    <Text category='s1'>
                        Nome
                    </Text>
                    <Input
                        size='small'
                        placeholder="00.000.000/0001-91"
                        value={item.cnpj}
                        onChangeText={(value) => handleChange('name', value)}
                    />
                </Layout>
                <Layout style={{ padding: 15 }}>
                    <Text category='s1'>
                        Codigo
                    </Text>
                    <Input
                        size='small'
                        placeholder="Codigo do Produto"
                        value={item.name}
                        onChangeText={(value) => handleChange('codigo', value)}
                    />
                </Layout>
                <Layout style={{ paddingBottom: 20 }}>
                    <Button size='small' status='success' appearance='outline' accessoryLeft={renderItemIcon}>
                        Salvar
                    </Button>
                </Layout>

                <Button onPress={dismiss}>
                    Voltar
                </Button>
            </Card>

            {cancelModal ?
                <CancelAlert state={cancelModal} dismiss={onDismiss} changeState={changeState} /> : <></>}
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
