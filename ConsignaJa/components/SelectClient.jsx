import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Icon, Input, Layout, List, ListItem, Modal, Text } from '@ui-kitten/components';
import data from "../data/client.json"
import { useData } from '../context/data-context';

export const SelectClient = ({ client, onDismiss, onChange }) => {

    const {clients} = useData();
    
    const [visible, setVisible] = useState(true);

    const [selectedItem, setSelectedItem] = useState({
        item: null,
        selected: false
    });

    const selectItem = (item) => {
        setSelectedItem({
            item: item,
            selected: true
        })
    }

    const dismissModal = () => {
        setSelectedItem({
            item: null,
            selected: false
        })
        setVisible(false);
        onDismiss();
    }
    
    const [searchQuery, setSearchQuery] = useState('');
    

    const filteredData = clients.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderSearchIcon = (props) => {
        return <Icon {...props} name={'search-outline'} />;
    };

    const renderItemIcon = (props) => (
        <Icon
            {...props}
            name='person'
        />
    );

    useEffect(() => {
        if(selectedItem.selected){
            onChange(selectedItem.item);
            onDismiss();
        }
    },[selectedItem])
    
    

    const renderItem = ({ item }) => (
        <ListItem
            onPress={() => selectItem(item)}
            title={`${item.name}`}
            description={`${item.cnpj}`}
            accessoryLeft={renderItemIcon}
        />
    );

    return (
        <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={dismissModal}
            style={{ width: 300 }}
        >
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
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
