import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Icon, Input, Layout, List, ListItem, Modal, Text } from '@ui-kitten/components';
import { useData } from '../context/data-context';

export const ProductPicker = ({ product, onDismiss, onChange }) => {

    const {products} = useData()

    const [visible, setVisible] = useState(true);

    const [selectedItem, setSelectedItem] = useState({
        "id": 0,
        "produto_id": 0,
        "produto_nome": "",
        "valor": "",
        "quantidade": "",
        "selected": false
    });

    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = products.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        if (product) {
            setSelectedItem({
                "id": product.id,
                "produto_id": product.produto_id,
                "produto_nome": product.produto_nome,
                "valor": product.valor,
                "quantidade": product.quantidade,
                "selected": true
            });
        }
    }, [product]);

    const handleChange = (field, value) => {
        setSelectedItem(prevItem => ({ ...prevItem, [field]: value }));
    };

    const onAdd = () => {
        onChange(selectedItem);
        dismissModal();
    };

    const dismissModal = () => {
        setVisible(false);
        onDismiss();
    };

    const renderSearchIcon = (props) => (
        <Icon {...props} name='search-outline' />
    );

    const renderItemIcon = (props) => (
        <Icon {...props} name='cube-outline' />
    );

    const renderItem = ({ item }) => (
        <ListItem
            onPress={() => selectItem(item)}
            title={`${item.name}`}
            description={`Código: ${item.codigo}`}
            accessoryLeft={renderItemIcon}
        />
    );

    const selectItem = (item) => {
        setSelectedItem({
            "id": item.id,
            "produto_id": item.id,
            "produto_nome": item.name,
            "valor": item.valor,
            "quantidade": item.quantidade,
            "selected": true
        });
    };

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={dismissModal}
            style={{ width: 300, height: 400 }}
        >
            {selectedItem.selected ? (
                <Card disabled>
                    <Layout style={{ alignItems: 'center' }}>
                        <Text category='h5'>Adicionar Produto</Text>
                    </Layout>
                    <Layout style={{ padding: 15 }}>
                        <Text category='s1'>Produto</Text>
                        <Input
                            size='small'
                            placeholder={selectedItem.produto_nome}
                            value={selectedItem.produto_nome}
                            disabled
                        />
                    </Layout>
                    <Layout style={{ padding: 15 }}>
                        <Text category='s1'>Quantidade</Text>
                        <Input
                            size='small'
                            value={selectedItem.quantidade}
                            onChangeText={(value) => handleChange('quantidade', value)}
                        />
                    </Layout>
                    <Layout style={{ padding: 15 }}>
                        <Text category='s1'>Valor</Text>
                        <Input
                            size='small'
                            value={selectedItem.valor}
                            onChangeText={(value) => handleChange('valor', value)}
                        />
                    </Layout>
                    <Layout style={{ paddingTop: 15 }}>
                        <Button onPress={onAdd}>Adicionar Produto</Button>
                    </Layout>
                </Card>

            ) : (
                <Card>
                    <Layout>
                        <Input
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            placeholder="Search"
                            accessoryRight={renderSearchIcon}
                        />
                    </Layout>
                    <Layout>
                        <List
                            style={{ maxHeight: 475 }}
                            data={filteredData}
                            renderItem={renderItem}
                        />
                    </Layout>
                </Card>

            )}
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
