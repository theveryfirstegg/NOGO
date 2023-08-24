import { Text, View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const SuccessScreen = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={modalVisible} animationType="slide">
        <View style={styles.containerOne}>
          <View style={styles.containerTwo}>
            <Text style={styles.modalText}>Success</Text>

            <Text style={styles.messageText}>
              Vehicle details submitted successfully{" "}
            </Text>

            <TouchableOpacity
              style={styles.okButton}
              onPress={() => {
                setModalVisible(false);
                nav.navigate("Main");
              }}
            >
              <Text style={styles.okText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.successTitle}>Vehicle Details</Text>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffd401",
  },

  successTitle: {
    fontSize: 35,
    fontWeight: "600",
    textAlignVertical: "top",
    marginTop: 60,
    marginBottom: 20,
  },

  modalContainer: {
    top: "50%",
    height: "50%",
  },

  modalText: {
    color: "black",
    fontSize: 18,
    marginBottom: 10,
  },

  containerOne: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  containerTwo: {
    width: 350,
    height: 250,
    borderWidth: 1,
    backgroundColor: "black",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
  },

  modalText: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
    margin: 20,
  },

  okButton: {
    width: 210,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffd401",
    borderRadius: 20,
    marginTop: 20,
  },

  okText: {
    fontSize: 16,
    fontWeight: "700",
  },

  messageText: {
    flexWrap: "wrap",
    color: "#666665",
    fontSize: 20,
    textAlign: "center",
  },
});
