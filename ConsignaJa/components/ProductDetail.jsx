import { Button, Card, Icon, IndexPath, Input, Layout, Modal, Select, SelectItem, Text, Toggle } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native';
import { CancelAlert } from './CancelAlert';
import { useData } from '../context/data-context';

export const ProductDetail = ({ selected, onDismiss, item, showAlert }) => {
  const { deleteProduct, updateProduct } = useData();
  const [newData, setNewData] = useState(item);
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
    { editMode ? setCancelModal(true) : onDismiss() }
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
            deleteProduct(item.id);
            showAlert("Produto Deletado com Sucesso!", "success")
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
    updateProduct(item.id, newData);
    showAlert("Cliente Atualizado com Sucesso!", "success")
    onDismiss();
  };



  return (
    <Modal
      style={{ width: "80%" }}
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={dismiss}
      animationType='fade'
    >
      <Card disabled={true}>
        <Layout style={{ alignItems: 'center' }}>
          <Text category='h5'>
            Detalhes do Produto
          </Text>
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category='s1'>
            Nome
          </Text>
          <Input
            size='small'
            onChangeText={(value) => handleChange("name", value)}
            value={newData.name}
            disabled={!editMode}
          />
        </Layout>
        <Layout style={{ padding: 15 }}>
          <Text category='s1'>
            Código
          </Text>
          <Input
            size='small'
            onChangeText={(value) => handleChange("codigo", value)}
            value={newData.codigo}
            disabled={!editMode}
          />
        </Layout>


        <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 15 }}>
          <Toggle
            status='primary'
            checked={editMode === true}
            onChange={turnEditMode}
          >
            Editar?
          </Toggle>
          <Button size='tiny' status='danger' appearance='outline' accessoryLeft={renderItemIcon} onPress={onDelete}>Deletar</Button>
        </Layout>
        {editMode ? <Layout style={{ paddingBottom: 20 }}>
          <Button size='small' status='success' appearance='outline' accessoryLeft={renderItemIcon} onPress={onSave}>Salvar</Button>
        </Layout> : null}


        <Button onPress={dismiss}>
          Voltar
        </Button>

      </Card>

      {cancelModal ?
        <CancelAlert state={cancelModal} dismiss={onDismiss} changeState={changeState} /> : <></>}
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});