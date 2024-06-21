import {
  Button,
  Card,
  Icon,
  Input,
  Layout,
  Modal,
  Text,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { CancelAlert } from "./CancelAlert";
import { ConsorcioProductList } from "./ConsorcioProductList";
import { ConsignadoProductFinalized } from "./ConsignadoProductFinalized";
import {generateAndDownloadPDF} from "../services/GenerateAndDownloadPDF";
import { useData } from "../context/data-context";

export const ConsignadoDetail = ({
  selected = false,
  onDismiss = () => {},
  item = {},
}) => {

  const { clients } = useData();
  const [visible, setVisible] = useState(false);

  const [editMode, setEditmode] = useState(false);

  const [cancelModal, setCancelModal] = useState(false);

  const [client, setClient] = useState({});

  useEffect(() => {
    setVisible(selected);
    setClient(clients.find(client => client.name === item.client_id))
  }, [selected]);

  const dismiss = () => {
    onDismiss();
  };

  const changeState = () => {
    setCancelModal(false);
  };

  const renderItemIcon = (props) => <Icon {...props} name="trash-2-outline" />;

  const handleDownloadPDF = () => {
    generateAndDownloadPDF(item, client);
  };

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={dismiss}
      animationType="fade"
    >
      <Card disabled={true}>
        <Layout style={{ alignItems: "center" }}>
          <Text category="h5">Consignado Nº {item.id}</Text>
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category="s1">Cliente</Text>
          <Input size="small" placeholder={item.client_id} disabled />
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category="s1">Data Inicial</Text>
          <Input size="small" placeholder={item.date} disabled />
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category="s1">Data Final</Text>
          <Input size="small" placeholder={item.date_fin} disabled />
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category="s1">Status</Text>
          <Input size="small" placeholder={item.status} disabled />
        </Layout>
        <Layout style={{ padding: 15 }}>
          {item.status === "Finalizado"? <ConsignadoProductFinalized productList={item.productList}/> : <ConsorcioProductList productList={item.productList} />}
          
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category="s1">Valor Total</Text>
          <Input size="small" placeholder={`R$ ${item.value}.00`} disabled />
        </Layout>

        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 15,
            paddingBottom: 15,
          }}
        >
          <Button onPress={handleDownloadPDF}>Gerar PDF</Button>
          {item.status === "Finalizado" ? (
            <></>
          ) : (
            <Button
              onPress={() => alert("Processo Finalizado!")}
              status="success"
            >
              Finalizar
            </Button>
          )}
          <Button
            size="tiny"
            status="danger"
            appearance="outline"
            accessoryLeft={renderItemIcon}
            onPress={() => alert("Deletado!")}
          >
            Deletar
          </Button>
        </Layout>

        <Button onPress={dismiss}>Voltar</Button>
      </Card>

      {cancelModal ? (
        <CancelAlert
          state={cancelModal}
          dismiss={onDismiss}
          changeState={changeState}
        />
      ) : (
        <></>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
