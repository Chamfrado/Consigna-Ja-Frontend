import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Card,
  Divider,
  Icon,
  Layout,
  List,
  ListItem,
  Modal,
  Text,
} from "@ui-kitten/components";

export const ConsignadoProductFinalized = ({ productList = [] }) => {
  const [selectedItem, setSelectedItem] = useState({
    item: null,
    selected: false,
    index: null,
  });

  const [detailModal, setDetailModal] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(productList);
  }, [productList]);

  const handleRowPress = (item, index) => {
    setSelectedItem({
      item: item,
      selected: true,
      index: index,
    });
    setDetailModal(true);
  };

  const dismissModal = () => {
    setSelectedItem({
      item: null,
      selected: false,
      index: null,
    });
  };

  const renderItemIcon = (props) => <Icon {...props} name="cube-outline" />;

  const renderItem = ({ item, index }) => (
    <ListItem
      onLongPress={() => handleRowPress(item, index)}
      title={`${item.produto_nome}`}
      description={`Valor: ${item.valor}  ||  Quantidade Vendida: ${item.quantidade_vendida}  ||  Total Final Item: ${item.quantidade_vendida * item.valor}`}
      accessoryLeft={renderItemIcon}
    />
  );

  return (
    <Layout style={{ width: 300 }}>
      <Layout style={styles.header}>
        <Text style={styles.cell} category="h6">
          Lista de Produtos
        </Text>
      </Layout>
      <Divider />
      <List
        data={data}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        style={{ maxHeight: 100 }}
      />
      <Modal
        visible={detailModal}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setDetailModal(false)}
      >
        <Card disabled={true}>
          {selectedItem.item && (
            <>
              <Text style={{paddingBottom: 15}} category="h6">{selectedItem.item.produto_nome}</Text>

              <Text style={{paddingBottom: 10}} category="s1">
                Quantidade Inicial: {selectedItem.item.quantidade}
              </Text>
              <Text style={{paddingBottom: 10}} category="s1">
                Quantidade Vendida: {selectedItem.item.quantidade_vendida}
              </Text>
              <Text style={{paddingBottom: 10}} category="s1">
                Preço Unitário: {selectedItem.item.valor}
              </Text>
              <Text style={{paddingBottom: 10}} category="s1">
                Valor Final do Item: {selectedItem.item.quantidade_vendida * selectedItem.item.valor}
              </Text>
              

              <Button onPress={() => setDetailModal(false)}>Voltar</Button>
            </>
          )}
        </Card>
      </Modal>
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
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
