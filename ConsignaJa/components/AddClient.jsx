import { Button, Card, Icon, Input, Layout, Modal, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { CancelAlert } from './CancelAlert';
import { getCNPJData } from '../services/SearchCnpj';

export const AddClient = ({ onDismiss, add }) => {
    const [visible, setVisible] = useState(false);

    const [item, setItem] = useState({
        name: "",
        cnpj: "",
        phone: "",
        logradouro: "",
        cep: "",
        uf: "",
        latitude: -23.561,
        longitude: -46.655
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

    // Helper function to clean CNPJ input
    const cleanCNPJ = (cnpj) => {
        return cnpj.replace(/\D/g, '');
    };

    // Change handlers
    const handleChange = (field, value) => {
        setItem(prevItem => ({ ...prevItem, [field]: value }));

        if (field === 'cnpj' && cleanCNPJ(value).length === 14) {
            getCNPJData(cleanCNPJ(value))
                .then(({ data }) => {
                    // Handle the data returned from the API
                    alert(JSON.stringify(data));
                    // Optionally, update the item state with the returned data
                    setItem(prevItem => ({
                        ...prevItem,
                        name: data['NOME FANTASIA'] || data['RAZAO SOCIAL'],
                        logradouro: `${data['TIPO LOGRADOURO']} ${data['LOGRADOURO']} , ${data['MUNICIPIO']}`,
                        cep: data['CEP'],
                        uf: data['UF'],
                        phone: `${data['DDD']} ${data['TELEFONE']}`
                    }));
                })
                .catch(() => alert("Error fetching CNPJ data"));
        }
    };

    return (
        <Modal
            style={{width: "80%"}}
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={dismiss}
            animationType='fade'
        >
            <Card disabled={true}>
                <Layout style={{ alignItems: 'center' }}>
                    <Text category='h5'>
                        Adicionar Cliente
                    </Text>
                </Layout>
                <Layout style={{ padding: 15 }}>
                    <Text category='s1'>
                        CNPJ
                    </Text>
                    <Input
                        size='small'
                        placeholder="00.000.000/0001-91"
                        value={item.cnpj}
                        onChangeText={(value) => handleChange('cnpj', value)}
                    />
                </Layout>
                <Layout style={{ padding: 15 }}>
                    <Text category='s1'>
                        Nome
                    </Text>
                    <Input
                        size='small'
                        placeholder="Nome do cliente"
                        value={item.name}
                        onChangeText={(value) => handleChange('name', value)}
                    />
                </Layout>
                <Layout style={{ padding: 15 }}>
                    <Text category='s1'>
                        Telefone
                    </Text>
                    <Input
                        size='small'
                        placeholder="00 0 0000-0000"
                        value={item.phone}
                        onChangeText={(value) => handleChange('phone', value)}
                    />
                </Layout>
                <Layout style={{ padding: 15 }}>
                    <Text category='s1'>
                        Endereço
                    </Text>
                    <Input
                        size='small'
                        placeholder="Logradouro"
                        value={item.logradouro}
                        onChangeText={(value) => handleChange('logradouro', value)}
                    />
                </Layout>
                <Layout style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Layout>
                        <Text category='s1'>
                            CEP
                        </Text>
                        <Input
                            size='small'
                            placeholder="00000-000"
                            value={item.cep}
                            onChangeText={(value) => handleChange('cep', value)}
                        />
                    </Layout>
                    <Layout>
                        <Text category='s1'>
                            UF
                        </Text>
                        <Input
                            size='small'
                            placeholder="UF"
                            value={item.uf}
                            onChangeText={(value) => handleChange('uf', value)}
                        />
                    </Layout>
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
