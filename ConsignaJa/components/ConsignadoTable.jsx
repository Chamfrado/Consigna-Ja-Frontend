import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Divider, Layout, List, Text } from '@ui-kitten/components';
import data from "../data/consignado.json";
import { ConsignadoDetail } from './ConsignadoDetail';
import { AddConsorcio } from './AddConsorcio';



export const ConsignadoTable = () => {


    const [selectedItem, setSelectedItem] = useState({
        item: null,
        selected: false
    });


    const handleRowPress = (item) => {

        setSelectedItem({
            item: item,
            selected: true
        })
    };

    const dismissModal = () => {
        setSelectedItem({
            item: null,
            selected: false
        })
    }

    const renderItem = ({ item, index }) => (
        <Card onPress={() => handleRowPress(item)}>
            <Layout level={index % 2 === 0 ? '3' : '2'} style={styles.row}>
                <Text style={styles.cell}>{item.client_id}</Text>
                <Text style={styles.cell}>{item.date}</Text>
                <Text style={styles.cell} status={item.status === "Finalizado"? `success`: `danger`}>{item.status}</Text>
            </Layout>
        </Card>
    );

    const[onAdd, setOnAdd] = useState(false);
    
    const dismissAddModal = () => {
        setOnAdd(false);
    }


    
    return (
        <Layout >
            <Layout style={styles.header}>
                <Text style={styles.cell} category='h6'>Cliente</Text>
                <Text style={styles.cell} category='h6'>Data</Text>
                <Text style={styles.cell} category='h6'>Status</Text>
                
            </Layout>
            <Divider />
            <List
                style={{ maxHeight: 475 }}
                data={data}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />
            <Layout style={{ paddingTop: 3 }}>
                <Button onPress={() => setOnAdd(true)}>Nova Operação</Button>
            </Layout>
            {onAdd? <AddConsorcio onDismiss={dismissAddModal} add={onAdd}/>: <></>}
            {selectedItem.selected? <ConsignadoDetail item={selectedItem.item} selected={selectedItem.selected} onDismiss={dismissModal} /> : <></>}
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