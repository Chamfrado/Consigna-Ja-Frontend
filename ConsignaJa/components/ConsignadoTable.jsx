import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Card,
  Divider,
  Layout,
  List,
  Text,
} from "@ui-kitten/components";
import { ConsignadoDetail } from "./ConsignadoDetail";
import { AddConsorcio } from "./AddConsorcio";
import { useData } from "../context/data-context";
import { AlertComponent } from "../components/OperationAlert";

export const ConsignadoTable = () => {
  const { consignados } = useData();
  const [selectedItem, setSelectedItem] = useState({
    item: null,
    selected: false,
  });

  const handleRowPress = (item) => {
    setSelectedItem({
      item: item,
      selected: true,
    });
  };

  const dismissModal = () => {
    setSelectedItem({
      item: null,
      selected: false,
    });
  };

  const renderItem = ({ item, index }) => (
    <Card onPress={() => handleRowPress(item)}>
      <Layout level={index % 2 === 0 ? "3" : "2"} style={styles.row}>
        <Text style={styles.cell}>{item.client_id}</Text>
        <Text style={styles.cell}>{item.date}</Text>
        <Text
          style={styles.cell}
          status={item.status === "Finalizado" ? `success` : `danger`}
        >
          {item.status}
        </Text>
      </Layout>
    </Card>
  );

  const [onAdd, setOnAdd] = useState(false);

  const dismissAddModal = () => {
    setOnAdd(false);
  };

  const [alertProps, setAlertProps] = useState({
    visible: false,
    message: "",
    status: "",
  });

  const showAlert = (message, operation) => {
    setAlertProps({
      visible: true,
      message: message,
      status: operation,
    });
  };

  const hideAlert = () => {
    setAlertProps({
      visible: false,
      message: "",
      status: "",
    });
  };

  const onSuccess = (message, status) => {
    showAlert(message, status);
  };

  // Sort consignados by date
  const sortedConsignados = [...consignados].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <Layout>
      <Layout style={styles.header}>
        <Text style={styles.cell} category="h6">
          Cliente
        </Text>
        <Text style={styles.cell} category="h6">
          Data
        </Text>
        <Text style={styles.cell} category="h6">
          Status
        </Text>
      </Layout>
      <Divider />
      <List
        style={{ maxHeight: 475 }}
        data={sortedConsignados}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
      <Layout style={{ paddingTop: 3 }}>
        <Button onPress={() => setOnAdd(true)}>Nova Operação</Button>
      </Layout>
      {onAdd ? (
        <AddConsorcio onDismiss={dismissAddModal} add={onAdd} showAlert={onSuccess} />
      ) : (
        <></>
      )}
      {selectedItem.selected ? (
        <ConsignadoDetail
          item={selectedItem.item}
          selected={selectedItem.selected}
          onDismiss={dismissModal}
        />
      ) : (
        <></>
      )}
      <AlertComponent
        visible={alertProps.visible}
        message={alertProps.message}
        status={alertProps.status}
        onDismiss={hideAlert}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});
