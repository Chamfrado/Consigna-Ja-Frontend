import { Button, Card, Icon, IndexPath, Input, Layout, Modal, Select, SelectItem, Text, Toggle } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { CancelAlert } from './CancelAlert';
import { ConsorcioProductList } from './ConsorcioProductList';

export const ConsignadoDetail = ({ selected, onDismiss, item }) => {
  const [visible, setVisible] = useState(false);



  const [editMode, setEditmode] = useState(false);

  const turnEditMode = () => {
    setEditmode(!editMode)
  }

  const [cancelModal, setCancelModal] = useState(false);

  useEffect(() => {
    setVisible(selected)
  }, [selected])

  const dismiss = () => {
    {editMode? setCancelModal(true) : onDismiss() }
  }

  const changeState = () => {
    setCancelModal(false);
  }


  const renderItemIcon = (props) => (
    <Icon
      {...props}
      name='trash-2-outline'
    />
  );




  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={dismiss}
      animationType='fade'
    >
      <Card disabled={true}>
        <Layout style={{ alignItems: 'center' }}>
          <Text category='h5'>
            Consignado Nº {item.id}
          </Text>
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category='s1'>
            Cliente
          </Text>
          <Input
            size='small'
            placeholder={item.client_id}
            disabled
          />
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category='s1'>
            Data Inicial
          </Text>
          <Input
            size='small'
            placeholder={item.date}
            disabled
          />
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category='s1'>
            Data Final
          </Text>
          <Input
            size='small'
            placeholder={item.date_fin}
            disabled
          />
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category='s1'>
            Status
          </Text>
          <Input
            size='small'
            placeholder={item.status}
            disabled
          />
        </Layout>
        <Layout style={{ padding: 15 }}>
          <ConsorcioProductList productList={item.productList}/>
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category='s1'>
            Valor Total
          </Text>
          <Input
            size='small'
            placeholder={`R$ ${item.value}.00`}
            disabled
          />
        </Layout>

        <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 15 }}>
          <Button onPress={() => alert("PDF GERADO!")}  >Gerar PDF</Button>
          {item.status === "Finalizado"? null : <Button onPress={() => alert("Processo Finalizado!")} status='success'>Finalizar</Button> }
          <Button size='tiny' status='danger' appearance='outline' accessoryLeft={renderItemIcon} onPress={() => alert("Deletado!")}>Deletar</Button>
        </Layout>
        
        <Button onPress={dismiss}>
          Voltar
        </Button>

      </Card>

      {cancelModal?
      <CancelAlert state={cancelModal} dismiss={onDismiss} changeState={changeState}/>: <></>}
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});