import { Button, Card, Datepicker, Icon, Input, Layout, Modal, Text } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { CancelAlert } from './CancelAlert';
import { getCNPJData } from '../services/SearchCnpj';
import { ConsorcioProductList } from './ConsorcioProductList';
import { SelectClient } from './SelectClient';
import { ProductPicker } from './ProductPicker';

export const AddConsorcio = ({ onDismiss, add }) => {
    const [visible, setVisible] = useState(false);

    const [item, setItem] = useState({
        "id": 0,
        "client_id": "",
        "date": new Date(),
        "date_fin": new Date(),
        "status": "",
        "value": 0,
        "productList": []
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

    const changeDate = (type, date) => {
        {
            type === "inicio" ?
                setItem(prevItem => ({ ...prevItem, "date": date }))
                :
                setItem(prevItem => ({ ...prevItem, "date_fin": date }))
        }
    }

    const onSelectClient = (client) => {
        setItem(prevItem => ({ ...prevItem, "client_id": client.name }))
    }


    const [selectClient, setSelectClient] = useState(false);
    const openSelectClient = () => {
        setSelectClient(true);
    }
    const dismissSelectClient = () => {
        setSelectClient(false);
    }


    const [selectProduct, setSelectProduct] = useState(false);
    const openSelectProduct = () => {
        setSelectProduct(true);
    }

    const dismissSelectProduct = () => {
        setSelectProduct(false);
    }

    const onSelectProduct = (product) => {
        let prevProductList = item.productList
        prevProductList.push(product)
        setItem(prevItem => ({ ...prevItem, "productList": prevProductList }))
        setTotal(calculateTotalValue());
    }

    const [total, setTotal] = useState(0)

    useEffect(() => {
        setTotal(calculateTotalValue());
    }, []);

    const calculateTotalValue = () => {
        return item.productList.reduce((total, product) => {
            const value = parseFloat(product.valor) || 0;
            const quantidade = parseFloat(product.quantidade) || 0;
            return total + value * quantidade;
        }, 0).toFixed(2);
    };

    return (
        <Modal
            style={{ width: "80%" }}
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={dismiss}
            animationType='fade'
        >
            <Card disabled={true}>
                <Layout style={{ alignItems: 'center' }}>
                    <Text category='h5'>
                        Novo Consignado
                    </Text>
                </Layout>
                <Layout style={{ padding: 15 }}>
                    <Text category='s1'>
                        Cliente
                    </Text>
                    <Input
                        size='small'
                        placeholder="Clique para selecionar o cliente"
                        value={item.client_id}
                        onPressIn={openSelectClient}
                    />
                </Layout>
                <Layout style={{ padding: 15, alignItems: 'center' }}>
                    <Button onPress={openSelectProduct}>Adicionar Produto</Button>
                    <ConsorcioProductList productList={item.productList} />
                </Layout>
                <Layout style={{ padding: 15, alignItems: 'center' }}>
                    <Text category='h6'>
                        Valor Total
                    </Text>
                    <Text category='h6'>
                        R$ {total}
                    </Text>
                </Layout>
                <Layout style={{ padding: 15 }}>
                    <Text category='s1'>
                        Data Início
                    </Text>
                    <Datepicker
                        date={item.date}
                        onSelect={nextDate => changeDate("inicio", nextDate)}
                    />
                </Layout>
                <Layout style={{ padding: 15 }}>
                    <Text category='s1'>
                        Previsão Término
                    </Text>
                    <Datepicker
                        date={item.date_fin}
                        onSelect={nextDate => changeDate("termino", nextDate)}
                    />
                </Layout>
                <Layout style={{ paddingBottom: 20 }}>
                    <Button size='small' status='success' appearance='outline' accessoryLeft={renderItemIcon} onClick={() => alert("Consignado Salvo")}>
                        Salvar
                    </Button>
                </Layout>

                <Button onPress={dismiss}>
                    Voltar
                </Button>
            </Card>

            {selectClient? <SelectClient onChange={onSelectClient} onDismiss={dismissSelectClient} />: null}
            {selectProduct? <ProductPicker onChange={onSelectProduct} onDismiss={dismissSelectProduct}/> : null}

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
