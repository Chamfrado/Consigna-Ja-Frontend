import {
  Button,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
} from "@ui-kitten/components";
import { useState } from "react";
import { ClientDetail } from "./ClientDetail";
import { AddClient } from "./AddClient";

import { useData } from "../context/data-context";
import { AlertComponent } from "./OperationAlert";

export const ClientList = (props) => {
  const { clients } = useData();
  const [selectedItem, setSelectedItem] = useState({
    item: null,
    selected: false,
  });

  const selectItem = (item) => {
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

  const [onAdd, setOnAdd] = useState(false);

  const dismissAddModal = () => {
    setOnAdd(false);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = clients.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSearchIcon = (props) => {
    return <Icon {...props} name={"search-outline"} />;
  };

  const renderItemIcon = (props) => <Icon {...props} name="person" />;

  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => selectItem(item)}
      title={`${item.name}`}
      description={`${item.cnpj}`}
      accessoryLeft={renderItemIcon}
    />
  );

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
    showAlert(message, status)
  }

  return (
    <Layout>
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
      <Layout style={{ paddingTop: 15 }}>
        <Button onPress={() => setOnAdd(true)}>Adicionar Cliente</Button>
      </Layout>
      {selectedItem.selected ? (
        <ClientDetail
          showAlert={onSuccess}
          item={selectedItem.item}
          selected={selectedItem.selected}
          onDismiss={dismissModal}
        />
      ) : (
        <></>
      )}
      {onAdd ? <AddClient onDismiss={dismissAddModal} add={onAdd} showAlert={onSuccess} /> : <></>}

      <AlertComponent
        visible={alertProps.visible}
        message={alertProps.message}
        status={alertProps.status}
        onDismiss={hideAlert}
      />
    </Layout>
  );
};
