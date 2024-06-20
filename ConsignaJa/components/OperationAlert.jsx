import React from "react";
import { Modal, Card, Text, Button, Icon, Layout } from "@ui-kitten/components";
import { StyleSheet } from "react-native";

const statusIcon = {
  success: (props) => <Icon {...props} name="checkmark-circle-2-outline" />,
  fail: (props) => <Icon {...props} name="alert-circle-outline" />,
};

export const AlertComponent = ({ visible, message, status, onDismiss }) => {
  const renderStatusIcon = statusIcon[status] || statusIcon.fail;

  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={onDismiss}
    >
      <Card disabled={true}>
        <Layout style={styles.iconContainer}>
          {renderStatusIcon(styles.icon)}
        </Layout>
        <Text style={styles.messageText} category="s1">
          {message}
        </Text>
        <Button style={styles.button} status={status === "fail" ? "danger" : "success"} onPress={onDismiss}>
          OK
        </Button>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 10,
  },
  messageText: {
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});
