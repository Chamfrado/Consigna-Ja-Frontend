import {
  Button,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
} from "@ui-kitten/components";
import { useState } from "react";
import { ProductDetail } from "./ProductDetail";
import { AddProduct } from "./AddProduct";
import { AlertComponent } from "./OperationAlert";
import { useData } from "../context/data-context";

export const ProductList = () => {
  const [selectedItem, setSelectedItem] = useState({
    item: null,
    selected: false,
  });


  const {products} = useData()

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

  const filteredData = products.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSearchIcon = (props) => {
    return <Icon {...props} name={"search-outline"} />;
  };

  const renderItemIcon = (props) => <Icon {...props} name="cube-outline" />;

  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => selectItem(item)}
      title={`${item.name}`}
      description={`Código: ${item.codigo}`}
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
        <Button onPress={() => setOnAdd(true)}>Adicionar Produto</Button>
      </Layout>
      {selectedItem.selected ? (
        <ProductDetail
          item={selectedItem.item}
          selected={selectedItem.selected}
          onDismiss={dismissModal}
          showAlert={showAlert}
        />
      ) : (
        <></>
      )}
      {onAdd ? <AddProduct onDismiss={dismissAddModal} add={onAdd} showAlert={showAlert} /> : <></>}

      <AlertComponent
        visible={alertProps.visible}
        message={alertProps.message}
        status={alertProps.status}
        onDismiss={hideAlert}
      />
    </Layout>
  );
};
