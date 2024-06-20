import {
  Button,
  Card,
  Icon,
  Input,
  Layout,
  Modal,
  Text,
  Toggle,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { CancelAlert } from "./CancelAlert";
import { useData } from "../context/data-context";

export const ClientDetail = ({ selected, onDismiss, item, showAlert }) => {
  const { deleteClient, updateClient } = useData();
  const [newData, setNewData] = useState(item);
  const [visible, setVisible] = useState(false);
  const [editMode, setEditmode] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  useEffect(() => {
    setVisible(selected);
  }, [selected]);

  const dismiss = () => {
    editMode ? setCancelModal(true) : onDismiss();
  };

  const changeState = () => {
    setCancelModal(false);
  };

  const turnEditMode = () => {
    setEditmode(!editMode);
  };

  const renderItemIcon = (props) => <Icon {...props} name="trash-2-outline" />;

  const onDelete = () => {
    Alert.alert(
      "Atenção!",
      "Deseja mesmo excluir este produto? Essa operação é irreversível.",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: () => {
            deleteClient(item.id);
            showAlert("Cliente Deletado com Sucesso!", "success");
            onDismiss();
          },
        },
      ]
    );
  };

  const handleChange = (name, value) => {
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSave = () => {
    turnEditMode();
    updateClient(item.id, newData);
    showAlert("Cliente Atualizado com Sucesso!", "success");
    onDismiss();
  };

  return (
    <Modal
      style={{ width: "80%" }}
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={dismiss}
      animationType="fade"
    >
      <Card disabled={true}>
        <Layout style={{ alignItems: "center" }}>
          <Text category="h5">Detalhes do Cliente</Text>
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category="s1">CNPJ</Text>
          <Input
            size="small"
            value={newData.cnpj}
            disabled={!editMode}
            onChangeText={(value) => handleChange("cnpj", value)}
          />
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category="s1">Nome</Text>
          <Input
            size="small"
            value={newData.name}
            disabled={!editMode}
            onChangeText={(value) => handleChange("name", value)}
          />
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category="s1">Telefone</Text>
          <Input
            size="small"
            value={newData.phone}
            disabled={!editMode}
            onChangeText={(value) => handleChange("phone", value)}
          />
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category="s1">Endereço</Text>
          <Input
            size="small"
            value={newData.logradouro}
            disabled={!editMode}
            onChangeText={(value) => handleChange("logradouro", value)}
          />
        </Layout>
        <Layout
          style={{
            padding: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Layout>
            <Text category="s1">CEP</Text>
            <Input
              size="small"
              value={newData.cep}
              disabled={!editMode}
              onChangeText={(value) => handleChange("cep", value)}
            />
          </Layout>
          <Layout>
            <Text category="s1">UF</Text>
            <Input
              size="small"
              value={newData.uf}
              disabled={!editMode}
              onChangeText={(value) => handleChange("uf", value)}
            />
          </Layout>
        </Layout>
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 15,
            paddingBottom: 15,
          }}
        >
          <Toggle
            status="primary"
            checked={editMode === true}
            onChange={turnEditMode}
          >
            Editar?
          </Toggle>
          <Button
            size="tiny"
            status="danger"
            appearance="outline"
            accessoryLeft={renderItemIcon}
            onPress={onDelete}
          >
            Deletar
          </Button>
        </Layout>
        {editMode ? (
          <Layout style={{ paddingBottom: 20 }}>
            <Button
              size="small"
              status="success"
              appearance="outline"
              onPress={onSave}
            >
              Salvar
            </Button>
          </Layout>
        ) : null}

        <Button onPress={dismiss}>Voltar</Button>
      </Card>
      {cancelModal ? (
        <CancelAlert
          state={cancelModal}
          dismiss={onDismiss}
          changeState={changeState}
        />
      ) : null}
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
