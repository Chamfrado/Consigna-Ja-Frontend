import { Button, Card, Layout, Modal, Text } from '@ui-kitten/components'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native';

export const CancelAlert = ({dismiss, state, changeState}) => {

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(state)
  },[state])


  const onDismiss = () => {
    dismiss();
  }
  const onCancel = () => {
    changeState();
  }

  return (
    <View style={styles.container}>
      <Modal
      animationType='slide'
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={onCancel}
      >
        <Card disabled={true} style={styles.Card} >
          <Text category='h6'>
            Deseja Cancelar a Operação?
          </Text>
          <Text style={{ alignSelf: 'center', paddingBottom: 15, paddingTop: 15 }}>
            Tudo o que foi feito será perdido!
          </Text>
          <Layout style={{justifyContent: "space-between", flexDirection:'row'}}>
            <Button onPress={onDismiss} status='danger'>
              Sair 
            </Button>
            <Button onPress={onCancel}>
              Cancelar
            </Button>
          </Layout>

        </Card>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
});