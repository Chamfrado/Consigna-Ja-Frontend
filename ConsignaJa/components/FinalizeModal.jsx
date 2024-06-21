import React, { useState, useEffect } from "react";
import { Button, Input, Modal, Card, Layout, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

export const FinalizeModal = ({ visible, onCancel, onSave, productList }) => {
  const [updatedProducts, setUpdatedProducts] = useState([]);

  useEffect(() => {
    // Initialize updatedProducts with the initial productList values
    setUpdatedProducts(productList.map(product => ({ ...product, quantidade_vendida: product.quantidade_vendida || 0 })));
  }, [productList]);

  const handleQuantityChange = (index, quantity) => {
    const newProducts = [...updatedProducts];
    newProducts[index].quantidade_vendida = quantity ? parseInt(quantity, 10) : 0;
    setUpdatedProducts(newProducts);
  };

  const handleSave = () => {
    onSave(updatedProducts);
  };

  return (
    <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={onCancel}>
      <Card disabled={true}>
        <Layout>
          <Text category="h5">Finalizar Consignado</Text>
          {updatedProducts.map((product, index) => (
            <Layout key={product.id} style={{ padding: 10 }}>
              <Text category="s1">{product.produto_nome}</Text>
              <Input
                value={String(product.quantidade_vendida)}
                onChangeText={(value) => handleQuantityChange(index, value)}
                keyboardType="numeric"
                placeholder="Quantidade Vendida"
              />
            </Layout>
          ))}
        </Layout>
        <Layout style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 15 }}>
          <Button onPress={handleSave}>Salvar</Button>
          <Button onPress={onCancel} status="danger">Cancelar</Button>
        </Layout>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
