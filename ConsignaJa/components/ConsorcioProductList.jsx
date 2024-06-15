import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Icon, Layout, List, ListItem, Text } from '@ui-kitten/components';
import { ProductPicker } from './ProductPicker';

export const ConsorcioProductList = ({ productList }) => {

    const [selectedItem, setSelectedItem] = useState({
        item: null,
        selected: false,
        index: null
    });

    const [data, setData] = useState(productList);

    const handleRowPress = (item, index) => {
        setSelectedItem({
            item: item,
            selected: true,
            index: index
        });
    };

    const dismissModal = () => {
        setSelectedItem({
            item: null,
            selected: false,
            index: null
        });
    };

    const updateProductList = (updatedProduct) => {
        const updatedData = data.map((item, index) => 
            index === selectedItem.index ? updatedProduct : item
        );
        setData(updatedData);
    };

    const renderItemIcon = (props) => (
        <Icon
            {...props}
            name='cube-outline'
        />
    );

    const renderItem = ({ item, index }) => (
        <ListItem
            onLongPress={() => alert("deletar")}
            onPress={() => handleRowPress(item, index)}
            title={`${item.produto_nome}`}
            description={`Valor: ${item.valor}  ||  Quantidade: ${item.quantidade}  ||  Total Parcial: ${item.quantidade * item.valor}`}
            accessoryLeft={renderItemIcon}
        />
    );

    return (
        <Layout style={{ width: 300 }}>
            <Layout style={styles.header}>
                <Text style={styles.cell} category='h6'>Lista de Produtos</Text>
            </Layout>
            <Divider />
            <List
                data={data}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
                style={{ maxHeight: 75 }}
            />
            {selectedItem.selected && 
                <ProductPicker 
                    product={selectedItem.item} 
                    onDismiss={dismissModal} 
                    onChange={updateProductList} 
                />
            }
        </Layout>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingVertical: 15,
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 15,
        justifyContent: 'space-between',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
    },
});
