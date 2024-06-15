import { Button, Card, Icon, IndexPath, Input, Layout, Modal, Select, SelectItem, Text, Toggle } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { CancelAlert } from './CancelAlert';

export const ClientDetail = ({ selected, onDismiss, item }) => {
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
    style={{width: "80%"}}
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={dismiss}
      animationType='fade'
    >
      <Card disabled={true}>
        <Layout style={{ alignItems: 'center' }}>
          <Text category='h5'>
            Detalhes do Cliente
          </Text>
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category='s1'>
            CNPJ
          </Text>
          <Input
            size='small'
            placeholder={item.cnpj}
            disabled={!editMode}
          />
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category='s1'>
            Nome
          </Text>
          <Input
            size='small'
            placeholder={item.name}
            disabled={!editMode}
          />
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category='s1'>
            Telefone
          </Text>
          <Input
            size='small'
            placeholder={item.phone}
            disabled={!editMode}
          />
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category='s1'>
            Endereço
          </Text>
          <Input
            size='small'
            placeholder={item.logradouro}
            disabled={!editMode}
          />
        </Layout>
        <Layout style={{ padding: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Layout>
            <Text category='s1'>
              CEP
            </Text>
            <Input
              size='small'
              placeholder={item.cep}
              disabled={!editMode}
            />
          </Layout>
          <Layout>
            <Text category='s1'>
              UF
            </Text>
            <Input
              size='small'
              placeholder={item.uf}
              disabled={!editMode}
            />
          </Layout>
        </Layout>

        <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 15 }}>
          <Toggle
            status='primary'
            checked={editMode === true}
            onChange={turnEditMode}
          >
            Editar?
          </Toggle>
          <Button size='tiny' status='danger' appearance='outline' accessoryLeft={renderItemIcon} onPress={() => alert(editMode)}>Deletar</Button>
        </Layout>
        {editMode ? <Layout style={{ paddingBottom: 20 }}>
          <Button size='small' status='success' appearance='outline' accessoryLeft={renderItemIcon}>Salvar</Button>
        </Layout> : null}


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